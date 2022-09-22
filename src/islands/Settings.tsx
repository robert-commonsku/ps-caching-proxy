import { useState } from "preact/hooks";

import TextInput from "../islands/TextInput.tsx";
import Select from "../islands/Select.tsx";
import { Button } from "../components/Button.tsx";

import { Settings as AppSettings, saveSettings } from "../settings.ts";

interface SettingsProps {
  settings: AppSettings;
}

export default function Settings({ settings }: SettingsProps) {
  const [hostname, setHostname] = useState<string>(settings.hostname);
  const [ppcUrl, setPpcUrl] = useState<string>(settings.ppc_url);
  const [ppcVersion, setPpcVersion] = useState<"1.0.0">(settings.ppc_version);
  const [pdUrl, setPdUrl] = useState<string>(settings.pd_url);
  const [pdVersion, setPdVersion] = useState<"1.0.0" | "2.0.0">(settings.pd_version);
  const [defaultLocale, setDefaultLocale] = useState<string>(settings.default_locale);

  const onSave = async () => {
    const newSettings: AppSettings = {
      hostname,
      ppc_url: ppcUrl,
      ppc_version: ppcVersion,
      pd_url: pdUrl,
      pd_version: pdVersion,
      locales: settings.locales,
      default_locale: defaultLocale
    }; 
    await saveSettings(newSettings);
  };

  return (
    <div>
      <p class="my-6">
        <label>Hostname:</label>
        <TextInput type="text" value={hostname} onChange={e => setHostname(e.target.value)} />
      </p>
      <p class="my-6">
        <label>PPC URL:</label>
        <TextInput type="text" value={ppcUrl} onChange={e => setPpcUrl(e.target.value)} />
      </p>
      <p class="my-6">
        <label>PPC Version:</label>
        <Select options={[{ value: "1.0.0" }]} value={ppcVersion} onChange={e => setPpcVersion(e.target.value)} />
      </p>
      <p class="my-6">
        <label>Product Data URL:</label>
        <TextInput type="text" value={pdUrl} onChange={e => setPdUrl(e.target.value)} />
      </p>
      <p class="my-6">
        <label>Product Data Version:</label>
        <Select  options={[{ value: "1.0.0" }, { value: "2.0.0" }]} value={pdVersion} onChange={e => setPdVersion(e.target.value)} />
      </p>
      <p class="my-6">
        <label>Default Locale:</label>
        <Select options={settings.locales.map(l => ({ value: l }))} value={defaultLocale} onChange={e => setDefaultLocale(e.target.value)} />
      </p>
      <p class="my-6">
        <Button onClick={onSave}>Save</Button>
      </p>
    </div>
  );
};
