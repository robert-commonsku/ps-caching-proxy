# Architecture

## Components
- Web server with endpoints:
  - SOAP requests
    - POST /ppc/{version}
  - REST requests
    - GET /ppc/{version}/docs
    - GET /ppc/{version}/locations/{productId}
    - GET /ppc/{version}/decoration-colors/{productId}/{locationId}
    - GET /ppc/{version}/fob-points/{productId}
    - GET /ppc/{version}/charges/{productId}
    - GET /ppc/{version}/charges/{productId}
    - HTTP Basic Auth for id, password
    - query parameters for other fields
  - Dashboard (not fully formed yet)
    - GET /
      - Redirect to login if not logged in
- Redis instance:
  - To cache responses
  - Store User credentials
  - Store application settings
  - Use as queue
- Backend workers:
  - celery? rq?
  - supervisord to keep alive?
  - ProductSellable
  - Universal Requests
  - User-Specific Requests


## Statistics
- Usage
  - Who, when 
- Updates
- Recency of Data
- Geocode IP with heat map
- Error rates


## Assumptions

- All requests require a password
  - We reject any request without a password
- All methods on the service are available to all authenticated Users
  - We should probably verify this with some spot checks
- All Users receive the same configuration data when they supply the same inputs
  - We should probably verify this with some spot checks
- Suppliers are not very careful about price effective dates and price expiry dates
  - We should check frequently
- Product sellable does not vary by locale
  - We should probably verify this with some spot checks
- Pricing data does not vary by locale
  - We should probably verify this with some spot checks
- Pricing data for priceType Net or List does not vary per User
  - We should probably verify this with some spot checks
- Pricing data for priceType Customer does vary per User

 
## Settings

**HostName**
  - The domain where the Proxy is hosted
**Supplier PPC endpoint**
  - The URL for the Supplier PPC endpoint
**Supplier PPC version**
  - The version of PPC that the supplier PPC endpoint supports
**Supplier Product Data endpoint**
  - The URL for the Supplier Product Data endpoint
**Supplier Product Data version**
  - The version of Product Data that the supplier Product Data endpoint supports
**Locales**
  - A set of supported locales (i.e. localizationLanguage-localizationCountry pairs), e.g. en-US
**Default Locale**
  - A localizationLanguage-localizationCountry pair e.g. en-US.  It must exist in the Locales setting.
**Supplier Company Name**
  - The name of the Supplier
**Default TTL**
  - A hint for how frequently the cache should be updated

## Methods with Universal Responses

- getAvailableCharges
- getAvailableLocations
- getDecorationColors
- getFobPoints
- getConfigurationAndPricing with priceType of Net or List


## Cache Keys

**getAvailableCharges**
  - locale, productId
**getAvailableLocations**
  - locale, productId
**getDecorationColors**
  - locale, productId, locationId
**getFobPoints**
  - locale, productId
**getConfigurationAndPricing**
  - locale, productId, fobId, currency, priceType, configurationType
**PartPriceArray**
  - *Request cache key*, User id, partId,
**ChargePriceArray**
  - *Request cache key*, User id, chargeId


## Algorithms

### User Request

#### This is what happens when a User makes a SOAP PPC request to the Supplier
1.  User sends PPC request to Proxy endpoint.
2.  Proxy starts timing.
3.  Proxy validates request against PPC WSDL.
  - If invalid, Proxy sends SOAP Fault response the User, records timing and stats, and stops.
4.  Proxy validates request localization as described below.
5.  Proxy checks datastore to determine if credentials with `id` from request are stored.
  - If credentials are stored and valid, continue to step 6.
  - Else, Proxy forwards request to Supplier PPC service as described below
6.  Proxy looks up response in datastore as described below.
  - If response is not found, Proxy forwards request to Supplier PPC service as described below.
  - Else, Proxy returns response to User, records timing and stats, and stops.

#### This is what happens when a User makes a REST PPC request to the Supplier
1.  User sends PPC request to Proxy endpoint.
2.  Proxy starts timing.
3.  Proxy validates request against PPC OpenAPI schema.
  - If invalid, Proxy sends 400 Bad Request response the User, records timing and stats, and stops.
4.  Proxy validates request localization as described below.
5.  Proxy checks datastore to determine if credentials with `id` from Basic Auth are stored.
  - If credentials are stored and valid, continue to step 6.
  - Else, Proxy forwards request to Supplier PPC service as described below
6.  Proxy looks up response in datastore as described below.
  - If response is not found, Proxy forwards request to Supplier PPC service as described below.
  - Else, Proxy transforms response, returns response to User, records timing and stats, and stops.

#### This is the localization validation procedure
1.  If request localizationCountry and localizationLanguage are in Supplier locales, return request.
2.  Proxy records invalid localizationCountry and localizationLanguage in stats.
3.  Proxy adds localization warning to response transforms.
4.  Proxy updates localizationCountry and localizationLanguage fields in request to Default Locale setting and returns request.

#### This is the request forwarding procedure
1.  Proxy starts backend timing.
2.  Proxy sends request to Supplier PPC service.
  - If Supplier response indicates valid credentials
    1.  Proxy transforms and forwards Supplier response to User.
    2.  Proxy updates datastore with new credentials.
    3.  Proxy stores Supplier response in queue for datastore update.
    4.  Proxy records stats and timing, and stops.
  - Else, if response indicates invalid credentials
    1.  Proxy transforms and forwards Supplier response to User.
    2.  Proxy invalidates credentials in datastore.
    3.  Proxy records stats and timing, and stops.

#### This is the response lookup procedure
1.  Proxy calculates request cache key from method and request parameters.
2.  Proxy tries to retrieve the response from the datastore using the request cache key.
  - If response does not exist in the cache, Proxy returns nothing.
  - If the method has a Universal Response, Proxy refines the response based on optional request parameters, if required, and returns response.
3.  Proxy refines the response based on optional request parameters, if required.
4.  For each Part in the response,
  1.  Proxy calculates part pricing cache key based on User, partId and request cache key.
  2.  Proxy tries to retrieve the part pricing hash from the datastore using the part pricing cache key.
  3.  If the part pricing hash exists, Proxy looks up part pricing and inserts the part pricing in the response as the PartPriceArray on the Part
      - Else, the Proxy injects an empty PartPriceArray on the Part
5.  For each Charge in the response,
  1.  Proxy calculates charge pricing cache key based on User, chargeId and request cache key.
  2.  Proxy tries to retrieve the charge pricing hash from the datastore using the charge pricing cache key.
  3.  If the charge pricing hash exists, Proxy looks up charge pricing with hash in datastore and inserts the charge pricing in the response as the ChargePriceArray on the Charge.
      - Else, the Proxy injects an empty ChargePriceArray on the Charge.
6.  The Proxy returns the response.

### Worker

We may require an additional worker to "fan-out" requests using different request parameters.
We may want to schedule additional cache update workers based on TTL setting.
We may want to store metadata about cached data, like hashes, so we can calculate statistics on how often it changes.

### This is how the ProductSellable worker determine which products are sellable
This is scheduled to happen every day or so, probably based on a Supplier setting.

1.  If there are no credentials stored in the datastore, stop.
2.  Proxy gets credentials from datastore.
3.  Proxy starts timing.
3.  Proxy sends getProductSellable request to Supplier ProductData service using credentials.
  - If response indicates credentials are invalid, invalidate credentials and go to step 2 to try with new credentials.
4.  Proxy invalidates caches of unsellable products.
5.  Proxy queues Universal Response updates for newly sellable products for each locale.
6.  Proxy queues getPricingAndConfiguration Customer pricing updates updates for newly sellable products for each User.
6.  Proxy stores set of products sellable in datastore.

### This is how the Universal Response workers update the cache.
They pull from the work queue.

1.  If there are no credentials stored in the datastore, stop.
2.  Proxy gets credentials from datastore.
3.  Proxy starts timing.
4.  Proxy sends request to Supplier PPC service using credentials.
  - If response indicates credentials are invalid, invalidate credentials and go to step 2 to try with new credentials.
  - If response indicates other error, requeue to recheck later and stop.
5.  Proxy stops timing.
6.  Proxy calculates request cache key from method and request parameters.
7.  Proxy stores transformed response in datastore using cache key

### This is how the getPricingAndConfiguration Customer pricing workers update the cache.
They pull from the work queue.
2.  Proxy gets credentials from datastore.
3.  Proxy starts timing.
4.  Proxy sends request to Supplier PPC service using credentials.
  - If response indicates credentials are invalid, invalidate credentials, and stop.
  - If response indicates other error, requeue to recheck later and stop.
5.  Proxy stops timing.
6.  Proxy calculates request cache key from method, User and request parameters.
7.  For each Part,
  1.  Proxy normalizes PartPriceArray and determines its hash.
  2.  Proxy looks up hash in datastore.
    - If hash does not exist in datastore, Proxy stores PartPriceArray in datastore.
  3.  Proxy calculates part pricing cache key based on User, partId and request cache key.
  4.  Proxy stores hash in datastore with part pricing cache key as key
8.  For each Charge,
  1.  Proxy normalizes ChargePriceArray and determines its hash.
  2.  Proxy looks up hash in datastore.
    - If hash does not exist in datastore, Proxy stores ChargePriceArray in datastore.
  3.  Proxy calculates charge pricing cache key based on User, chargeId and request cache key.
  4.  Proxy stores hash in datastore with charge pricing cache key as key


## Glossary

**PPC**
  - The PromoStandards Product Configuration, Decoration, and Pricing service (currently at version 1.0.0)
**ProductData**
  - The PromoStandards Product Data service (currently at version 2.0.0)
**Supplier**
  - Agent who provides PromoStandards services
**User**
  - Agent who consumes PromoStandards services
**Proxy**
  - This project which provides a supplier hosted proxy for Supplier PPC
**endpoint**
  - The URL where a service is hosted, usually qualified by host and service.  e.g. Proxy PPC endpoint, Supplier ProductData endpoint
**Credentials**
  - The username and password sent in each User request to authorize the User.  They are provided in the `id` and `password` fields of each request, or as HTTP Basic Auth for REST requests
**Transform**
  - Changes the Proxy makes to Supplier responses
**Refine**
  - Changes the Proxy makes to Supplier response to filter out data that is not required because of request parameters
**Universal Response**
  - A response that does not depend on the User
**Response Template**
  - A template that can create a response by injecting values into slots
