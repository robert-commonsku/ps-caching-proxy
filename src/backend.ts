import { Sha1 } from "https://deno.land/std/hash/sha1.ts";
import {
  type PPCRequest,
  type PPCResponse,
  getPPCClient
} from "./soap.ts";
import db, { log, updateLogin } from "./db.ts";
import { getLocale, hasError, getErrorCodes, getErrorTransform } from "./verify.ts";
import { LogEntry, RequestLogEntry } from "./types.ts";
import { getParams } from "./utils.ts";

const REQUEST_CACHE_KEY_MAP = {
  getAvailableCharges: [getLocale, "productId"],
  getAvailableLocations: [getLocale, "productId"],
  getConfigurationAndPricing: [getLocale, "productId", "fobId", "currency", "priceType", "configurationType"],
  getDecorationColors: [getLocale, "productId", "locationId", "decorationId"],
  getFobPoints: [getLocale, "productId"],
  partPrice: ["productId", "fobId", "currency", "priceType"],
  chargePrice: ["productId", "fobId", "currency", "priceType"]
};


function isRefined(methodName, req: PPCRequest) {
  return ("getConfigurationAndPricing" === methodName && req.partId);
}

function refine(methodName, req: PPCRequest, resp: PPCResponse): PPCResponse {
  if ("getConfigurationAndPricing" === methodName && req.partId) {
    const part = resp.Configuration.PartArray.Part.filter(p => p.partId === req.partId);
    const locationIds = new Set(part.reduce(
      (o, p) => o.concat(p.LocationIdArray.LocationId.map(l => l.locationId)),
      []
    ));
    resp.Configuration.PartArray.Part = part;
    resp.Configuration.LocationArray.Location = resp.Configuration.LocationArray.Location.filter(
      l => l.locationId in locationIds
    );
    if (part.length === 0) {
      getErrorTransform(200, "partId not found")(resp);
    }
    return resp;
  }
  return resp;
}

async function settleCustomerPricing(req: PPCRequest, resp: PPCResponse): PPCResponse | false {
  let error = false;
  const basePartKey = getCacheKey("partPrice", req);
  const baseChargeKey = getCacheKey("chargePrice", req);
  resp.Configuration.PartArray.Part.forEach(
    async p => {
      const cacheKey = basePartKey + ":" + p.partId + ":" + req.id;
      const priceKey = await db.get(cacheKey);
      if (priceKey) {
        const price = await db.get(priceKey);
        p.PartPriceArray = JSON.parse(price);
      } else {
        error = true; 
        return;
      }
    } 
  );
  resp.Configuration?.LocationArray?.Location.forEach(async l => {
    if (error) {
      return;
    }
    l?.DecorationArray?.Decoration.forEach(async d => {
      if (error) {
        return;
      }
      d?.ChargeArray?.Charge.forEach(async c => {
        const cacheKey = baseChargeKey + ":" + c.chargeId + ":" + req.id;
        const priceKey = await db.get(cacheKey);
        if (priceKey) {
          const price = await db.get(priceKey);
          c.ChargePriceArray = JSON.parse(price);
        } else {
          error = true;
          return;
        }
      });
    });
  });
  if (error) {
    return false;
  }
  return resp;
}

export function normalizePartPriceArray(prices) {
  // TODO: sort them
  return prices;
}

export function normalizeChargePriceArray(prices) {
  // TODO: sort them
  return prices;
}

function getPriceHash(prices) {
  return new Sha1().update(JSON.stringify(prices)).hex();
}

export async function storeCustomerPricing(methodName: string, req: PPCRequest, resp: PPCResponse) {
  const basePartKey = getCacheKey("partPrice", req);
  const baseChargeKey = getCacheKey("chargePrice", req);
  await resp.Configuration.PartArray.Part.forEach(async p => {
    const prices = normalizePartPriceArray(p.PartPriceArray);
    const priceHash = getPriceHash(prices);
    const priceKey = "partPriceArray:" + priceHash;
    await db.set(priceKey, JSON.stringify(prices));
    const cacheKey = basePartKey + ":" + p.partId + ":" + req.id;
    await db.set(cacheKey, priceKey);
    p.PartPriceArray = [];
  });
  resp.Configuration?.LocationArray?.Location.forEach(
    async l => l?.DecorationArray?.Decoration.forEach(
      async d => d?.ChargeArray?.Charge.forEach(
        async c => {
          const prices = normalizeChargePriceArray(c.ChargePriceArray);
	  const priceHash = getPriceHash(prices);
          const priceKey = "chargePriceArray:" + priceHash;
          await db.set(priceKey, JSON.stringify(prices));
          const cacheKey = baseChargeKey + ":" + c.chargeId + ":" + req.id;
          await db.set(cacheKey, priceKey);
	  c.ChargePriceArray = [];
        }
      )
    )
  );
  return await store(methodName, req, resp);
}

export async function forward(methodName: string, req: PPCRequest, logEntry: RequestLogEntry) {
  const client = await getPPCClient();
  performance.mark("beReqStart");
  const resp = (await client[methodName + "Async"](req))[0];
  performance.mark("beReqEnd");
  const duration = performance.measure("beReq", "beReqStart", "beReqEnd").duration;
  const beLogEntry: LogEntry = {
    date: Date.now(),
    method: methodName,
    accountId: req.id,
    productId: req.productId,
    params: getParams(),
    duration,
    errors: getErrorCodes(resp)
  } as LogEntry;
  await log(beLogEntry);
  logEntry.backendId = beLogEntry.id;

  if (!hasError(resp)) {
    await updateLogin(req.id, req.password);
    if (isCustomerPricing(methodName, req)) {
      await storeCustomerPricing(methodName, req, resp);
      resp = await settleCustomerPricing(req, resp);
    } else if (!isRefined(methodName, req)) {
      await store(methodName, req, resp);
    } else {
      resp = refine(methodName, req, resposne);
    }
  }
  return resp;
}

export function getCacheKey(methodName: string, req: PPCRequest) {
  return REQUEST_CACHE_KEY_MAP[methodName].reduce(
    (result, m) => {
      if (typeof m === "function") {
        return result + ":" + m(req);
      }  
      return result + ":" + req[m] ?? "!";
    },
    methodName
  );
}

function isCustomerPricing(methodName: string, req: PPCRequest): boolean {
  return ("getConfigurationAndPricing" === methodName && req.priceType === "Customer");
}

export async function retrieve(methodName: string, req: PPCRequest): PPCResponse | false {
  const key = getCacheKey(methodName, req);
  const result = await db.get(key);
  if (result) {
    let resp = JSON.parse(result) as PPCResponse;
    resp = refine(methodName, req, resp);
    if (isCustomerPricing(methodName, req)) {
      return await settleCustomerPricing(req, resp);
    }
    return resp;
  }    
  return false;
}

export async function store(methodName: string, req: PPCRequest, resp: PPCResponse) {
  if (hasError(resp)) {
    return false;  
  }
  const key = getCacheKey(methodName, req);
  return await db.set(key, JSON.stringify(resp));
}
