import { useState } from "preact/hooks";
import { Handlers, PageProps } from "$fresh/server.ts";

import Settings from "../islands/Settings.tsx";

import { getSettings, Settings as AppSettings } from "../settings.ts";

export const handler: Handlers<AppSettings> = {
  async GET(_, ctx) {
    const settings = await getSettings();
    return ctx.render({ settings });
  }
};

export default function SettingsPage({ data : { settings }}: PageProps<AppSettings>) {
  return (
    <div>
      <h1>ChipPPC Settings</h1>
      {!!settings && <Settings settings={settings} />}
    </div>
  );
};
