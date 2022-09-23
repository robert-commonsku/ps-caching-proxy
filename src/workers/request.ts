import { Job } from "npm:bull";
import { LogEntry, RequestJob } from "../types.ts";
import { getPPCClient } from "../soap.ts";
import db, { getPassword, log } from "../db.ts";
import { accounts, getParams } from "../utils.ts";
import { getErrorCodes } from "../verify.ts";
import { store, storeCustomerPricing } from "../backend.ts";

export default async function request(job: Job<RequestJob>) {
  const { methodName, params: req } = job.data;
  const client = await getPPCClient();

  if (!req.id) {
    for await (let accountId of await accounts()) {
      const resp = await tryRequest(client, methodName, accountId, req);
      if (resp) {
        break;
      }
    }
  } else {
    const resp = await tryRequest(client, methodName, req.id, req);
  }
  if (resp) {
    if ("getAvailableLocations" === methodName) {
      const locationIds = resp.AvailableLocationsArray.AvailableLocation.map(l => l.locationId);
      await db.del("product-locations");
      await db.sadd("product-locations", locationIds);
    } else if ("getFobPoints" === methodName) {
      resp.FobPointArray.FobPoint.forEach(f => {
	const currencies = f.CurrencySupportedArray.CurrencySupported.map(c => c.currency);
        await db.del("fob-point-currencies:" + f.fobId);
	await db.sadd("fob-point-currencies:" + f.fobId, currencies);
      });
    }
  }
}

async function tryRequest(client, methodName, accountId, req) {
  let password = await getPassword(accountId);
  if (!password) {
    return false;
  }
  req.id = accountId;
  req.password = password;
  performance.mark("beReqStart");
  let resp = (await client[methodName + "Async"](req))[0];
  performance.mark("beReqEnd");
  duration = performance.measure("beReq", "beReqStart", "beReqEnd").duration;
  let logEntry = {
    date: Date.now(),
    method: methodName,
    accountId,
    productId: req.productId,
    params: getParams(req),
    duration,
    errors: getErrorCodes(resp)
  };
  await log(logEntry);
  if (hasError(resp)) {
    return false;
  }
  if ('getConfigurationAndPricing' === methodName && 'Customer' === req.priceType) {
    await storeCustomerPricing(methodName, req, resp);
  } else {
    await store(methodName, req, resp);
  }
  return resp;
}
