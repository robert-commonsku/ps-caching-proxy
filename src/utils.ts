import type { PPCRequest, PPCParams } from "./types.ts";
import { makeKeyIterator } from "./db.ts";

export function getQueryParams(req: Request) {
  const u = new URL(req.url);
  const params: Record<string, string> = {};
  for (const p of u.searchParams) {
      params[p[0]]=p[1];
  }
  return params;
}

export function accounts() {
  return makeKeyIterator(
    "account:password-hash:*",
    100,
    (s) => s.substr(22),
  );
}

export function fobIds() {
  return makeKeyIterator(
    "fob-point-currencies:*",
    100,
    (s) => s.substr(21),
  );
}

export function getParams(req: PPCRequest): PPCParams {
  const copy = { ...req };
  delete copy.wsVersion;
  delete copy.id;
  delete copy.password;
  delete copy.productId;
  return copy;
}
