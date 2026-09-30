const COOKIE_NAME = "portfolio_chat";
const encoder = new TextEncoder();

function base64Url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function fromBase64Url(value: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return null;
  try {
    const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
    return Uint8Array.from(atob(base64), (character) =>
      character.charCodeAt(0),
    );
  } catch {
    return null;
  }
}

async function signingKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signature(id: string, secret: string): Promise<string> {
  const signed = await crypto.subtle.sign(
    "HMAC",
    await signingKey(secret),
    encoder.encode(id),
  );
  return base64Url(new Uint8Array(signed));
}

export async function visitorIdentity(
  request: Request,
  secret: string,
): Promise<{ id: string; setCookie?: string }> {
  const cookie = request.headers
    .get("Cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);
  if (cookie) {
    const separator = cookie.lastIndexOf(".");
    const id = cookie.slice(0, separator);
    const received = cookie.slice(separator + 1);
    const receivedBytes = fromBase64Url(received);
    if (
      separator > 0 &&
      /^[0-9a-f-]{36}$/.test(id) &&
      receivedBytes &&
      (await crypto.subtle.verify(
        "HMAC",
        await signingKey(secret),
        new Uint8Array(receivedBytes).buffer,
        encoder.encode(id),
      ))
    ) {
      return { id };
    }
  }

  const id = crypto.randomUUID();
  const value = `${id}.${await signature(id, secret)}`;
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return {
    id,
    setCookie: `${COOKIE_NAME}=${value}; Path=/; Max-Age=2592000; HttpOnly; SameSite=Lax${secure}`,
  };
}
