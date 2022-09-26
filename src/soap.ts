import { WSDL } from "npm:soap/lib/wsdl/index.js";
//import { WSDL } from "https://esm.sh/soap";
import {
  createClientAsync as createPricingAndConfigurationClient,
  PricingAndConfigurationClient,
} from "./soap/ppc/1.0.0/index.ts";
import {
  createClientAsync as createProductDataClient,
  ProductDataServiceClient,
} from "./soap/pd/2.0.0/index.ts";
import { getSetting } from "./settings.ts";
import type { 
  PPCRequest,
  PPCResponse
} from "./soap/ppc/1.0.0/index.ts";
export type {
  PPCRequest,
  PPCResponse,
  PricingAndConfigurationClient
}
export type { PDRequest, PDResponse } from "./soap/pd/2.0.0/index.ts";

const PPC_WSDL = "./soap/ppc/1.0.0/wsdl/PricingAndConfiguration.wsdl";
const PD_WSDL = "./soap/pd/2.0.0/wsdl/ProductDataService.wsdl";

let ppcClient: PricingAndConfigurationClient;
let pdClient: ProductDataServiceClient;

export async function getPPCClient(): Promise<PricingAndConfigurationClient> {
  if (!ppcClient) {
    const options = { endpoint: "" };
    let endpoint = await getSetting("ppc-endpoint") ?? "";
    if (typeof endpoint !== "string") {
      endpoint = endpoint[0];
    }
    options.endpoint = endpoint;
    ppcClient = await createPricingAndConfigurationClient(
      PPC_WSDL,
      options,
    );
  }
  return ppcClient;
}

export async function getPDClient(): Promise<ProductDataServiceClient> {
  if (!pdClient) {
    const options = { endpoint: "" };
    let endpoint = await getSetting("pd-endpoint") ?? "";
    if (typeof endpoint !== "string") {
      endpoint = endpoint[0];
    }
    options.endpoint = endpoint;
    pdClient = await createProductDataClient(
      PD_WSDL,
      options,
    );
  }
  return pdClient;
}

function envelope(body: string, xmlnsInEnvelope = "") {
  const xml = '<?xml version="1.0" encoding="utf-8"?>' +
    "<soap:Envelope " +
    'xmlns:soap="http://www.w3.org/2003/05/soap-envelope" ' +
    xmlnsInEnvelope +
    ">" +
    (body ? "<soap:Body>" + body + "</soap:Body>" : "<soap:Body />");
  "</soap:Envelope>";
  return xml;
}

export async function getSoapFaultResponse(fault: any): Promise<Response> {
  const client = await getPPCClient();
  const xml = client.wsdl.objectToDocumentXML("Fault", fault, "soap");
  return new Response(envelope(xml), {
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
}

function getPPCBinding(wsdl: WSDL) {
  const serviceName = "PricingAndConfigurationService";
  const portName = "PricingAndConfigurationServiceBinding";
  return wsdl.definitions.services[serviceName].ports[portName].binding;
}

export async function getMethodFromRequest(requestName: string): Promise<string> {
  const client = await getPPCClient();
  const binding = getPPCBinding(client.wsdl);
  const methodName = binding?.topElements?.[requestName]?.methodName ?? "";
  return methodName;
}

export async function getSoapResponse(
  requestName: string,
  resp: PPCResponse,
): Promise<Response> {
  const client = await getPPCClient();
  const binding = getPPCBinding(client.wsdl);
  const methodName = binding?.topElements?.[requestName]?.methodName ?? requestName;
  const outputName = binding?.topElements?.[requestName]?.outputName ?? requestName;
  const element = binding?.methods?.[methodName]?.output;
  const xml = element ? client.wsdl.objectToDocumentXML(
    outputName,
    resp,
    element?.targetNSAlias ?? "",
    element?.targetNamespace,
  ) : "";
  return new Response(envelope(xml), {
    headers: { "Content-Type": "text/xml" },
  });
}
