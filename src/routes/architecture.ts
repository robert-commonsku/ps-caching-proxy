import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req: Request, _ctx) {
    return new Response(
      "",
      {
        status: 301,
        statusText: "Moved Permanently",
        headers: {
          "Location": "https://github.com/robert-commonsku/ps-caching-proxy/blob/main/ARCHITECTURE.md"
        }
      }
    );
  }
};
