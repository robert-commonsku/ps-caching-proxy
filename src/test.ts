import { Queue } from "./db.ts";

import { GetAvailableChargesRequest } from "./soap/ppc/1.0.0/index.ts";
// import { Job, Queue, Worker } from "./db.ts";

export { GetAvailableChargesRequest };

/*
async function fn(job: Job<number>): any {
  console.log("Running Job: " + job.id);
  console.log("Running Job: " + job.status);
  return job.data;
}

console.log("Make Queue");
const queue = new Queue<number>("test-queue");

const w = new Worker("test-queue", fn);

console.log("Run Worker");

console.log("Add Job");
queue.add(5);
console.log("End");

w.run();
*/
