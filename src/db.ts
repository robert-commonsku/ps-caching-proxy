import { connect } from "https://deno.land/x/redis/mod.ts";
import { JobStatus, JobType, LogEntry } from "./types.ts";
import config from "./config.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

const db = await connect(config.redis);
export default db;

export async function login(username: string, password: string) {
  if (!username || !password) {
    return false;
  }
  const hash = await db.get(`account:password-hash:${username}`);
  if (!hash) {
    return false;
  }
  return await bcrypt.compare(`${username}:${password}`, hash);
}

export async function* makeKeyIterator(
  pattern: string,
  count = 100,
  format?: (s: string) => any,
) {
  if (!format) {
    format = (s) => s;
  }
  let [cursor, results] = await db.scan(0, { pattern, count });
  for (let i = 0; i < results.length; ++i) {
    yield format(results[i]);
  }
  while (cursor !== "0") {
    [cursor, results] = await db.scan(+cursor, { pattern, count });
    for (let i = 0; i < results.length; ++i) {
      yield format(results[i]);
    }
  }
}

export async function* makeSetIterator(key: string, count = 1000) {
  let [cursor, results] = await db.sscan(key, 0, { count });
  for (let i = 0; i < results.length; ++i) {
    yield results[i];
  }
  while (cursor !== "0") {
    [cursor, results] = await db.sscan(key, +cursor, { count });
    for (let i = 0; i < results.length; ++i) {
      yield results[i];
    }
  }
}

export async function updateLogin(username: string, password: string) {
  if (!username || !password) {
    return false;
  }
  const hash = await bcrypt.hash(`${username}:${password}`);
  // TODO: Encrypt this!!! Bad to keep plain text passwords in datastore
  await db.set(`account:password:${username}`, password);
  return db.set(`account:password-hash:${username}`, hash);
}

export async function invalidateLogin(username: string) {
  if (!username) {
    return 0;
  }
  return await db.del(`account:password:${username}`, `account:password-hash:${username}`);
}

export async function getPassword(username: string) {
  return await db.get(`account:password:${username}`);
}

export async function log(logEntry: LogEntry) {
  if (!logEntry.id) {
    logEntry.id = crypto.randomUUID();
  }
  const key = "log:" + logEntry.id;
  return await db.set(key, JSON.stringify(logEntry));
}

export async function logProblem(methodName: string, req: PPCRequest, type: string) {
  const id = crypto.randomUUID();
  const key = "problem:" + id;
  const problem = {
    id,
    type,
    date: Date.now(),
    methodName,
    accountId: req.id,
    productId: req.productId,
    params: Object.keys(req).filter(
      k => !["id", "password", "productId", "wsVersion"].includes(k)
    ).reduce(
      (o, k) => ({ ...o, [k]: req[k] }),
      {}
    )
  };
  return await db.set(key, JSON.stringify(problem));
}

export interface Job<Data> {
  id: string;
  type: JobType;
  queueName: string;
  status: JobStatus;
  data: Data;
  retries: number;
}

interface JobProcess<Data> {
  (data: Data): Promise<any | never>;
}

interface JobProcessMap<Data> {
  [jobType: string]: JobProcess<Data>;
}

export class Worker<Data> {
  readonly queue: Queue<Data>;
  readonly fns: JobProcessMap<Data>;

  constructor(
    queueName: string,
    fn: JobProcessMap<Data>
  ) {
    this.queue = new Queue<Data>(queueName);
    this.fns = fn;
  }

  getFn(type: JobType) {
    const errorFn: JobProcess<Data> = async (_data: Data) => {
      throw new Error(`Unrecognized job type: ${type}`);
    };
    return this.fns[type] ?? this.fns["*"] ?? errorFn;
  }

  async process(job: Job<Data>) {
    return await this.getFn(job.type)(job.data).then(
      () => this.queue.complete(job),
    ).catch(
      (error: Error) => this.queue.failed(job, error),
    );
  }

  async run() {
    let job = await this.queue.next();
    while (job) {
      await this.process(job);
      job = await this.queue.next();
    }
  }
}

export class Queue<Data> {
  readonly queueName: string;

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  async add(data: Data, type: JobType, retries?: number) {
    const id = crypto.randomUUID();
    await db.hset(
      "job:" + id,
      ["id", id],
      ["type", type],
      ["queueName", this.queueName],
      ["status", "queued"],
      ["data", JSON.stringify(data)],
      ["retries", retries ?? 0],
    );
    return await db.lpush("queue:" + this.queueName + ":queued", "job:" + id);
  }

  async next(): Promise<Job<Data> | undefined> {
    const id = await db.brpoplpush(
      "queue:" + this.queueName + ":queued",
      "queue:" + this.queueName + ":processing",
      0,
    );
    if (!id) {
      return;
    }
    const data = await db.hgetall(id);
    const obj = data.filter((_v, i) => (i % 2) === 0).reduce(
      (o, k, i) => ({ ...o, [k]: data[2 * i + 1] }),
      {}
    );
    const job =  {
      id: obj.id,
      type: obj.type as JobType,
      queueName: obj.queueName,
      status: obj.status as JobStatus,
      data: JSON.parse(obj.data),
      retries: +obj.retries
    };
    return job;
  }

  async failed(job: Job<Data>, error: Error) {
    await db.lrem("queue:" + this.queueName + ":processing", 0, "job:" + job.id);
    if (job.retries > 0) {
      await db.lpush("queue:" + this.queueName + ":queued", "job:" + job.id);
      await db.hset(
        "job:" + job.id,
       	["status", "queued"],
       	["retries", job.retries - 1],
      );
    } else {
      await db.hset("job:" + job.id, "status", "failed");
    }
    return error;
  }

  async complete(job: Job<Data>) {
    await db.hset("job:" + job.id, "status", "complete");
    await db.lrem("queue:" + this.queueName + ":processing", 0, "job:" + job.id);
  }
}
