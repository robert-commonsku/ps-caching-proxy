// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/api/joke.ts";
import * as $2 from "./routes/api/settings.ts";
import * as $3 from "./routes/index.tsx";
import * as $4 from "./routes/ppc/1.0.0/index.ts";
import * as $5 from "./routes/ppc/_middleware.ts";
import * as $6 from "./routes/settings.tsx";
import * as $7 from "./routes/test.ts";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/Select.tsx";
import * as $$2 from "./islands/Settings.tsx";
import * as $$3 from "./islands/TextInput.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/api/joke.ts": $1,
    "./routes/api/settings.ts": $2,
    "./routes/index.tsx": $3,
    "./routes/ppc/1.0.0/index.ts": $4,
    "./routes/ppc/_middleware.ts": $5,
    "./routes/settings.tsx": $6,
    "./routes/test.ts": $7,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/Select.tsx": $$1,
    "./islands/Settings.tsx": $$2,
    "./islands/TextInput.tsx": $$3,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;