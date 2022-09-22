import db from "./db.ts";

export interface Settings {
  hostname: string;
  ppc_url: string;
  ppc_version: "1.0.0";
  pd_url: string;
  pd_version: "1.0.0" | "2.0.0";
  locales: string[];
  default_locale: string;
}

const DEFAULT_LOCALES = ["en-US"];
const DEFAULT_LOCALE = "en-US";

export async function saveSettings(settings: Settings) {
  const resp = await Promise.all([
    db.set("setting:hostname", settings.hostname),
    db.set("setting:ppc-endpoint", settings.ppc_url),
    db.set("setting:ppc-version", settings.ppc_version),
    db.set("setting:product-data-endpoint", settings.pd_url),
    db.set("setting:product-data-version", settings.pd_version),
    db.set("setting:default-locale", settings.default_locale)
  ]);
  return resp.every(x => x);
}

export async function getSetting(setting: string): string {
  if ("locales" === setting) {
    return DEFAULT_LOCALES;
  }
  return await db.get(`setting:${setting}`);
}

export async function setSetting(setting: string, value: string): boolean {
  return await db.set(`setting:${setting}`, value);
}

export async function isLocaleOk(language: string, country: string): boolean {
  const locale = `${language.toLowerCase()}-${country.toUpperCase()}`;
}

export async function getSettings(): Settings {
  const [
    hostname = "",
    ppc_url = "",
    ppc_version = "1.0.0",
    pd_url = "",
    pd_version = "2.0.0",
    default_locale = "en-US"
  ] = await Promise.all([
    db.get("setting:hostname"),
    db.get("setting:ppc-endpoint"),
    db.get("setting:ppc-version"),
    db.get("setting:product-data-endpoint"),
    db.get("setting:product-data-version"),
    db.get("setting:default-locale")
  ]);
  const settings: Settings = {
    hostname: hostname ?? "",
    ppc_url: ppc_url ?? "",
    ppc_version: ppc_version ?? "1.0.0",
    pd_url: pd_url ?? "",
    pd_version: pd_version ?? "2.0.0",
    locales: DEFAULT_LOCALES,
    default_locale: default_locale ?? DEFAULT_LOCALE
  };
  return settings;
}
