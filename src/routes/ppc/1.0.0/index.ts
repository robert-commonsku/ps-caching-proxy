import { Handlers } from "$fresh/server.ts";
import {
  getMethodFromRequest,
  getPPCClient,
  getSoapFaultResponse,
  getSoapResponse,
} from "../../../soap.ts";
import { getSetting } from "../../../settings.ts";
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
} from "../../../verify.ts";
import { login } from "../../../db.ts";
import { forward, retrieve } from "../../../backend.ts";
import { getParams } from "../../../utils.ts";

export const handler: Handlers = {
  async POST(req: Request, ctx) {
    const client = await getPPCClient();
    const transforms = [];

    const reqBody = await req.text();
    let jsonReq;
    try {
      jsonReq = client.wsdl.xmlToObject(reqBody).Body;
    } catch (e: Error) {
      ctx.state.errors.push(ERROR_BAD_XML);
      return await getSoapFaultResponse(e);
    }
    const requestName = Object.keys(jsonReq)[0];
    const methodName = await getMethodFromRequest(requestName);
    ctx.state.method = methodName;
    jsonReq = jsonReq[requestName];
    ctx.state.params = getParams(jsonReq);

    let response;
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
      response = {};
    } else {
      ctx.state.accountId = jsonReq.id;
    }
    if (!jsonReq.password) {
      transforms.push(getErrorTransform(ERROR_AUTHENTICATION_REQUIRED));
      ctx.state.errors.push(ERROR_AUTHENTICATION_REQUIRED);
      response = {};
    }
    if (jsonReq.wsVersion !== await getSetting("ppc-version")) {
      transforms.push(getErrorTransform(ERROR_WSVERSION_NOT_FOUND));
      ctx.state.errors.push(ERROR_WSVERSION_NOT_FOUND);
      response = {};
    }
    if (jsonReq.productId) {
      ctx.state.productId = jsonReq.productId;
    }
    if (!await login(jsonReq.id, jsonReq.password)) {
      transforms.push(getErrorTransform(ERROR_AUTHENTICATION_FAILED));
      ctx.state.errors.push(ERROR_AUTHENTICATION_FAILED);
      response = await forward(methodName, jsonReq, ctx.state);
    }
    if (!response) {
      response = await retrieve(methodName, jsonReq);
      if (!response) {
        response = await forward(methodName, jsonReq, ctx.state);
      } else {
        ctx.state.cacheHit = true;
      }
    }

    transforms.forEach((t) => t(response));

    const soapResponse = await getSoapResponse(requestName, response);
    return soapResponse;
  },
};
