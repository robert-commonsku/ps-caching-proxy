# PromoStandards PPC Caching Proxy

ps-caching-proxy is a maintenance-free supplier-hosted PromoStandards Product Pricing and Configuration (PPC) caching proxy.

## Goals

ps-caching-proxy should:
- return data to callers faster than the supplier's original endpoint
- require no maintenance from the supplier after it has been set up
- rate limit callers so as to be robust in the face of DDOS attacks
- provide feedback to the supplier about issues with their PPC data
- refresh its cached data periodically and when PPC price expiry dates and ProductData getProductDateModified() calls indicate it has expired
- allow the supplier to invalidate the cache at a granular level
- collect high-granularity statistics of proxy callers
- display calling statistics and actionable information on a dashboard
- provide a RESTful API to the PPC data


## Requirements

The supplier requires a PromoStandards PPC v1.0.0 endpoint as well as a ProductData endpoint (either v1.0.0 or v2.0.0)


## Technologies

- PromoStandards PPC v1.0.0, ProductData v1.0.0, and ProductData v2.0.0
- Docker
- Python
- FastAPI
- Redis
- React

