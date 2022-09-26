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
      <div class="p-4 mx-auto max-w-screen-lg">
        <h1><img src={asset("/ps.png")} style={{ marginRight: "3px", verticalAlign: "middle", display: "inline", height: "1em" }} alt="PromoStandards Logo" />PPC Caching Proxy Dashboard</h1>
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
