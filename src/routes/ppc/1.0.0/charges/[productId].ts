import { Accepts } from "https://deno.land/x/accepts@2.1.1/mod.ts";
import { Handlers } from "$fresh/server.ts";

import { getSetting } from "../../../../settings.ts";
import { restHandler } from "../../../../handler.ts"

export const handler: Handlers = {
  async GET(req: Request, ctx) {
    try {
      const resp = await restHandler("getAvailableCharges", req, ctx);
      return new Response(JSON.stringify(resp), {
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch(e) {
      return e;
    }
  },
};
