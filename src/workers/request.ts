import { BackendLogEntry, DataRequest } from "../types.ts";
import { getPPCClient } from "../soap.ts";
import type { PricingAndConfigurationClient, PPCRequest } from "../soap.ts";
import db, { getPassword, log, logProblem } from "../db.ts";
import { accounts, getParams } from "../utils.ts";
import { hasError, getErrorCodes } from "../verify.ts";
import { store, storeCustomerPricing } from "../backend.ts";

export default async function request({ methodName, params }: DataRequest) {
  console.log("request: " + methodName);
  const client = await getPPCClient();

  let resp;
  let accountId = params.id;
  if (!params.id) {
    for await (accountId of await accounts()) {
      resp = await tryRequest(client, methodName, accountId, params);
      if (resp) {
        break;
      }
    }
  } else {
    resp = await tryRequest(client, methodName, params.id, params);
  }
  if (resp) {
    if ("getAvailableLocations" === methodName) {
      const locations = resp.AvailableLocationArray.AvailableLocation;
      if (!locations) {
        logProblem(methodName, {...params, id: accountId}, "location-no-locations");
	return;
      }
      const locationIds = (locations.length ? locations : [locations]).map(
        (l) => l.locationId,
      );
      if (locationIds.length === 0) {
        logProblem(methodName, {...params, id: accountId}, "location-no-locations");
	return;
      }
      await db.del("product-locations:" + params.productId);
      await db.sadd("product-locations:" + params.productId, ...locationIds);
    } else if ("getFobPoints" === methodName) {
      const fobPoints = resp.FobPointArray.FobPoint;
      if (!fobPoints) {
        logProblem(methodName, {...params, id: accountId}, "fob-no-fob-points");
	return;
      }
      (fobPoints.length ? fobPoints : [fobPoints]).forEach(async (f) => {
        if (!f.CurrencySupportedArray) {
          logProblem(methodName, {...params, id: accountId}, "fob-no-currency-array");
          return;
        }
        const currencyIds = f.CurrencySupportedArray.CurrencySupported;
	if (!currencyIds) {
          logProblem(methodName, {...params, id: accountId}, "fob-no-currency");
          return;
	}
        const currencies = (currencyIds.length ? currencyIds : [currencyIds]).map((c) =>
          c.currency
        );
	if (currencies.length === 0) {
          logProblem(methodName, {...params, id: accountId}, "fob-no-currency");
          return;
	}
        await db.del("fob-point-currencies:" + f.fobId);
        await db.sadd("fob-point-currencies:" + f.fobId, ...currencies);
      });
    }
  }
}

async function tryRequest(client: PricingAndConfigurationClient, methodName: string, accountId: string, req: PPCRequest) {
  const password = await getPassword(accountId);
  if (!password) {
    return false;
  }
  req.id = accountId;
  req.password = password;
  performance.mark("beReqStart");
  const resp = (await client[methodName + "Async"](req))[0];
  performance.mark("beReqEnd");
  const duration = performance.measure("beReq", "beReqStart", "beReqEnd").duration;
  const logEntry: BackendLogEntry = {
    type: "backend",
    date: Date.now(),
    method: methodName,
    accountId,
    productId: req.productId,
    params: getParams(req),
    duration,
    errors: getErrorCodes(resp),
  } as BackendLogEntry;
  await log(logEntry);
  if (hasError(resp)) {
    return false;
  }
  if (
    "getConfigurationAndPricing" === methodName && "Customer" === req.priceType
  ) {
    await storeCustomerPricing(methodName, req, resp);
  } else {
    await store(methodName, req, resp);
  }
  return resp;
}
