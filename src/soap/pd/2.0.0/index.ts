import {
  type Client as SoapClient,
  createClientAsync as soapCreateClientAsync,
} from "npm:soap";

/**
 * ApparelSizeArray
 * @targetNSAlias `ns2`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ApparelSizeArray {
  /** ApparelSize */
  ApparelSize?: ApparelSize;
}

/** ApparelSize */
export interface ApparelSize {
  /** ns2:apparelStyleEnum|minLength,maxLength */
  apparelStyle?: string;
  /** ns2:labelSizeEnum|minLength,maxLength */
  labelSize?: string;
  /** xsd:token|minLength,maxLength */
  customSize?: string;
}

/**
 * ColorArray
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ColorArray {
  /** Color */
  Color?: Color;
}

/** Color */
export interface Color {
  /** xsd:token|minLength,maxLength */
  standardColorName?: string;
  /** xsd:token|minLength,maxLength */
  hex?: string;
  /** xsd:token|minLength,maxLength */
  approximatePms?: string;
  /** xsd:token|minLength,maxLength */
  colorName?: string;
}

/**
 * Dimension
 * @targetNSAlias `ns2`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface Dimension {
  /** ns2:dimensionUomEnum|maxLength,minLength */
  dimensionUom?: string;
  /** xsd:decimal */
  depth?: string;
  /** xsd:decimal */
  height?: string;
  /** xsd:decimal */
  width?: string;
  /** ns2:weightUomEnum|maxLength,minLength */
  weightUom?: string;
  /** xsd:decimal */
  weight?: string;
}

/**
 * FobPointArray
 * @targetNSAlias `ns2`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface FobPointArray {
  /** FobPoint */
  FobPoint?: FobPoint;
}

/**
 * FobPoint
 * @targetNSAlias `ns2`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
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
}

/**
 * GetProductCloseOutRequest
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface GetProductCloseOutRequest {
  /** xsd:token|minLength,maxLength */
  wsVersion?: string;
  /** xsd:token|minLength,maxLength */
  id?: string;
  /** xsd:token|minLength,maxLength */
  password?: string;
}

/**
 * GetProductCloseOutResponse
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface GetProductCloseOutResponse {
  /** ProductCloseOutArray */
  ProductCloseOutArray?: ProductCloseOutArray;
  /** ServiceMessageArray */
  ServiceMessageArray?: ServiceMessageArray;
}

/**
 * GetProductDateModifiedRequest
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface GetProductDateModifiedRequest {
  /** xsd:token|minLength,maxLength */
  wsVersion?: string;
  /** xsd:token|minLength,maxLength */
  id?: string;
  /** xsd:token|minLength,maxLength */
  password?: string;
  /** xsd:dateTime */
  changeTimeStamp?: string;
}

/**
 * GetProductDateModifiedResponse
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface GetProductDateModifiedResponse {
  /** ProductDateModifiedArray */
  ProductDateModifiedArray?: ProductDateModifiedArray;
  /** ServiceMessageArray */
  ServiceMessageArray?: ServiceMessageArray;
}

/**
 * GetProductRequest
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface GetProductRequest {
  /** xsd:token|minLength,maxLength */
  wsVersion?: string;
  /** xsd:token|minLength,maxLength */
  id?: string;
  /** xsd:token|minLength,maxLength */
  password?: string;
  /** xsd:token|maxLength,minLength */
  localizationCountry?: string;
  /** xsd:token|minLength,maxLength */
  localizationLanguage?: string;
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:token|minLength,maxLength */
  partId?: string;
  /** xsd:token|minLength,maxLength */
  colorName?: string;
  /** ApparelSizeArray */
  ApparelSizeArray?: ApparelSizeArray;
}

/**
 * GetProductResponse
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface GetProductResponse {
  /** Product */
  Product?: Product;
  /** ServiceMessageArray */
  ServiceMessageArray?: ServiceMessageArray;
}

/**
 * GetProductSellableRequest
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface GetProductSellableRequest {
  /** xsd:token|minLength,maxLength */
  wsVersion?: string;
  /** xsd:token|minLength,maxLength */
  id?: string;
  /** xsd:token|minLength,maxLength */
  password?: string;
  /** xsd:token|maxLength,minLength */
  localizationCountry?: string;
  /** xsd:token|minLength,maxLength */
  localizationLanguage?: string;
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:token|minLength,maxLength */
  partId?: string;
  /** xsd:token|maxLength,minLength */
  lineName?: string;
  /** xsd:boolean */
  isSellable?: boolean;
}

/**
 * GetProductSellableResponse
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface GetProductSellableResponse {
  /** ProductSellableArray */
  ProductSellableArray?: ProductSellableArray;
  /** ServiceMessageArray */
  ServiceMessageArray?: ServiceMessageArray;
}

/** LocationDecorationArray */
export interface LocationDecorationArray {
  /** LocationDecoration[] */
  LocationDecoration?: Array<LocationDecoration>;
}

/** LocationDecoration */
export interface LocationDecoration {
  /** xsd:token|minLength,maxLength */
  locationName?: string;
  /** xsd:int */
  maxImprintColors?: string;
  /** xsd:token|minLength,maxLength */
  decorationName?: string;
  /** xsd:boolean */
  locationDecorationComboDefault?: string;
  /** xsd:boolean */
  priceIncludes?: string;
}

/**
 * primaryColor
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface PrimaryColor {
  /** Color */
  Color?: Color;
}

/**
 * ProductCategoryArray
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ProductCategoryArray {
  /** ProductCategory */
  ProductCategory?: ProductCategory;
}

/** ProductCategory */
export interface ProductCategory {
  /** xsd:token|minLength,maxLength */
  category?: string;
  /** xsd:token|minLength,maxLength */
  subCategory?: string;
}

/**
 * ProductCloseOutArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/`
 */
export interface ProductCloseOutArray {
  /** ProductCloseOut */
  ProductCloseOut?: ProductCloseOut;
}

/**
 * ProductCloseOut
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ProductCloseOut {
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:token|minLength,maxLength */
  partId?: string;
}

/**
 * ProductDateModifiedArray
 * @targetNSAlias `tns`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/`
 */
export interface ProductDateModifiedArray {
  /** ProductDateModified */
  ProductDateModified?: ProductDateModified;
}

/**
 * ProductDateModified
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ProductDateModified {
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:token|minLength,maxLength */
  partId?: string;
}

/**
 * ProductKeywordArray
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ProductKeywordArray {
  /** ProductKeyword */
  ProductKeyword?: ProductKeyword;
}

/** ProductKeyword */
export interface ProductKeyword {
  /** xsd:token|minLength,maxLength */
  keyword?: string;
}

/**
 * ProductMarketingPointArray
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ProductMarketingPointArray {
  /** ProductMarketingPoint */
  ProductMarketingPoint?: ProductMarketingPoint;
}

/** ProductMarketingPoint */
export interface ProductMarketingPoint {
  /** xsd:token|minLength,maxLength */
  pointType?: string;
  /** xsd:token|minLength,maxLength */
  pointCopy?: string;
}

/**
 * ProductPackage
 * @targetNSAlias `ns2`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ProductPackage {
  /** xsd:boolean */
  default?: string;
  /** xsd:token|minLength,maxLength */
  packageType?: string;
  /** xsd:token|minLength,maxLength */
  description?: string;
  /** xsd:decimal */
  quantity?: string;
  /** ns2:dimensionUomEnum|maxLength,minLength */
  dimensionUom?: string;
  /** xsd:decimal */
  depth?: string;
  /** xsd:decimal */
  height?: string;
  /** xsd:decimal */
  width?: string;
  /** ns2:weightUomEnum|maxLength,minLength */
  weightUom?: string;
  /** xsd:decimal */
  weight?: string;
}

/**
 * ProductPackagingArray
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ProductPackagingArray {
  /** ProductPackage */
  ProductPackage?: ProductPackage;
}

/** ProductPartArray */
export interface ProductPartArray {
  /** ProductPart[] */
  ProductPart?: Array<ProductPart>;
}

/**
 * ProductPart
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ProductPart {
  /** xsd:token|minLength,maxLength */
  partId?: string;
  /** primaryColor */
  primaryColor?: PrimaryColor;
  /** xsd:token|minLength,maxLength */
  description?: string;
  /** ns3:ISO3166CountyCode|maxLength,minLength */
  countryOfOrigin?: string;
  /** ColorArray */
  ColorArray?: ColorArray;
  /** xsd:token|minLength,maxLength */
  primaryMaterial?: string;
  /** SpecificationArray */
  SpecificationArray?: SpecificationArray;
  /** xsd:token|minLength,maxLength */
  shape?: string;
  /** ApparelSize */
  ApparelSize?: ApparelSize;
  /** Dimension */
  Dimension?: Dimension;
  /** xsd:int */
  leadTime?: string;
  /** xsd:token|minLength,maxLength */
  unspsc?: string;
  /** xsd:token|minLength,maxLength */
  gtin?: string;
  /** xsd:boolean */
  isRushService?: string;
  /** ProductPackagingArray */
  ProductPackagingArray?: ProductPackagingArray;
  /** ShippingPackageArray */
  ShippingPackageArray?: ShippingPackageArray;
  /** xsd:dateTime */
  endDate?: string;
  /** xsd:dateTime */
  effectiveDate?: string;
  /** xsd:boolean */
  isCloseout?: string;
  /** xsd:boolean */
  isCaution?: string;
  /** xsd:token|maxLength,minLength */
  cautionComment?: string;
  /** xsd:decimal */
  nmfcCode?: string;
  /** xsd:token|minLength,maxLength */
  nmfcDescription?: string;
  /** xsd:token|minLength,maxLength */
  nmfcNumber?: string;
  /** xsd:boolean */
  isOnDemand?: string;
  /** xsd:boolean */
  isHazmat?: string;
}

/**
 * ProductPriceArray
 * @targetNSAlias `ns2`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ProductPriceArray {
  /** ProductPrice */
  ProductPrice?: ProductPrice;
}

/**
 * ProductPriceGroupArray
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ProductPriceGroupArray {
  /** ProductPriceGroup */
  ProductPriceGroup?: ProductPriceGroup;
}

/**
 * ProductPriceGroup
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ProductPriceGroup {
  /** ProductPriceArray */
  ProductPriceArray?: ProductPriceArray;
  /** xsd:token|minLength,maxLength */
  groupName?: string;
  /** CurrencyCodeType|xs:string|AFA,ALL,DZD,AON,ARS,AMD,AWG,AUD,ATS,AZM,BSD,BHD,BDT,BBD,BYR,BEF,BZD,BMD,BTN,BOB,BAM,BWP,BRL,BND,BGL,BIF,KHR,CAD,CVE,KYD,XOF,XAF,XPF,CLP,CNY,COP,KMF,CDF,CRC,HRK,CUP,CYP,CZK,DKK,DEM,DJF,DOP,NLG,XCD,ECS,EGP,SVC,ERN,EEK,ETB,EUR,FKP,FJD,FIM,FRF,GMD,GEL,GHC,GIP,GRD,GTQ,GYD,HTG,HNL,HKD,HUF,ISK,INR,IDR,IRR,IQD,IEP,ILS,ITL,JMD,JPY,JOD,KZT,KES,KWD,KGS,LAK,LVL,LBP,LSL,LRD,LYD,LTL,LUF,MOP,MKD,MGF,MWK,MYR,MVR,MTL,MRO,MUR,MXN,MDL,MNT,MAD,MZM,MMK,NAD,NPR,ANG,ZRN,NZD,NIC,NGN,KPW,NOK,PKR,PAB,PGK,PYG,PEN,PHP,PLN,PTE,QAR,OMR,ROL,RUR,RWF,STD,SAR,SCR,SLL,SGD,SKK,SIT,SBD,SOS,ZAR,KRW,ESP,LKR,SHP,GBP,SDP,SRG,SZL,SEK,CHF,SYP,TWD,TJR,TZS,THB,TPE,TOP,TTD,TND,TRL,TMM,AED,UGX,UAH,UYU,USD,UZS,VUV,VEB,VND,WST,YER,YUM,ZMK,ZWD */
  currency?: string;
  /** xsd:token|minLength,maxLength */
  description?: string;
}

/** ProductPrice */
export interface ProductPrice {
  /** xsd:int */
  quantityMin?: string;
  /** xsd:int */
  quantityMax?: string;
  /** xsd:decimal */
  price?: string;
  /** xsd:token|minLength,maxLength */
  discountCode?: string;
}

/** ProductSellableArray */
export interface ProductSellableArray {
  /** ProductSellable[] */
  ProductSellable?: Array<ProductSellable>;
}

/**
 * ProductSellable
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ProductSellable {
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:token|minLength,maxLength */
  partId?: string;
  /** xsd:token|minLength,maxLength */
  culturePoint?: string;
}

/**
 * Product
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface Product {
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:token|minLength,maxLength */
  productName?: string;
  /** xsd:token|minLength,maxLength */
  description?: string;
  /** xsd:dateTime */
  priceExpiresDate?: string;
  /** ProductMarketingPointArray */
  ProductMarketingPointArray?: ProductMarketingPointArray;
  /** ProductKeywordArray */
  ProductKeywordArray?: ProductKeywordArray;
  /** xsd:token|maxLength,minLength */
  productBrand?: string;
  /** xsd:boolean */
  export?: string;
  /** ProductCategoryArray */
  ProductCategoryArray?: ProductCategoryArray;
  /** RelatedProductArray */
  RelatedProductArray?: RelatedProductArray;
  /** xsd:token|minLength,maxLength */
  primaryImageUrl?: string;
  /** ProductPriceGroupArray */
  ProductPriceGroupArray?: ProductPriceGroupArray;
  /** xsd:boolean */
  complianceInfoAvailable?: string;
  /** xsd:int */
  unspscCommodityCode?: string;
  /** LocationDecorationArray */
  LocationDecorationArray?: LocationDecorationArray;
  /** ProductPartArray */
  ProductPartArray?: ProductPartArray;
  /** xsd:dateTime */
  lastChangeDate?: string;
  /** xsd:dateTime */
  creationDate?: string;
  /** xsd:dateTime */
  endDate?: string;
  /** xsd:dateTime */
  effectiveDate?: string;
  /** xsd:boolean */
  isCaution?: string;
  /** xsd:token|maxLength,minLength */
  cautionComment?: string;
  /** xsd:boolean */
  isCloseout?: string;
  /** xsd:token|maxLength,minLength */
  lineName?: string;
  /** xsd:token|minLength,maxLength */
  defaultSetupCharge?: string;
  /** xsd:token|minLength,maxLength */
  defaultRunCharge?: string;
  /** xsd:token|minLength,maxLength */
  imprintSize?: string;
  /** FobPointArray */
  FobPointArray?: FobPointArray;
}

/**
 * RelatedProductArray
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface RelatedProductArray {
  /** RelatedProduct */
  RelatedProduct?: RelatedProduct;
}

/**
 * RelatedProduct
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface RelatedProduct {
  /** ns2:relationTypeEnum|minLength,maxLength */
  relationType?: string;
  /** xsd:token|minLength,maxLength */
  productId?: string;
  /** xsd:token|minLength,maxLength */
  partId?: string;
}

/**
 * ServiceMessageArray
 * @targetNSAlias `ns2`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ServiceMessageArray {
  /** ServiceMessage */
  ServiceMessage?: ServiceMessage;
}

/** ServiceMessage */
export interface ServiceMessage {
  /** xsd:int */
  code?: string;
  /** xsd:token|maxLength,minLength */
  description?: string;
  /** ns2:SeverityType|maxLength,minLength */
  severity?: string;
}

/**
 * ShippingPackageArray
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ShippingPackageArray {
  /** ShippingPackage */
  ShippingPackage?: ShippingPackage;
}

/**
 * ShippingPackage
 * @targetNSAlias `ns2`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface ShippingPackage {
  /** xsd:token|minLength,maxLength */
  packageType?: string;
  /** xsd:token|minLength,maxLength */
  description?: string;
  /** xsd:decimal */
  quantity?: string;
  /** ns2:dimensionUomEnum|maxLength,minLength */
  dimensionUom?: string;
  /** xsd:decimal */
  depth?: string;
  /** xsd:decimal */
  height?: string;
  /** xsd:decimal */
  width?: string;
  /** ns2:weightUomEnum|maxLength,minLength */
  weightUom?: string;
  /** xsd:decimal */
  weight?: string;
}

/**
 * SpecificationArray
 * @targetNSAlias `shared`
 * @targetNamespace `http://www.promostandards.org/WSDL/ProductDataService/2.0.0/SharedObjects/`
 */
export interface SpecificationArray {
  /** Specification */
  Specification?: Specification;
}

/** Specification */
export interface Specification {
  /** ns2:specificationTypeEnum|minLength,maxLength */
  specificationType?: string;
  /** xsd:token|minLength,maxLength */
  SpecificationUom?: string;
  /** xsd:token|minLength,maxLength */
  measurementValue?: string;
}

export type PDRequest =
  | GetProductRequest
  | GetProductDateModifiedRequest
  | GetProductCloseOutRequest
  | GetProductSellableRequest;

export type PDResponse =
  | GetProductResponse
  | GetProductDateModifiedResponse
  | GetProductCloseOutResponse
  | GetProductSellableResponse;

export interface ProductDataServiceBinding {
  getProduct(
    getProductRequest: GetProductRequest,
    callback: (
      err: any,
      result: GetProductResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ) => void,
  ): void;
  getProductDateModified(
    getProductDateModifiedRequest: GetProductDateModifiedRequest,
    callback: (
      err: any,
      result: GetProductDateModifiedResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ) => void,
  ): void;
  getProductCloseOut(
    getProductCloseOutRequest: GetProductCloseOutRequest,
    callback: (
      err: any,
      result: GetProductCloseOutResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ) => void,
  ): void;
  getProductSellable(
    getProductSellableRequest: GetProductSellableRequest,
    callback: (
      err: any,
      result: GetProductSellableResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ) => void,
  ): void;
}

export interface ProductDataService {
  readonly ProductDataServiceBinding: ProductDataServiceBinding;
}

export interface ProductDataServiceClient extends SoapClient {
  ProductDataService: ProductDataService;
  getProductAsync(
    getProductRequest: GetProductRequest,
  ): Promise<
    [
      result: GetProductResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ]
  >;
  getProductDateModifiedAsync(
    getProductDateModifiedRequest: GetProductDateModifiedRequest,
  ): Promise<
    [
      result: GetProductDateModifiedResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ]
  >;
  getProductCloseOutAsync(
    getProductCloseOutRequest: GetProductCloseOutRequest,
  ): Promise<
    [
      result: GetProductCloseOutResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ]
  >;
  getProductSellableAsync(
    getProductSellableRequest: GetProductSellableRequest,
  ): Promise<
    [
      result: GetProductSellableResponse,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any,
    ]
  >;
}

/** Create ProductDataServiceClient */
export function createClientAsync(
  ...args: Parameters<typeof soapCreateClientAsync>
): Promise<ProductDataServiceClient> {
  return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
