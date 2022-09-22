import { Job, Queue } from "npm:bull";
import config from "../config.ts"
import db, { getPassword, makeKeyIterator, makeSetIterator, invalidateLogin } from "../db.ts"
import { getPDClient } from "../soap.ts";
import { hasError } from "../verify.ts";
import { CachePrime } from "../types.ts";
import { getSetting } from "../settings.ts"

export default async function getProducts(job: Job) {
  const client = await getPDClient();
  let newProducts: Set<string> = new Set<string>();

  for await (let accountId of makeKeyIterator("account:password-hash:*", 10, (s) => s.substr(22))) {
    let password = await getPassword(accountId)
    if (!password) {
      continue;
    }
    performance.mark("beReqStart");
    let req = {
      wsVersion: "2.0.0",
      id: accountId,
      password,
      localizationCountry: "US",
      localizationLanguage: "en",
      isSellable: true
    };
    let resp = (await client.getProductSellableAsync(req))[0];
    if (hasError(resp, 405)) {
      await invalidateLogin(accountId);
      continue;
    }
    performance.mark("beReqEnd");
    let duration = performance.measure("beReq", "beReqStart", "beReqEnd").duration;
    let products = new Set(resp.ProductSellableArray.ProductSellable.map(p => p.productId));
    console.log(products);
    await db.sadd("new-products-sellable", products);
    newProducts = await db.sdiff("new-products-sellable", "products-sellable");
    await db.sadd("products-sellable", products);
    await db.del("new-products-sellable");

    // break out of the loop because we only need it to work once
    break;
  }
  console.log(newProducts);
  const queue = new Queue<CachePrime>(config.queue, config.redis);
  const locales = await getSetting("locales");
  for await (let productId of newProducts) {
    locales.forEach(async locale => {
      const params = {
        productId,
	locales
      }
      await queue.add("", params);
    });
  }
  // end the job
}
