import { Handlers } from "$fresh/server.ts";
import {
  getMethodFromRequest,
  getPPCClient,
  getSoapFaultResponse,
  getSoapResponse,
} from "../../../soap.ts";
import {
  ERROR_BAD_XML
} from "../../../verify.ts";
import defaultHandler from "../../../handler.ts";

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
    jsonReq = jsonReq[requestName];
    const response = await defaultHandler(methodName, jsonReq, ctx);
    const soapResponse = await getSoapResponse(requestName, response);
    return soapResponse;
  },
};
