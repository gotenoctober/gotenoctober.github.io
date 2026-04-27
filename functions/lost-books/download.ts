import { APP_STORE_URL, PLAY_STORE_URL } from "../../src/data/lost-books";

const FALLBACK = "/lost-books";

export const onRequestGet: PagesFunction = ({ request }) => {
  const ua = (request.headers.get("user-agent") || "").toLowerCase();

  let dest: string = FALLBACK;
  if (/android/.test(ua)) {
    dest = PLAY_STORE_URL;
  } else if (/iphone|ipad|ipod/.test(ua)) {
    dest = APP_STORE_URL;
  } else if (/macintosh/.test(ua) && /mobile|touch/.test(ua)) {
    dest = APP_STORE_URL;
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: dest,
      "Cache-Control": "no-store",
    },
  });
};
