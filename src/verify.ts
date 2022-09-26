import { getSetting } from "./settings.ts";
import { ErrorMessage } from "./soap/ppc/1.0.0/index.ts";
import type {
  PPCRequest,
  PPCResponse,
} from "./soap/ppc/1.0.0/index.ts";

export function getLocale(req: PPCRequest) {
  return `${(req?.localizationLanguage ?? "en").toLowerCase()}-${(req?.localizationCountry ?? "US").toUpperCase()}`;
}

export async function isLocaleOk(language: string, country: string): Promise<boolean> {
  const locale = `${language.toLowerCase()}-${country.toUpperCase()}`;
  const locales = await getSetting("locales") ?? ["en-US"] as string[];
  return locales.includes(locale);
}

export const ERROR_BAD_XML = "0";
export const ERROR_ID_NOT_FOUND = "100";
export const ERROR_ACCOUNT_NOT_AUTHORIZED = "104";
export const ERROR_AUTHENTICATION_FAILED = "105";
export const ERROR_AUTHENTICATION_REQUIRED = "110";
export const ERROR_WSVERSION_NOT_FOUND = "115";
export const ERROR_FIELDS_REQUIRED = "120";
export const ERROR_NOT_SUPPORTED = "125";
export const ERROR_PRODUCT_ID_NOT_FOUND = "400";
export const ERROR_CURRENCY_NOT_FOUND = "401";
export const ERROR_PRICE_TYPE_NOT_FOUND = "402";
export const ERROR_FOB_ID_NOT_FOUND = "403";
export const ERROR_LOCALIZATION_COUNTRY_NOT_FOUND = "404";
export const ERROR_LOCALIZATION_LANGUAGE_NOT_FOUND = "405";
export const ERROR_CONFIGURATION_TYPE_NOT_FOUND = "406";
export const ERROR_GENERAL = "999";

const ERROR_MESSAGES: {[code: string]: string} = {
  [ERROR_BAD_XML]: "Unable to parse XML",
  [ERROR_ID_NOT_FOUND]: "ID (customerID not found",
  [ERROR_ACCOUNT_NOT_AUTHORIZED]:
    "This account is unauthorized to use this service.  Please contact the service provider",
  [ERROR_AUTHENTICATION_FAILED]: "Authentication Credentials failed",
  [ERROR_AUTHENTICATION_REQUIRED]: "Authentication Credentials required",
  [ERROR_WSVERSION_NOT_FOUND]: "wsVersion not found",
  [ERROR_FIELDS_REQUIRED]:
    "The following field(s) are required [Comma Delimited field names]",
  [ERROR_NOT_SUPPORTED]: "Not Supported: [details]",
  [ERROR_PRODUCT_ID_NOT_FOUND]: "productID not found",
  [ERROR_CURRENCY_NOT_FOUND]: "currencyID not found",
  [ERROR_PRICE_TYPE_NOT_FOUND]: "priceType not found",
  [ERROR_FOB_ID_NOT_FOUND]: "fobId not found",
  [ERROR_LOCALIZATION_COUNTRY_NOT_FOUND]: "localizationCountry not found",
  [ERROR_LOCALIZATION_LANGUAGE_NOT_FOUND]: "localizationLanguage not found",
  [ERROR_CONFIGURATION_TYPE_NOT_FOUND]: "configurationType not found",
  [ERROR_GENERAL]:
    "General Error – Contact the System Service Provider Details: [Details]",
};

export function getErrorMessage(code: string): string {
  return ERROR_MESSAGES[code] ?? "Unknown Error";
}

export function hasError(response: PPCResponse, code?: string): boolean {
  if (!response?.ErrorMessage?.code) {
    return false;
  }
  if (typeof code === "undefined") {
    return true;
  }
  return response.ErrorMessage.code === code
}

export function getErrorCodes(response: PPCResponse): string[] {
  if (!response?.ErrorMessage?.code) {
    return [] as string[];
  }
  return [response.ErrorMessage.code];
}

export function getErrorTransform(code: string, description?: string) {
  return (response: PPCResponse): PPCResponse => {
    response.ErrorMessage = { code, description };
    return response;
  };
}
