import {
  type Client as SoapClient,
  createClientAsync as soapCreateClientAsync
} from "npm:soap";

/**
 * AvailableCharge
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface AvailableCharge {
  /** xsd:int */
  chargeId?: string;
  /** xsd:token|minLength,maxLength */
  chargeName?: string;
  /** xsd:token|minLength,maxLength */
  chargeDescription?: string;
  /** ns2:chargeTypeType|minLength,maxLength */
  chargeType?: string;
}

/**
 * AvailableChargeArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface AvailableChargeArray {
  /** AvailableCharge */
  AvailableCharge?: AvailableCharge;
}

/**
 * AvailableLocation
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface AvailableLocation {
  /** xsd:int */
  locationId?: string;
  /** xsd:string|minLength,maxLength */
  locationName?: string;
}

/**
 * AvailableLocationArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface AvailableLocationArray {
  /** AvailableLocation */
  AvailableLocation?: AvailableLocation;
}

/**
 * Charge
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface Charge {
  /** xsd:int */
  chargeId?: string;
  /** xsd:token|minLength,maxLength */
  chargeName?: string;
  /** xsd:token|minLength,maxLength */
  chargeDescription?: string;
  /** ns2:chargeTypeType|minLength,maxLength */
  chargeType?: string;
  /** ChargePriceArray */
  ChargePriceArray?: ChargePriceArray;
  /** xsd:boolean */
  chargesAppliesLTM?: string;
  /** xsd:int */
  chargesPerLocation?: string;
  /** xsd:int */
  chargesPerColor?: string;
}

/**
 * ChargeArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface ChargeArray {
  /** Charge */
  Charge?: Charge;
}

/** ChargePrice */
export interface ChargePrice {
  /** xsd:int */
  xMinQty?: string;
  /** shared:QuantityUomType|minLength,maxLength */
  xUom?: string;
  /** xsd:int */
  yMinQty?: string;
  /** decorationUomType|xsd:string|Colors,Inches,Locations,Other,Stitches,SquareInches */
  yUom?: string;
  /** xsd:decimal|fractionDigits */
  price?: string;
  /** xsd:string|minLength,maxLength */
  discountCode?: string;
  /** xsd:decimal|fractionDigits */
  repeatPrice?: string;
  /** xsd:string|minLength,maxLength */
  repeatDiscountCode?: string;
  /** xsd:dateTime */
  priceEffectiveDate?: string;
  /** xsd:dateTime */
  priceExpiryDate?: string;
}

/**
 * ChargePriceArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface ChargePriceArray {
  /** ChargePrice */
  ChargePrice?: ChargePrice;
}

/**
 * Color
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface Color {
  /** xsd:token|minLength,maxLength */
  colorId?: string;
  /** xsd:token|minLength,maxLength */
  colorName?: string;
}

/**
 * ColorArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface ColorArray {
  /** Color */
  Color?: Color;
}

/**
 * Configuration
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface Configuration {
  /** PartArray */
  PartArray?: PartArray;
  /** LocationArray */
  LocationArray?: LocationArray;
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** CurrencyCodeType|xs:string|AFA,ALL,DZD,AON,ARS,AMD,AWG,AUD,ATS,AZM,BSD,BHD,BDT,BBD,BYR,BEF,BZD,BMD,BTN,BOB,BAM,BWP,BRL,BND,BGL,BIF,KHR,CAD,CVE,KYD,XOF,XAF,XPF,CLP,CNY,COP,KMF,CDF,CRC,HRK,CUP,CYP,CZK,DKK,DEM,DJF,DOP,NLG,XCD,ECS,EGP,SVC,ERN,EEK,ETB,EUR,FKP,FJD,FIM,FRF,GMD,GEL,GHC,GIP,GRD,GTQ,GYD,HTG,HNL,HKD,HUF,ISK,INR,IDR,IRR,IQD,IEP,ILS,ITL,JMD,JPY,JOD,KZT,KES,KWD,KGS,LAK,LVL,LBP,LSL,LRD,LYD,LTL,LUF,MOP,MKD,MGF,MWK,MYR,MVR,MTL,MRO,MUR,MXN,MDL,MNT,MAD,MZM,MMK,NAD,NPR,ANG,ZRN,NZD,NIC,NGN,KPW,NOK,PKR,PAB,PGK,PYG,PEN,PHP,PLN,PTE,QAR,OMR,ROL,RUR,RWF,STD,SAR,SCR,SLL,SGD,SKK,SIT,SBD,SOS,ZAR,KRW,ESP,LKR,SHP,GBP,SDP,SRG,SZL,SEK,CHF,SYP,TWD,TJR,TZS,THB,TPE,TOP,TTD,TND,TRL,TMM,AED,UGX,UAH,UYU,USD,UZS,VUV,VEB,VND,WST,YER,YUM,ZMK,ZWD */
  currency?: string;
  /** FobArray */
  FobArray?: FobArray;
  /** xsd:string|Customer,List,Net */
  priceType?: string;
}

/**
 * CurrencySupported
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface CurrencySupported {
  /** CurrencyCodeType|xs:string|AFA,ALL,DZD,AON,ARS,AMD,AWG,AUD,ATS,AZM,BSD,BHD,BDT,BBD,BYR,BEF,BZD,BMD,BTN,BOB,BAM,BWP,BRL,BND,BGL,BIF,KHR,CAD,CVE,KYD,XOF,XAF,XPF,CLP,CNY,COP,KMF,CDF,CRC,HRK,CUP,CYP,CZK,DKK,DEM,DJF,DOP,NLG,XCD,ECS,EGP,SVC,ERN,EEK,ETB,EUR,FKP,FJD,FIM,FRF,GMD,GEL,GHC,GIP,GRD,GTQ,GYD,HTG,HNL,HKD,HUF,ISK,INR,IDR,IRR,IQD,IEP,ILS,ITL,JMD,JPY,JOD,KZT,KES,KWD,KGS,LAK,LVL,LBP,LSL,LRD,LYD,LTL,LUF,MOP,MKD,MGF,MWK,MYR,MVR,MTL,MRO,MUR,MXN,MDL,MNT,MAD,MZM,MMK,NAD,NPR,ANG,ZRN,NZD,NIC,NGN,KPW,NOK,PKR,PAB,PGK,PYG,PEN,PHP,PLN,PTE,QAR,OMR,ROL,RUR,RWF,STD,SAR,SCR,SLL,SGD,SKK,SIT,SBD,SOS,ZAR,KRW,ESP,LKR,SHP,GBP,SDP,SRG,SZL,SEK,CHF,SYP,TWD,TJR,TZS,THB,TPE,TOP,TTD,TND,TRL,TMM,AED,UGX,UAH,UYU,USD,UZS,VUV,VEB,VND,WST,YER,YUM,ZMK,ZWD */
  currency?: string;
}

/**
 * CurrencySupportedArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface CurrencySupportedArray {
  /** CurrencySupported */
  CurrencySupported?: CurrencySupported;
}

/**
 * Decoration
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface Decoration {
  /** xsd:int */
  decorationId?: string;
  /** xsd:string|minLength,maxLength */
  decorationName?: string;
  /** xsd:string|minLength,maxLength */
  decorationGeometry?: string;
  /** xsd:decimal|fractionDigits */
  decorationHeight?: string;
  /** xsd:decimal|fractionDigits */
  decorationWidth?: string;
  /** xsd:decimal|fractionDigits */
  decorationDiameter?: string;
  /** ns2:decorationUomType|minLength,maxLength */
  decorationUom?: string;
  /** xsd:boolean */
  allowSubForDefaultLocation?: string;
  /** xsd:boolean */
  allowSubForDefaultMethod?: string;
  /** xsd:int */
  itemPartQuantityLTM?: string;
  /** ChargeArray */
  ChargeArray?: ChargeArray;
  /** xsd:int */
  decorationUnitsIncluded?: string;
  /** xsd:string|minLength,maxLength */
  decorationUnitsIncludedUom?: string;
  /** xsd:int */
  decorationUnitsMax?: string;
  /** xsd:boolean */
  defaultDecoration?: string;
  /** xsd:int */
  leadTime?: string;
  /** xsd:int */
  rushLeadTime?: string;
}

/**
 * DecorationArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface DecorationArray {
  /** Decoration */
  Decoration?: Decoration;
}

/**
 * DecorationColors
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface DecorationColors {
  /** ColorArray */
  ColorArray?: ColorArray;
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:int */
  locationId?: string;
  /** DecorationMethodArray */
  DecorationMethodArray?: DecorationMethodArray;
  /** xsd:boolean */
  pmsMatch?: string;
  /** xsd:boolean */
  fullColor?: string;
}

/**
 * DecorationMethod
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface DecorationMethod {
  /** xsd:int */
  decorationId?: string;
  /** xsd:string|minLength,maxLength */
  decorationName?: string;
}

/**
 * DecorationMethodArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface DecorationMethodArray {
  /** DecorationMethod */
  DecorationMethod?: DecorationMethod;
}

/** ErrorMessage */
export interface ErrorMessage {
  /** xsd:int */
  code?: string;
  /** xsd:token|minLength,maxLength */
  description?: string;
}

/**
 * Fob
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface Fob {
  /** xsd:token|minLength,maxLength */
  fobId?: string;
  /** xsd:string|minLength,maxLength */
  fobPostalCode?: string;
}

/** FobArray */
export interface FobArray {
  /** Fob[] */
  Fob?: Array<Fob>;
}

/**
 * FobPoint
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface FobPoint {
  /** xsd:token|minLength,maxLength */
  fobId?: string;
  /** xsd:string|minLength,maxLength */
  fobCity?: string;
  /** xsd:string|minLength,maxLength */
  fobState?: string;
  /** xsd:string|minLength,maxLength */
  fobPostalCode?: string;
  /** xsd:string|minLength,maxLength */
  fobCountry?: string;
  /** CurrencySupportedArray */
  CurrencySupportedArray?: CurrencySupportedArray;
  /** ProductArray */
  ProductArray?: ProductArray;
}

/**
 * FobPointArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface FobPointArray {
  /** FobPoint */
  FobPoint?: FobPoint;
}

/**
 * GetAvailableChargesRequest
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface GetAvailableChargesRequest {
  /** xsd:token|minLength,maxLength */
  wsVersion?: string;
  /** xsd:token|minLength,maxLength */
  id?: string;
  /** xsd:token|minLength,maxLength */
  password?: string;
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:string|maxLength,minLength */
  localizationCountry?: string;
  /** xsd:string|minLength,maxLength */
  localizationLanguage?: string;
}

/**
 * GetAvailableChargesResponse
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface GetAvailableChargesResponse {
  /** AvailableChargeArray */
  AvailableChargeArray?: AvailableChargeArray;
  /** ErrorMessage */
  ErrorMessage?: ErrorMessage;
}

/**
 * GetAvailableLocationsRequest
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface GetAvailableLocationsRequest {
  /** xsd:token|minLength,maxLength */
  wsVersion?: string;
  /** xsd:token|minLength,maxLength */
  id?: string;
  /** xsd:token|minLength,maxLength */
  password?: string;
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:string|maxLength,minLength */
  localizationCountry?: string;
  /** xsd:string|minLength,maxLength */
  localizationLanguage?: string;
}

/**
 * GetAvailableLocationsResponse
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface GetAvailableLocationsResponse {
  /** AvailableLocationArray */
  AvailableLocationArray?: AvailableLocationArray;
  /** ErrorMessage */
  ErrorMessage?: ErrorMessage;
}

/**
 * GetConfigurationAndPricingRequest
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface GetConfigurationAndPricingRequest {
  /** xsd:token|minLength,maxLength */
  wsVersion?: string;
  /** xsd:token|minLength,maxLength */
  id?: string;
  /** xsd:token|minLength,maxLength */
  password?: string;
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:token|minLength,maxLength */
  partId?: string;
  /** CurrencyCodeType|xs:string|AFA,ALL,DZD,AON,ARS,AMD,AWG,AUD,ATS,AZM,BSD,BHD,BDT,BBD,BYR,BEF,BZD,BMD,BTN,BOB,BAM,BWP,BRL,BND,BGL,BIF,KHR,CAD,CVE,KYD,XOF,XAF,XPF,CLP,CNY,COP,KMF,CDF,CRC,HRK,CUP,CYP,CZK,DKK,DEM,DJF,DOP,NLG,XCD,ECS,EGP,SVC,ERN,EEK,ETB,EUR,FKP,FJD,FIM,FRF,GMD,GEL,GHC,GIP,GRD,GTQ,GYD,HTG,HNL,HKD,HUF,ISK,INR,IDR,IRR,IQD,IEP,ILS,ITL,JMD,JPY,JOD,KZT,KES,KWD,KGS,LAK,LVL,LBP,LSL,LRD,LYD,LTL,LUF,MOP,MKD,MGF,MWK,MYR,MVR,MTL,MRO,MUR,MXN,MDL,MNT,MAD,MZM,MMK,NAD,NPR,ANG,ZRN,NZD,NIC,NGN,KPW,NOK,PKR,PAB,PGK,PYG,PEN,PHP,PLN,PTE,QAR,OMR,ROL,RUR,RWF,STD,SAR,SCR,SLL,SGD,SKK,SIT,SBD,SOS,ZAR,KRW,ESP,LKR,SHP,GBP,SDP,SRG,SZL,SEK,CHF,SYP,TWD,TJR,TZS,THB,TPE,TOP,TTD,TND,TRL,TMM,AED,UGX,UAH,UYU,USD,UZS,VUV,VEB,VND,WST,YER,YUM,ZMK,ZWD */
  currency?: string;
  /** xsd:token|minLength,maxLength */
  fobId?: string;
  /** xsd:string|Customer,List,Net */
  priceType?: string;
  /** xsd:string|maxLength,minLength */
  localizationCountry?: string;
  /** xsd:string|minLength,maxLength */
  localizationLanguage?: string;
  /** xsd:string|Blank,Decorated */
  configurationType?: string;
}

/**
 * GetConfigurationAndPricingResponse
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface GetConfigurationAndPricingResponse {
  /** Configuration */
  Configuration?: Configuration;
  /** ErrorMessage */
  ErrorMessage?: ErrorMessage;
}

/**
 * GetDecorationColorsRequest
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface GetDecorationColorsRequest {
  /** xsd:token|minLength,maxLength */
  wsVersion?: string;
  /** xsd:token|minLength,maxLength */
  id?: string;
  /** xsd:token|minLength,maxLength */
  password?: string;
  /** xsd:int */
  locationId?: string;
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:int */
  decorationId?: string;
  /** xsd:string|maxLength,minLength */
  localizationCountry?: string;
  /** xsd:string|minLength,maxLength */
  localizationLanguage?: string;
}

/**
 * GetDecorationColorsResponse
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface GetDecorationColorsResponse {
  /** DecorationColors */
  DecorationColors?: DecorationColors;
  /** ErrorMessage */
  ErrorMessage?: ErrorMessage;
}

/**
 * GetFobPointsRequest
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface GetFobPointsRequest {
  /** xsd:token|minLength,maxLength */
  wsVersion?: string;
  /** xsd:token|minLength,maxLength */
  id?: string;
  /** xsd:token|minLength,maxLength */
  password?: string;
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:string|maxLength,minLength */
  localizationCountry?: string;
  /** xsd:string|minLength,maxLength */
  localizationLanguage?: string;
}

/**
 * GetFobPointsResponse
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface GetFobPointsResponse {
  /** FobPointArray */
  FobPointArray?: FobPointArray;
  /** ErrorMessage */
  ErrorMessage?: ErrorMessage;
}

/**
 * Location
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface Location {
  /** xsd:int */
  locationId?: string;
  /** xsd:string|minLength,maxLength */
  locationName?: string;
  /** DecorationArray */
  DecorationArray?: DecorationArray;
  /** xsd:int */
  decorationsIncluded?: string;
  /** xsd:boolean */
  defaultLocation?: string;
  /** xsd:int */
  maxDecoration?: string;
  /** xsd:int */
  minDecoration?: string;
  /** xsd:int */
  locationRank?: string;
}

/**
 * LocationArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface LocationArray {
  /** Location */
  Location?: Location;
}

/**
 * LocationId
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface LocationId {
  /** xsd:int */
  locationId?: string;
}

/** LocationIdArray */
export interface LocationIdArray {
  /** LocationId[] */
  LocationId?: Array<LocationId>;
}

/**
 * Part
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface Part {
  /** xsd:token|minLength,maxLength */
  partId?: string;
  /** xsd:token|minLength,maxLength */
  partDescription?: string;
  /** PartPriceArray */
  PartPriceArray?: PartPriceArray;
  /** xsd:int */
  partGroup?: string;
  /** xsd:int */
  nextPartGroup?: string;
  /** xsd:boolean */
  partGroupRequired?: string;
  /** xsd:token|minLength,maxLength */
  partGroupDescription?: string;
  /** xsd:decimal|fractionDigits */
  ratio?: string;
  /** xsd:boolean */
  defaultPart?: string;
  /** LocationIdArray */
  LocationIdArray?: LocationIdArray;
}

/**
 * PartArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface PartArray {
  /** Part */
  Part?: Part;
}

/** PartPrice */
export interface PartPrice {
  /** xsd:int */
  minQuantity?: string;
  /** xsd:decimal|fractionDigits */
  price?: string;
  /** xsd:string|minLength,maxLength */
  discountCode?: string;
  /** shared:QuantityUomType|minLength,maxLength */
  priceUom?: string;
  /** xsd:dateTime */
  priceEffectiveDate?: string;
  /** xsd:dateTime */
  priceExpiryDate?: string;
}

/**
 * PartPriceArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface PartPriceArray {
  /** PartPrice */
  PartPrice?: PartPrice;
}

/**
 * Product
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/SharedObjects/`
 */
export interface Product {
  /** xsd:token|minLength,maxLength */
  productId?: string;
}

/**
 * ProductArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/PricingAndConfiguration/1.0.0/`
 */
export interface ProductArray {
  /** Product */
  Product?: Product;
}

export type PPCRequest =
  | GetAvailableChargesRequest
  | GetAvailableLocationsRequest
  | GetConfigurationAndPricingRequest
  | GetDecorationColorsRequest
  | GetFobPointsRequest;

export type PPCResponse =
  | GetAvailableChargesResponse
  | GetAvailableLocationsResponse
  | GetConfigurationAndPricingResponse
  | GetDecorationColorsResponse
  | GetFobPointsResponse;

export interface PricingAndConfigurationServiceBinding {
  getAvailableLocations(
    getAvailableLocationsRequest: GetAvailableLocationsRequest,
    callback: (
      err: any,
      result: GetAvailableLocationsResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ) => void,
  ): void;
  getDecorationColors(
    getDecorationColorsRequest: GetDecorationColorsRequest,
    callback: (
      err: any,
      result: GetDecorationColorsResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ) => void,
  ): void;
  getFobPoints(
    getFobPointsRequest: GetFobPointsRequest,
    callback: (
      err: any,
      result: GetFobPointsResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ) => void,
  ): void;
  getAvailableCharges(
    getAvailableChargesRequest: GetAvailableChargesRequest,
    callback: (
      err: any,
      result: GetAvailableChargesResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ) => void,
  ): void;
  getConfigurationAndPricing(
    getConfigurationAndPricingRequest: GetConfigurationAndPricingRequest,
    callback: (
      err: any,
      result: GetConfigurationAndPricingResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ) => void,
  ): void;
}

export interface PricingAndConfigurationService {
  readonly PricingAndConfigurationServiceBinding:
    PricingAndConfigurationServiceBinding;
}

export interface PricingAndConfigurationClient extends SoapClient {
  PricingAndConfigurationService: PricingAndConfigurationService;
  getAvailableLocationsAsync(
    getAvailableLocationsRequest: GetAvailableLocationsRequest,
  ): Promise<
    [
      result: GetAvailableLocationsResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ]
  >;
  getDecorationColorsAsync(
    getDecorationColorsRequest: GetDecorationColorsRequest,
  ): Promise<
    [
      result: GetDecorationColorsResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ]
  >;
  getFobPointsAsync(
    getFobPointsRequest: GetFobPointsRequest,
  ): Promise<
    [
      result: GetFobPointsResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ]
  >;
  getAvailableChargesAsync(
    getAvailableChargesRequest: GetAvailableChargesRequest,
  ): Promise<
    [
      result: GetAvailableChargesResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ]
  >;
  getConfigurationAndPricingAsync(
    getConfigurationAndPricingRequest: GetConfigurationAndPricingRequest,
  ): Promise<
    [
      result: GetConfigurationAndPricingResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ]
  >;
}

/** Create PricingAndConfigurationClient */
export function createClientAsync(
  ...args: Parameters<typeof soapCreateClientAsync>
): Promise<PricingAndConfigurationClient> {
  return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
