import { Handlers } from "$fresh/server.ts";
import {
  getPPCClient,
  getSoapFaultResponse,
  getSoapResponse,
  getMethodFromRequest
} from "../../../soap.ts";
import { getSetting, setSetting } from "../../../settings.ts";
import { isLocaleOk, getErrorTransform } from "../../../verify.ts";
import { login } from "../../../db.ts";
import { forward, retrieve } from "../../../backend.ts";

export const handler: Handlers = {
  async POST(req: Request, ctx) {
    const client = await getPPCClient();
    const transforms = [];

    const reqBody = await req.text();
    let jsonReq;
    try {
      jsonReq = client.wsdl.xmlToObject(reqBody).Body;
    } catch (e: Error) {
      ctx.state.errors.push(0);
      return await getSoapFaultResponse(e);
    }
    const requestName = Object.keys(jsonReq)[0];
    const methodName = await getMethodFromRequest(requestName);
    ctx.state.method = methodName;
    jsonReq = jsonReq[requestName];

    let response;
    if (!await isLocaleOk(jsonReq.localizationLanguage, jsonReq.localizationCountry)) {
      const defaultLocale = await getSetting("default-locale");
      [jsonReq.localizationLanguage, jsonReq.localizationCountry] = defaultLocale.split("-");
      transforms.push(getErrorTransform(404, "localizationCountry not found"));
      ctx.state.errors.push(404);
      transforms.push(getErrorTransform(405, "localizationLanguage not found"));
      ctx.state.errors.push(405);
    }
    if (!jsonReq.id) {
      transforms.push(getErrorTransform(100, "ID (customerID) not found"));
      ctx.state.errors.push(100);
      response = {};
    } else {
      ctx.state.accountId = jsonReq.id;
    }
    if (!jsonReq.password) {
      transforms.push(getErrorTransform(110, "Authentication Credentials required"));
      ctx.state.errors.push(110);
      response = {};
    }
    if (jsonReq.wsVersion !== await getSetting("ppc-version")) {
      transforms.push(getErrorTransform(115, "wsVersion not found"));
      ctx.state.errors.push(115);
      response = {};
    }
    if (jsonReq.productId) {
      ctx.state.productId = jsonReq.productId;
    }
    if (!await login(jsonReq.id, jsonReq.password)) {
      transforms.push(getErrorTransform(105, "Authentication Credentials failed"));
      ctx.state.errors.push(105);
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

    transforms.forEach(t => t(response));

    const soapResponse = await getSoapResponse(requestName, response);
    return soapResponse;
  }
};
