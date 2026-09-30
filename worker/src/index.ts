export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/health") {
      return Response.json(
        { ok: true, service: "portfolio-assistant" },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    // Temporary local-only AI check. Remove before deployment.
    if (request.method === "GET" && url.pathname === "/ai-test") {
      if (!["localhost", "127.0.0.1"].includes(url.hostname)) {
        return Response.json({ error: "Not found" }, { status: 404 });
      }

      try {
        const result = await env.AI.run(
          "@cf/meta/llama-4-scout-17b-16e-instruct",
          {
            messages: [
              { role: "user", content: "Reply with one short greeting." },
            ],
            max_tokens: 40,
            temperature: 0,
          },
        );

        return Response.json(
          { response: result.response },
          { headers: { "Cache-Control": "no-store" } },
        );
      } catch {
        return Response.json({ error: "AI test failed" }, { status: 502 });
      }
    }

    return Response.json({ error: "Not found" }, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
