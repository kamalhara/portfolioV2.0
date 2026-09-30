import { visitorIdentity } from "./cookie";
import { embedSections, embedText } from "./embedding";
import { knowledge, knowledgeVersion, type KnowledgeLink } from "./knowledge";
import { generateAnswer } from "./providers";
import {
  answerFromPolicy,
  directAnswer,
  rankByEmbedding,
  rankByText,
  selectEvidence,
} from "./retrieval";
import { compactAnswer } from "./response-format";
import { parseQuestion } from "./validation";
export { UsageStore } from "./UsageStore";

type RuntimeEnv = Env & {
  GEMINI_API_KEY?: string;
  PORTFOLIO_CHAT_COOKIE_SECRET?: string;
  ASSISTANT_DEV_MODE?: string;
};

const LIMIT_MESSAGE =
  "You've reached the AI assistant's demo limit for this session. You can still explore Kamal's projects, skills, resume and contact information below.";
const GLOBAL_LIMIT_MESSAGE =
  "The AI assistant has reached its daily demo capacity. You can still explore Kamal's portfolio below.";

function allowedOrigin(origin: string | null, env: Env): boolean {
  return (
    !origin ||
    env.ALLOWED_ORIGINS.split(",")
      .map((value) => value.trim())
      .includes(origin)
  );
}

function response(
  request: Request,
  env: Env,
  body: unknown,
  status = 200,
  setCookie?: string,
): Response {
  const headers = new Headers({
    "Cache-Control": "no-store",
    Vary: "Origin",
  });
  const origin = request.headers.get("Origin");
  if (origin && allowedOrigin(origin, env)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
  }
  if (setCookie) headers.append("Set-Cookie", setCookie);
  return Response.json(body, { status, headers });
}

function safeLinks(sections: typeof knowledge): KnowledgeLink[] {
  const seen = new Set<string>();
  return sections
    .flatMap((section) => section.links)
    .filter((link) => {
      if (seen.has(link.href)) return false;
      if (
        !link.href.startsWith("/") &&
        !link.href.startsWith("mailto:") &&
        !link.href.startsWith("https://")
      ) {
        return false;
      }
      seen.add(link.href);
      return true;
    })
    .slice(0, 3);
}

async function relevantSections(question: string, env: Env) {
  const curated = selectEvidence(question, [], knowledge);
  if (curated.length) return curated;
  if (
    rankByText(knowledge, question, 1).length === 0 &&
    !/^(hi|hello|hey)[.!?\s]*$/i.test(question)
  ) {
    return [];
  }
  try {
    const store = env.USAGE.getByName("portfolio-assistant");
    const cached = await store.getIndex(knowledgeVersion);
    let vectors: number[][];
    if (!cached || cached.length !== knowledge.length) {
      vectors = await embedSections(
        env.AI,
        knowledge.map((section) => `${section.title}. ${section.text}`),
      );
      await store.putIndex(knowledgeVersion, vectors);
    } else {
      vectors = Array.from(cached, (vector) => Array.from(vector));
    }
    const questionVector = await embedText(env.AI, question);
    return selectEvidence(
      question,
      rankByEmbedding(knowledge, vectors, questionVector, 5),
      knowledge,
    );
  } catch {
    return selectEvidence(
      question,
      rankByText(knowledge, question, 5),
      knowledge,
    );
  }
}

export default {
  async fetch(request, env): Promise<Response> {
    const runtime = env as RuntimeEnv;
    const developmentMode = runtime.ASSISTANT_DEV_MODE === "true";
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    if (!allowedOrigin(origin, env)) {
      return response(request, env, { error: "Origin not allowed" }, 403);
    }
    if (request.method === "OPTIONS") {
      const headers = new Headers({
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "600",
        Vary: "Origin",
      });
      if (origin) {
        headers.set("Access-Control-Allow-Origin", origin);
        headers.set("Access-Control-Allow-Credentials", "true");
      }
      return new Response(null, { status: 204, headers });
    }
    if (request.method === "GET" && url.pathname === "/health") {
      return response(request, env, {
        ok: true,
        service: "portfolio-assistant",
      });
    }
    if (
      !runtime.PORTFOLIO_CHAT_COOKIE_SECRET ||
      runtime.PORTFOLIO_CHAT_COOKIE_SECRET.length < 32
    ) {
      return response(
        request,
        env,
        { error: "Assistant is not configured" },
        503,
      );
    }
    const identity = await visitorIdentity(
      request,
      runtime.PORTFOLIO_CHAT_COOKIE_SECRET,
    );
    const store = env.USAGE.getByName("portfolio-assistant");

    if (request.method === "GET" && url.pathname === "/status") {
      const status = await store.status(
        identity.id,
        Date.now(),
        developmentMode,
      );
      return response(
        request,
        env,
        { ...status, developmentMode },
        200,
        identity.setCookie,
      );
    }
    if (request.method === "POST" && url.pathname === "/reset") {
      await store.resetHistory(identity.id);
      return response(request, env, { ok: true }, 200, identity.setCookie);
    }
    if (request.method !== "POST" || url.pathname !== "/chat") {
      return response(request, env, { error: "Not found" }, 404);
    }

    let question: string;
    try {
      question = parseQuestion(await request.text());
    } catch {
      return response(
        request,
        env,
        { error: "Enter a question of 1 to 300 characters." },
        400,
        identity.setCookie,
      );
    }

    const reserved = await store.reserve(
      identity.id,
      Date.now(),
      developmentMode,
    );
    if (!reserved.allowed || !reserved.ticket) {
      const limitReached =
        reserved.reason === "visitor_limit" ||
        reserved.reason === "global_limit";
      return response(
        request,
        env,
        {
          error:
            reserved.reason === "visitor_limit"
              ? LIMIT_MESSAGE
              : reserved.reason === "global_limit"
                ? GLOBAL_LIMIT_MESSAGE
                : "Please wait before asking again.",
          reason: reserved.reason,
          limitReached,
          remaining: reserved.remaining,
          retryAfterSeconds: reserved.retryAfterSeconds,
        },
        429,
        identity.setCookie,
      );
    }

    const policyAnswer = answerFromPolicy(question);
    const sections = policyAnswer ? [] : await relevantSections(question, env);
    let answer: string;
    let source: "cloudflare" | "gemini" | "portfolio" = "portfolio";
    if (policyAnswer) {
      answer = policyAnswer;
    } else if (!sections.length) {
      answer = directAnswer(sections);
    } else {
      try {
        const generated = await generateAnswer(env.AI, runtime.GEMINI_API_KEY, {
          question,
          sections,
          history: reserved.history ?? [],
        });
        answer = generated.text;
        source = generated.provider;
      } catch {
        answer = directAnswer(sections);
      }
    }
    answer = compactAnswer(answer);

    const remaining = await store.complete(
      reserved.ticket,
      question,
      answer,
      source !== "portfolio",
      Date.now(),
      developmentMode,
    );
    return response(
      request,
      env,
      {
        answer,
        links: safeLinks(sections),
        source,
        remaining,
        limitReached: remaining === 0,
        developmentMode,
      },
      200,
      identity.setCookie,
    );
  },
} satisfies ExportedHandler<Env>;
