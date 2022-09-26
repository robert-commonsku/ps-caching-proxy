import type {
  GetAvailableChargesRequest,
  GetAvailableLocationsRequest,
  GetConfigurationAndPricingRequest,
  GetDecorationColorsRequest,
  GetFobPointsRequest,
  PPCRequest,
  PPCResponse,
} from "./soap/ppc/1.0.0/index.ts";

export type {
  GetAvailableChargesRequest,
  GetAvailableLocationsRequest,
  GetConfigurationAndPricingRequest,
  GetDecorationColorsRequest,
  GetFobPointsRequest,
  PPCRequest,
  PPCResponse,
};

type OmittedFields = "wsVersion" | "id" | "password" | "productId";
export type GetAvailableLocationsParams = Omit<
  GetAvailableLocationsRequest,
  "wsVersion" | "id" | "password" | "productId"
>;
export type GetDecorationColorsParams = Omit<
  GetDecorationColorsRequest,
  "wsVersion" | "id" | "password" | "productId"
>;
export type GetFobPointsParams = Omit<
  GetFobPointsRequest,
  "wsVersion" | "id" | "password" | "productId"
>;
export type GetAvailableChargesParams = Omit<
  GetAvailableChargesRequest,
  "wsVersion" | "id" | "password" | "productId"
>;
export type GetConfigurationAndPricingParams = Omit<
  GetConfigurationAndPricingRequest,
  "wsVersion" | "id" | "password" | "productId"
>;

export type PPCParams =
  | GetAvailableLocationsParams
  | GetDecorationColorsParams
  | GetFobPointsParams
  | GetAvailableChargesParams
  | GetConfigurationAndPricingParams;

type LogEntryType = "request" | "backend";

export const PPC_METHODS = [
  "getAvailableLocations",
  "getAvailableCharges",
  "getFobPoints",
  "getDecorationColors",
  "getConfigurationAndPricing",
];

export interface LogEntry {
  id?: string;
  type: LogEntryType;
  date: number;
  method: string;
  accountId: string;
  productId: string;
  params?: PPCParams;
  duration: number;
  errors: string[];
}

export interface RequestLogEntry extends LogEntry {
  ip: string;
  type: "request";
  cacheHit: boolean;
  isREST: boolean;
  backendId?: string;
}

export interface BackendLogEntry extends LogEntry {
  type: "backend";
}

export type JobStatus = "queued" | "processing" | "done" | "failed";
export type JobType = "stats" | "fan-requests" | "request" | "get-products";

export interface DataRequest {
  methodName: string;
  params: PPCRequest;
}
