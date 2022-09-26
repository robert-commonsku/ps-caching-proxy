import { config as env } from "https://deno.land/x/dotenv/mod.ts";

const PATH = Deno.env.get("CHIPPPC_ROOT") ?? "./";
const {
  REDIS_HOST: hostname,
  REDIS_PORT: port,
  PRODUCT_QUEUE: product_queue,
  STATS_QUEUE: stats_queue,
} = env({ path: PATH + ".env", safe: true });

export default { product_queue, stats_queue, redis: { hostname, port } };
