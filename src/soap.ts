import { WSDL } from "npm:soap/lib/wsdl/index.js";
import {
  PricingAndConfigurationClient,
  createClientAsync as createPricingAndConfigurationClient,
  ErrorMessage,
} from "./soap/ppc/1.0.0/index.ts";
import {
  ProductDataServiceClient,
  createClientAsync as createProductDataClient
} from "./soap/pd/2.0.0/index.ts";
import { getSetting } from "./settings.ts";
export {
  type PPCRequest,
  type PPCResponse
} from "./soap/ppc/1.0.0/index.ts";
export { type PDRequest, type PDResponse } from "./soap/pd/2.0.0/index.ts";

const PPC_WSDL = "./soap/ppc/1.0.0/wsdl/PricingAndConfiguration.wsdl";
const PD_WSDL = "./soap/pd/2.0.0/wsdl/ProductDataService.wsdl";

let ppcClient: PricingAndConfigurationClient;
let pdClient: ProductDataServiceClient;

export async function getPPCClient(): PricingAndConfigurationClient {
  if (!ppcClient) {
    const endpoint = await getSetting("ppc-endpoint");
    const options = { endpoint };
    ppcClient = await createProductDataClient(
      PPC_WSDL,
      options
    );
  }
  return ppcClient;
}

export async function getPDClient(): ProductDataServiceClient {
  if (!pdClient) {
    const endpoint = await getSetting("pd-endpoint");
    const options = { endpoint };
    pdClient = await createProductDataClient(
      PD_WSDL,
      options
    );
  }
  return pdClient;
}

function envelope(body, xmlnsInEnvelope = "") {
  const xml = '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope ' +
    'xmlns:soap="http://www.w3.org/2003/05/soap-envelope" ' +
     xmlnsInEnvelope +
    '>' +
    (body ? '<soap:Body>' + body + '</soap:Body>' : '<soap:Body />')
    '</soap:Envelope>';
  return xml;
}

export async function getSoapFaultResponse(fault): Response {
  const client = await getPPCClient();
  const xml = client.wsdl.objectToDocumentXML("Fault", fault, "soap");
  return new Response(envelope(xml), {
    headers: { "Content-Type": "text/xml; charset=utf-8" }
  });
}

function getPPCBinding(wsdl: WSDL) {
  const serviceName = "PricingAndConfigurationService";
  const portName = "PricingAndConfigurationServiceBinding";
  return wsdl.definitions.services[serviceName].ports[portName].binding;
}

export async function getMethodFromRequest(requestName: string): string {
  const client = await getPPCClient();
  const binding = getPPCBinding(client.wsdl);
  const methodName = binding.topElements[requestName].methodName;
  return methodName;
}

export async function getSoapResponse(requestName: string, resp: PPCResponse): Response {
  const client = await getPPCClient();
  const binding = getPPCBinding(client.wsdl);
  const methodName = binding.topElements[requestName].methodName;
  const outputName = binding.topElements[requestName].outputName;
  const element = binding.methods[methodName].output;
  const xml = client.wsdl.objectToDocumentXML(outputName, resp, element.targetNSAlias, element.targetNamespace);
  return new Response(envelope(xml), {
    headers: { "Content-Type": "text/xml" }
  });
}
