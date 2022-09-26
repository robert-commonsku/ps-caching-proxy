import { asset, Head } from "$fresh/runtime.ts";
import MapChart from "../islands/MapChart.tsx";
import RequestDurationChart from "../islands/RequestDurationChart.tsx";
import RequestTimeChart from "../islands/RequestTimeChart.tsx";
import Badge from "../islands/Badge.tsx";
import PopularProducts from "../islands/PopularProducts.tsx";
import ActiveUsers from "../islands/ActiveUsers.tsx";
import Issues from "../islands/Issues.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>PromoStandards Caching Proxy</title>
      </Head>
      <a
        href="https://github.com/robert-commonsku/ps-caching-proxy"
        class="m-2 text-gray-500 hover:text-gray-700 fixed bottom-0 right-0"
      >
        <span class="sr-only">GitHub</span>
        <svg class="h-8 w-8 inline float-right" fill="currentColor" viewBox="0 0 24 24"><path fillrule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" cliprule="evenodd"></path></svg>
      </a>

      <div class="p-4 mx-auto max-w-screen-lg">
        <h1><a href="https://promostandards.org"><img src={asset("/ps.png")} style={{ marginRight: "3px", verticalAlign: "middle", display: "inline", height: "1em" }} alt="PromoStandards Logo" /></a>PPC Caching Proxy Dashboard</h1>
        <div class="flex">
          <RequestDurationChart
            methodName="getAvailableLocations"
            proxyMean={200}
            proxyStdDev={30}
            numProxyRequests={523}
            supplierMean={540}
            supplierStdDev={53}
            numSupplierRequests={1000}
          />
          <RequestDurationChart
            methodName="getDecorationColors"
            proxyMean={300}
            proxyStdDev={40}
            numProxyRequests={600}
            supplierMean={330}
            supplierStdDev={22}
            numSupplierRequests={1000}
          />
          <RequestDurationChart
            methodName="getFobPoint"
            proxyMean={230}
            proxyStdDev={10}
            numProxyRequests={600}
            supplierMean={250}
            supplierStdDev={15}
            numSupplierRequests={1000}
          />
          <RequestDurationChart
            methodName="getAvailableCharges"
            proxyMean={280}
            proxyStdDev={18}
            numProxyRequests={600}
            supplierMean={333}
            supplierStdDev={22}
            numSupplierRequests={1000}
          />
          <RequestDurationChart
            methodName="getConfigurationAndPricing (List, Net)"
            proxyMean={240}
            proxyStdDev={30}
            numProxyRequests={600}
            supplierMean={920}
            supplierStdDev={55}
            numSupplierRequests={1000}
          />
          <RequestDurationChart
            methodName="getConfigurationAndPricing (Customer)"
            proxyMean={620}
            proxyStdDev={50}
            numProxyRequests={600}
            supplierMean={1530}
            supplierStdDev={80}
            numSupplierRequests={1000}
          />
        </div>
        <div class="flex justify-between">
          <Badge title="Proxy Requests" count={254} />
          <Badge title="Backend Requests" count={3434} />
          <Badge title="Proxy Requests" count={110} />
          <Badge title="Backend Requests" count={2324} />
          <Badge title="Proxy Requests" count={300} />
          <Badge title="Backend Requests" count={2732} />
          <Badge title="Proxy Requests" count={103} />
          <Badge title="Backend Requests" count={1808} />
          <Badge title="Proxy Requests" count={425} />
          <Badge title="Backend Requests" count={4266} />
          <Badge title="Proxy Requests" count={2044} />
          <Badge title="Backend Requests" count={23423} />
        </div>
        <div class="flex">
          <div class="flex flex-col">
            <MapChart />
            <ActiveUsers />
          </div>
          <div class="flex flex-col">
            <div class="flex">
              <RequestTimeChart />
              <PopularProducts />
            </div>
            <Issues />
          </div>
        </div>
      </div>
    </>
  );
}
