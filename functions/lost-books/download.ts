import { APP_STORE_URL, PLAY_STORE_URL } from "../../src/data/lost-books";

const FALLBACK = "/lost-books";

type Platform = "ios" | "android" | "fallback";

function detectPlatform(ua: string): { dest: string; platform: Platform } {
  if (/android/.test(ua)) return { dest: PLAY_STORE_URL, platform: "android" };
  if (/iphone|ipad|ipod/.test(ua)) return { dest: APP_STORE_URL, platform: "ios" };
  if (/macintosh/.test(ua) && /mobile|touch/.test(ua)) return { dest: APP_STORE_URL, platform: "ios" };
  return { dest: FALLBACK, platform: "fallback" };
}

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const ua = (request.headers.get("user-agent") || "").toLowerCase();
  const { dest, platform } = detectPlatform(ua);

  const token = (env as Record<string, string>).PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = (env as Record<string, string>).PUBLIC_POSTHOG_HOST || "https://us.posthog.com";

  if (token) {
    fetch(`${host}/e/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        event: "download_redirect",
        properties: {
          platform,
          destination: dest,
          user_agent: request.headers.get("user-agent") || "",
          referer: request.headers.get("referer") || "",
          distinct_id: crypto.randomUUID(),
        },
      }),
    }).catch(() => {});
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: dest,
      "Cache-Control": "no-store",
    },
  });
};
