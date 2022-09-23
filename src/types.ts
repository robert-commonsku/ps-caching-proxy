export {
  GetAvailableLocationsRequest,
  GetDecorationColorsRequest,
  GetFobPointsRequest,
  GetAvailableChargesRequest,
  GetConfigurationAndPricingRequest,
  type PPCRequest,
  type PPCResponse
} from "./soap/ppc/1.0.0/index.ts";

type OmittedFields = "wsVersion" | "id" | "password" | "productId";
export type GetAvailableLocationsParams = Omit<GetAvailableLocationsRequest, "wsVersion" | "id" | "password" | "productId">;
export type GetDecorationColorsParams = Omit<GetDecorationColorsRequest, "wsVersion" | "id" | "password" | "productId">;
export type GetFobPointsParams = Omit<GetFobPointsRequest, "wsVersion" | "id" | "password" | "productId">;
export type GetAvailableChargesParams = Omit<GetAvailableChargesRequest, "wsVersion" | "id" | "password" | "productId">;
export type GetConfigurationAndPricingParams = Omit<GetConfigurationAndPricingRequest, "wsVersion" | "id" | "password" | "productId">;

export type PPCParams = GetAvailableLocationsParams | GetDecorationColorsParams | GetFobPointsParams | GetAvailableChargesParams | GetConfigurationAndPricingParams;

export interface LogEntry {
  id?: string;
  date: number;
  method: string;
  accountId: string;
  productId: string;
  params?: PPCParams;
  duration: number;
  errors: number[];
}

export interface RequestLogEntry extends LogEntry {
  ip: string;
  cacheHit: boolean;
  isREST: boolean;
  backendId?: string;
}

export interface CachePrime {
  productId: string;
  locale: string;
}

export interface RequestJob {
  methodName: string;
  params: PPCRequest;
}

export interface FanRequestJob {
  methodName: string;
}
