import { getSetting } from "./settings.ts";
import { type PPCResponse, type PPCRequest, ErrorMessage } from "./soap/ppc/1.0.0/index.ts";

export function getLocale(req: PPCRequest) {
  return `${req.localizationLanguage.toLowerCase()}-${req.localizationCountry.toUpperCase()}`;
};

export async function isLocaleOk(language: string, country: string): boolean {
  const locale = `${language.toLowerCase()}-${country.toUpperCase()}`;
  const locales = await getSetting("locales");
  return locales.includes(locale);
}

export function hasError(response: PPCResponse, code?: number): boolean {
  if (!response.ErrorMessage) {
    return false;
  }
  return response.ErrorMessage.filter(m => !code || code === m.code).length > 0;
}

export function getErrorCodes(response: PPCResponse): number[] {
  if (!response.ErrorMessage) {
    return [] as number[];
  }
  return response.ErrorMessage.map(m => m.code);
}

export function getErrorTransform(code: number, description: string) {
  return (response: PPCResponse): PPCResponse => {
    if (!response.ErrorMessage) {
      response.ErrorMessage = [];
    }
    if (response.ErrorMessage.filter(m => m.code === code).length === 0) {
      response.ErrorMessage.push({
        code,
        description
      } as ErrorMessage);
    }
    return response;
  };
};
