import { Handlers } from "$fresh/server.ts";

import { getSettings, saveSettings } from "../../settings.ts";

export const handler: Handlers<AppSettings> = {
  async PUT(req, _ctx) {
    const settings = await req.json();
    await saveSettings(settings);
    const new_settings = await getSettings();
    return new Response(new_settings);
  }
};
