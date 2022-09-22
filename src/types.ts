export {
  GetAvailableLocationsRequest,
  GetDecorationColorsRequest,
  GetFobPointsRequest,
  GetAvailableChargesRequest,
  GetConfigurationAndPricingRequest
} from "./soap/ppc/1.0.0/index.ts";

export interface LogEntry {
  id?: string;
  date: number;
  method: string;
  accountId: string;
  productId: string;
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
