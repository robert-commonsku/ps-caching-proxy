import { connect } from "https://deno.land/x/redis/mod.ts";
import config from "./config.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { LogEntry } from "./types.ts";

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
  count?: number = 10,
  format?: (s: string) => any
) {
  if (!format) {
    format = s => s;
  }
  let [cursor, results] = await db.scan("0", { pattern, count });  
  for (let i=0; i<results.length; ++i) {
    yield format(results[i]);
  }
  while (cursor !== "0") {
    [cursor, results] = await db.scan(cursor, { pattern, count });  
    for (let i=0; i<results.length; ++i) {
      yield format(results[i]);
    }
  }
}

export async function* makeSetIterator(key: string, count?: number = 1000) {
  let [cursor, results] = await db.scan(key, "0", { pattern, count });  
  for (let i=0; i<results.length; ++i) {
    yield results[i];
  }
  while (cursor !== "0") {
    [cursor, results] = await db.scan(key, cursor, { pattern, count });  
    for (let i=0; i<results.length; ++i) {
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

export async function invalidateLogin(username: string): number {
  if (!username) {
    return 0;
  }
  return await db.del([`account:password:${username}`, `account:password-hash:${username}`]);
}

export async function getPassword(username: string) {
  return db.get(`account:password:${username}`);
}

export async function log(logEntry: logEntry) {
  if (!logEntry.id) {
    logEntry.id = crypto.randomUUID();
  }
  const key = "log:" + logEntry.id;
  return await db.set(key, JSON.stringify(logEntry));
}
