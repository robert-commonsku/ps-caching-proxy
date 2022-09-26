export default async function calculateStats() {
  /* IP based requests
   * - ip, lat, lng, count, country
   * - get all ips from logs
   * - get all data db.hset("ip-data", ip, JSON.stringify(ipdata));
   * - get list of ips to fetch
   * - fetch in groups of 100
   * - fill hash
   * - do counts by request, 
   * stats:ip-data:overall
   * stats:ip-data:getAvailableLocations, etc
   */

  /* Popular products
   * - priority list by total count
   * - productId, each method count, total count
   * stats:popular-products
   */

  /* Active users
   * - priority list by total count
   * - productId, each method count, total count
   * stats:active-users
   */

  /* Request duration
   * - list of { Proxy, Supplier } by duration 
   * stats:duration:<methodName>
   */

  /* Request Time
   * - list of { tod, dow, count }
   * - only requests to Proxy
   * stats:request-time:<method>
   */

  /* Badges
   * stats:proxy-requests:<method>
   * stats:backend-requests:<method>
   * stats:cache-hits:<method>
   * stats:cache-misses:<method>
   */
}
