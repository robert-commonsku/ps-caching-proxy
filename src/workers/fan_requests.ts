import { Job, Queue } from "npm:bull";
import config from "../config.ts";
import { FanRequestJob, RequestJob } from "../types.ts";
import { makeSetIterator } from "../db.ts";
import { getSetting } from "../settings.ts";

export default async function fanRequests(job: Job<FanRequestJob>) {
  const { methodName } = job.data;
  const productIds = new Set(makeSetIterator("products-sellable"));
  const queue = new Queue<RequestJob>(config.queue, config.redis);
  const locales = await getSetting("locales");

  if ("getAvailableLocations" === methodName) {
    await Promise.all(productIds.reduce(
      (requests, productId) => 
    ));
  }
}
