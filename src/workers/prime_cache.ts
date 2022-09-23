import { Job } from "npm:bull";
import { CachePrime, LogEntry } from "../types.ts";
import db, { getPassword, makeKeyIterator, log } from "../db.ts";
import { getPPCClient, type PPCRequest, type PPCResponse } from "../soap.ts";
import { store, storeCustomerPricing } from "../backend.ts";
import { getErrorCodes } from "../verify.ts";
import { getParams } from "../utils.ts";

const PRICE_TYPES = ["Net", "List", "Customer"];
const CONFIGURATION_TYPES = ["Blank", "Decorated"];

export default async function primeCache(job: Job<CachePrime>) {
  let duration: number;
  let req: PPCRequest;
  let resp: PPCResponse;
  let logEntry: LogEntry;
  const [localizationLanguage, localizationCountry] = job.data.locale.split("-");

  const client = await getPPCClient();
  for (let accountId of await makeKeyIterator("account:password-hash:*", 10, (s) => s.substr(22))) {
    let password = await getPassword(accountId);
    if (!password) {
      continue;
    }

    // getAvailableLocations
    req = {
      wsVersion: "1.0.0",
      id: accountId,
      password,
      productId: job.data.productId,
      localizationLanguage,
      localizationCountry
    };
    performance.mark("beReqStart");
    resp = (await client.getAvailableLocationsAsync(req))[0];
    performance.mark("beReqEnd");
    duration = performance.measure("beReq", "beReqStart", "beReqEnd").duration;
    logEntry = {
      date: Date.now(),
      method: "getAvailableLocations",
      accountId,
      productId: req.productId,
      params: getParams(req),
      duration,
      errors: getErrorCodes(resp)
    };
    await log(logEntry);
    if (hasError(resp)) {
      continue;
    }
    await store("getAvailableLocations", req, resp);
    let locationIds = resp.AvailableLocationsArray.AvailableLocation.map(l => l.locationId);

    // getDecorationColors
    locationIds.forEach(async locationId => {
      req = {
        wsVersion: "1.0.0",
        id: accountId,
        password,
        productId: job.data.productId,
	locationId,
        localizationLanguage,
        localizationCountry
      };
      performance.mark("beReqStart");
      resp = (await client.getDecorationColorsAsync(req))[0];
      performance.mark("beReqEnd");
      duration = performance.measure("beReq", "beReqStart", "beReqEnd").duration;
      logEntry = {
        date: Date.now(),
        method: "getDecorationColors",
        accountId,
        productId: req.productId,
        duration,
        errors: getErrorCodes(resp)
      };
      await log(logEntry);
      if (hasError(resp)) {
        continue;
      }
      await store("getDecorationColors", req, resp);
    });

    // getFobPoints
    req = {
      wsVersion: "1.0.0",
      id: accountId,
      password,
      productId: job.data.productId,
      localizationLanguage,
      localizationCountry
    };
    performance.mark("beReqStart");
    resp = (await client.getFobPointsAsync(req))[0];
    performance.mark("beReqEnd");
    duration = performance.measure("beReq", "beReqStart", "beReqEnd").duration;
    logEntry = {
      date: Date.now(),
      method: "getFobPoints",
      accountId,
      productId: req.productId,
      duration,
      errors: getErrorCodes(resp)
    };
    await log(logEntry);
    if (hasError(resp)) {
      continue;
    }
    await store("getFobPoints", req, resp);
    let fobCurrencies = resp.FobPointArray.FobPoint.reduce(
      (o, f) => ({
        ...o,
	[f.fobId]: f.CurrencySupportedArray.CurrencySupported.map(c => c.currency)
      }),
      {}
    );

    // getAvailableCharges
    req = {
      wsVersion: "1.0.0",
      id: accountId,
      password,
      productId: job.data.productId,
      localizationLanguage,
      localizationCountry
    };
    performance.mark("beReqStart");
    resp = (await client.getAvailableChargesAsync(req))[0];
    performance.mark("beReqEnd");
    duration = performance.measure("beReq", "beReqStart", "beReqEnd").duration;
    logEntry = {
      date: Date.now(),
      method: "getAvailableCharges",
      accountId,
      productId: req.productId,
      duration,
      errors: getErrorCodes(resp)
    };
    await log(logEntry);
    if (hasError(resp)) {
      continue;
    }
    await store("getAvailableCharges", req, resp);

    // getConfigurationAndPricing
    Object.keys(fobCurrencies).forEach(
      async fobId => fobCurrencies.forEach(
        async currency => PRICE_TYPES.forEach(
          async priceType => CONFIGURATION_TYPES.forEach(
            async configurationType => {
              req = {
                wsVersion: "1.0.0",
                id: accountId,
                password,
                productId: job.data.productId,
		currency,
		fobId,
		priceType,
                localizationLanguage,
                localizationCountry,
		configurationType
              };
              performance.mark("beReqStart");
              resp = (await client.getConfigurationAndPricingAsync(req))[0];
              performance.mark("beReqEnd");
              duration = performance.measure("beReq", "beReqStart", "beReqEnd").duration;
              logEntry = {
                date: Date.now(),
                method: "getConfigurationAndPricing",
                accountId,
                productId: req.productId,
                duration,
                errors: getErrorCodes(resp)
              };
              await log(logEntry);
              if (hasError(resp)) {
                continue;
              }
	      if ("Customer" === priceType) {
                await storeCustomerPricing("getConfigurationAndPricing", req, resp);
	      } else {
                await store("getConfigurationAndPricing", req, resp);
	      }
            }
	  )
	)
      )
    );      
    break;
  }
}
