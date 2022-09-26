import config from "../config.ts";
import { DataRequest } from "../types.ts";
import { makeSetIterator, Queue } from "../db.ts";
import { getSetting } from "../settings.ts";
import { fobIds } from "../utils.ts";

export default async function fanRequests({ methodName, params }: DataRequest) {
  let productIds = [];
  for await (let productId of makeSetIterator("products-sellable")) {
    productIds.push(productId);
  }
  const queue = new Queue<DataRequest>(
    config.product_queue,
    {
      redis: config.redis,
      limiter: {
        max: 1,
        duration: 1000,
      },
    },
  );
  const [localizationLanguage, localizationCountry] =
    (await getSetting("default-locale")).split("-");

  const baseParams = {
    wsVersion: "1.0.0",
    localizationCountry,
    localizationLanguage,
    ...params,
  };

  let requests = [];
  if ("getDecorationColors" === methodName) {
    requests = [];
    for (let productId of productIds) {
      const locationIds = [];
      for await (let locationId of makeSetIterator("product-locations:" + productId)) {
        locationIds.push(locationId);
        requests.push(queue.add({ methodName, params: { ...baseParams, productId, locationId }}, "request"));
      }
    }
  } else if ("getConfigurationAndPricing" === methodName) {
    const fobIdList = []; 
    const currencies = {};
    for await (const fobId of fobIds()) {
      fobIdList.push(fobId);
      for await (let currency of makeSetIterator("fob-point-currencies:" + fobId)) {
        if (!currencies[fobId]) {
          currencies[fobId] = [];
	}
	currencies[fobId].push(currency);
      }
    }
    for (let productId of productIds) {
      for (const fobId of fobIdList) {
        for (const currency of currencies[fobId]) {
          requests.push(
            queue.add(
              {
                methodName,
                params: {
                  ...params,
                  fobId,
                  currency,
                  configurationType: "Blank",
                  priceType: "Net",
                },
              },
	      "request"
            )
          );
          requests.push(
            queue.add(
              {
                methodName,
                params: {
                  ...params,
                  fobId,
                  currency,
                  configurationType: "Decorated",
                  priceType: "Net",
                },
              },
	      "request"
            )
          );
          requests.push(
            queue.add(
              {
                methodName,
                params: {
                  ...params,
                  fobId,
                  currency,
                  configurationType: "Blank",
                  priceType: "List",
                },
              },
	      "request"
            )
          );
          requests.push(
            queue.add(
              {
                methodName,
                params: {
                  ...params,
                  fobId,
                  currency,
                  configurationType: "Decorated",
                  priceType: "List",
                },
              },
	      "request"
            )
          );
        }
      }
    }
  } else {
    requests = productIds.map(
      productId => queue.add({ methodName, params: { ...baseParams, productId }}, "request")
    );
  }
  await Promise.all(requests);
}
