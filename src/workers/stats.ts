import db from "../db.ts";
import { Stats } from "../types.ts";

export default async function(job) {
  if (!job.data.id) {
    job.data.id = crypto.randomUUID();
  }
  const key = "stats:" + job.data.id;
  await db.set(key, JSON.stringify(job.data));
}

/*

Put stats in redis with key.
Get stats for day.

*/
