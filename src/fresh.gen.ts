// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/api/settings.ts";
import * as $1 from "./routes/architecture.ts";
import * as $2 from "./routes/health.ts";
import * as $3 from "./routes/index.tsx";
import * as $4 from "./routes/ppc/1.0.0/charges/[productId].ts";
import * as $5 from "./routes/ppc/1.0.0/config-price/[productId]/[fobId]/[currency]/[configurationType]/[priceType].ts";
import * as $6 from "./routes/ppc/1.0.0/decoration-colors/[productId]/[locationId].ts";
import * as $7 from "./routes/ppc/1.0.0/fob-points/[productId].ts";
import * as $8 from "./routes/ppc/1.0.0/index.ts";
import * as $9 from "./routes/ppc/1.0.0/locations/[productId].ts";
import * as $10 from "./routes/ppc/_middleware.ts";
import * as $$0 from "./islands/ActiveUsers.tsx";
import * as $$1 from "./islands/Badge.tsx";
import * as $$2 from "./islands/Issues.tsx";
import * as $$3 from "./islands/MapChart.tsx";
import * as $$4 from "./islands/PopularProducts.tsx";
import * as $$5 from "./islands/RequestDurationChart.tsx";
import * as $$6 from "./islands/RequestTimeChart.tsx";
import * as $$7 from "./islands/Select.tsx";
import * as $$8 from "./islands/TextInput.tsx";

const manifest = {
  routes: {
    "./routes/api/settings.ts": $0,
    "./routes/architecture.ts": $1,
    "./routes/health.ts": $2,
    "./routes/index.tsx": $3,
    "./routes/ppc/1.0.0/charges/[productId].ts": $4,
    "./routes/ppc/1.0.0/config-price/[productId]/[fobId]/[currency]/[configurationType]/[priceType].ts":
      $5,
    "./routes/ppc/1.0.0/decoration-colors/[productId]/[locationId].ts": $6,
    "./routes/ppc/1.0.0/fob-points/[productId].ts": $7,
    "./routes/ppc/1.0.0/index.ts": $8,
    "./routes/ppc/1.0.0/locations/[productId].ts": $9,
    "./routes/ppc/_middleware.ts": $10,
  },
  islands: {
    "./islands/ActiveUsers.tsx": $$0,
    "./islands/Badge.tsx": $$1,
    "./islands/Issues.tsx": $$2,
    "./islands/MapChart.tsx": $$3,
    "./islands/PopularProducts.tsx": $$4,
    "./islands/RequestDurationChart.tsx": $$5,
    "./islands/RequestTimeChart.tsx": $$6,
    "./islands/Select.tsx": $$7,
    "./islands/TextInput.tsx": $$8,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
