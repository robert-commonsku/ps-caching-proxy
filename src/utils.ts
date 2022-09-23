import { makeKeyIterator } from "./db.ts";

export async function accounts() {
  return await makeKeyIterator("account:password-hash:*", 10, (s) => s.substr(22));
}

export function getParams(req: PPCRequest): PPCParams {
  return Object.keys(req).filter(
    k => !["wsVersion", "id", "password", "productId"].includes(k)
  ).reduce(
    (o, k) => ({ ...o, [k]: req[k] }),
    {}
  );
}
