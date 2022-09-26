import config from "../config.ts";
import db, {
  getPassword,
  invalidateLogin,
  Queue,
} from "../db.ts";
import { getPDClient } from "../soap.ts";
import { hasError } from "../verify.ts";
import { DataRequest, PPC_METHODS } from "../types.ts";
import { getSetting } from "../settings.ts";
import { accounts } from "../utils.ts";

export default async function getProducts() {
  console.log("get-products");
  const client = await getPDClient();
  let newProducts: string[] = [];

  for await (const accountId of accounts()) {
    const password = await getPassword(accountId);
    if (!password) {
      continue;
    }
    const req = {
      wsVersion: "2.0.0",
      id: accountId,
      password,
      localizationCountry: "US",
      localizationLanguage: "en",
      isSellable: true,
    };
    const resp = (await client.getProductSellableAsync(req))[0];
    if (resp?.ServiceMessageArray?.ServiceMessage === "405") {
      await invalidateLogin(accountId);
      continue;
    }
    const products = Array.from(new Set(
      (resp?.ProductSellableArray?.ProductSellable ?? []).map((p) => p.productId)
    )) as string[];
    if (products.length > 0) {
      await db.sadd("new-products-sellable", ...products);
    }
    newProducts = await db.sdiff("new-products-sellable", "products-sellable");
    if (newProducts.length > 0) {
      await db.sadd("products-sellable", ...newProducts);
    }
    await db.del("new-products-sellable");

    // break out of the loop because we only need it to work once
    break;
  }
  const queue = new Queue<DataRequest>(config.product_queue);
  const locales = await getSetting("locales") as string[];
  locales.forEach((locale) => {
    const [localizationLanguage, localizationCountry] = locale.split("-");
    PPC_METHODS.forEach(async (methodName) => {
      const params = {
        localizationLanguage,
        localizationCountry,
      };
      await queue.add({
        methodName,
        params,
      }, "fan-requests");
    });
  });
}
