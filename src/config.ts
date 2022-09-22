import { config as env } from "https://deno.land/x/dotenv/mod.ts";

const PATH = Deno.env.get("CHIPPPC_ROOT") ?? "./";
const {
  REDIS_HOST: hostname,
  REDIS_PORT: port,
  WORKER_QUEUE: queue
} = env({ path: PATH + ".env", safe: true });

export default { queue, redis: { hostname, port } };
