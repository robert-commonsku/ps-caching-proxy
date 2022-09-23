import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req: Request) {
    return new Response("OK", { status: 200 });
  }
};
