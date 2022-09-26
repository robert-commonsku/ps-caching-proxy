import type { PPCRequest, PPCParams } from "./types.ts";
import { makeKeyIterator } from "./db.ts";

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
