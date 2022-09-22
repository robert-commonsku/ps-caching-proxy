#!/usr/bin/env -S deno run -A --watch=static/,routes/

// This is necessary because of some import challenges with the new unstable npm imports
import { createClientAsync } from "./soap/ppc/1.0.0/index.ts";

import dev from "$fresh/dev.ts";

await dev(import.meta.url, "./main.ts");
