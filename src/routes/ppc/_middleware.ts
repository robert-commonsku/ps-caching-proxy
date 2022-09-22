import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { RequestLogEntry } from "../../types.ts";
import { log } from "../../db.ts";

export const handler = [
  async function logMiddleware(req: Request, ctx: MiddlewareHandlerContext<RequestLogEntry>) {
    performance.mark("reqStart");    
    const logEntry: RequestLogEntry = {
      date: Date.now(),
      ip: ctx.remoteAddr.hostname,
      duration: 0,
      method: "Unknown",
      productId: "Unknown",
      accountId: "Unknown",
      cacheHit: false,
      isREST: false,
      errors: []
    } as RequestLogEntry;

    ctx.state = logEntry;
    const resp = await ctx.next();
    performance.mark("reqEnd");
    const duration = performance.measure("req", "reqStart", "reqEnd").duration;
    logEntry.duration = duration;
    await log(logEntry);
    return resp;
  }
];
