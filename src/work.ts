import config from "./config.ts";
import { Worker } from "./db.ts";
import { DataRequest } from "./types.ts";
import request from "./workers/request.ts";
import fanRequests from "./workers/fan_requests.ts";
import getProducts from "./workers/get_products.ts";

const w = new Worker<DataRequest | void>(
  config.product_queue,
  {
    "request": request,
    "fan-requests": fanRequests,
    "get-products": getProducts,
  },
);

await w.run();
