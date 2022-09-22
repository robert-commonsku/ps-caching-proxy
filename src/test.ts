import { Job } from "npm:bull";
import getProducts from "./workers/get_products.ts";

await getProducts(10);
