import { Accepts } from "https://deno.land/x/accepts@2.1.1/mod.ts";
import { getSetting } from "./settings.ts";
import {
  ERROR_AUTHENTICATION_FAILED,
  ERROR_AUTHENTICATION_REQUIRED,
  ERROR_BAD_XML,
  ERROR_ID_NOT_FOUND,
  ERROR_LOCALIZATION_LANGUAGE_NOT_FOUND,
  ERROR_LOCALIZATION_COUNTRY_NOT_FOUND,
  ERROR_WSVERSION_NOT_FOUND,
  getErrorTransform,
  isLocaleOk,
} from "./verify.ts";
import { login } from "./db.ts";
import { forward, retrieve } from "./backend.ts";
import { getParams, getQueryParams } from "./utils.ts";

function getUnauthorizedResponse() {
  return new Response(
    "Unauthorized",
    {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "WWW-Authenticate": 'Basic realm="PromoStandards PPC proxy"'
      }
    }
  );
}

export async function restHandler(methodName: string, req: Request, ctx) {
  const authorization = req.headers.get("authorization");
  if (!authorization) {
    throw getUnauthorizedResponse();
  }
  const match = authorization.match(/^Basic\s+(.*)$/);
  if (!match) {
    throw getUnauthorizedResponse();
  }
  const [accountId, password] = atob(match[1]).split(":");

  const accept = new Accepts(req.headers);
  const locales = await getSetting("locales") as string[];
  let locale = accept.languages(locales);
  if (false === locale) {
    locale = await getSetting("default-locale");
    if (false === locale) {
      locale = "en-US";
    }
  } else if (typeof locale !== "string") {
    locale = locale[0];
  }
  const [localizationLanguage, localizationCountry] = locale.split("-");

  const params = {
    ...ctx.params,
    ...getQueryParams(req),
    wsVersion: "1.0.0",
    id: accountId,
    password,
    localizationLanguage,
    localizationCountry
  };

  return defaultHandler(methodName, params, ctx);
}

export default async function defaultHandler(methodName, jsonReq, ctx) {
  const transforms = [];
  ctx.state.method = methodName;
  ctx.state.params = getParams(jsonReq);

  let resp;
  if (
    !await isLocaleOk(
      jsonReq.localizationLanguage,
      jsonReq.localizationCountry,
    )
  ) {
    const defaultLocale = await getSetting("default-locale");
    [jsonReq.localizationLanguage, jsonReq.localizationCountry] =
      defaultLocale.split("-");
    transforms.push(getErrorTransform(ERROR_LOCALIZATION_COUNTRY_NOT_FOUND));
    ctx.state.errors.push(ERROR_LOCALIZATION_COUNTRY_NOT_FOUND);
    transforms.push(getErrorTransform(ERROR_LOCALIZATION_LANGUAGE_NOT_FOUND));
    ctx.state.errors.push(ERROR_LOCALIZATION_LANGUAGE_NOT_FOUND);
  }
  if (!jsonReq.id) {
    transforms.push(getErrorTransform(ERROR_ID_NOT_FOUND));
    ctx.state.errors.push(ERROR_ID_NOT_FOUND);
    resp = {};
  } else {
    ctx.state.accountId = jsonReq.id;
  }
  if (!jsonReq.password) {
    transforms.push(getErrorTransform(ERROR_AUTHENTICATION_REQUIRED));
    ctx.state.errors.push(ERROR_AUTHENTICATION_REQUIRED);
    resp = {};
  }
  if (jsonReq.wsVersion !== await getSetting("ppc-version")) {
    transforms.push(getErrorTransform(ERROR_WSVERSION_NOT_FOUND));
    ctx.state.errors.push(ERROR_WSVERSION_NOT_FOUND);
    resp = {};
  }
  if (jsonReq.productId) {
    ctx.state.productId = jsonReq.productId;
  }
  if (!await login(jsonReq.id, jsonReq.password)) {
    transforms.push(getErrorTransform(ERROR_AUTHENTICATION_FAILED));
    ctx.state.errors.push(ERROR_AUTHENTICATION_FAILED);
    resp = await forward(methodName, jsonReq, ctx.state);
  }
  if (!resp) {
    resp = await retrieve(methodName, jsonReq);
    if (!resp) {
      resp = await forward(methodName, jsonReq, ctx.state);
    } else {
      ctx.state.cacheHit = true;
    }
  }
  transforms.forEach((t) => t(resp));

  return resp;
}
