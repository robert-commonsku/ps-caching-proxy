import { useEffect, useState } from "preact/hooks";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "https://esm.sh/recharts?alias=react:preact/compat,react-dom:preact/compat";

function gaussian(mean, stdev) {
  var y2;
  var use_last = false;
  return function() {
    var y1;
    if (use_last) {
      y1 = y2;
      use_last = false;
    } else {
      var x1, x2, w;
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);
      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      y1 = x1 * w;
      y2 = x2 * w;
      use_last = true;
    }

    var retval = mean + stdev * y1;
    if (retval > 0)
      return retval;
    return -retval;
  }
}

interface RequestDurationChartProps {
  methodName: string;
  proxyMean: number;
  proxyStdDev: number;
  numProxyRequests: number;
  supplierMean: number;
  supplierStdDev: number;
  numSupplierRequests: number;
}

interface Data {
  duration: number;
  Proxy: number;
  Supplier: number;
}

export default function RequestDurationChart({
  methodName,
  proxyMean,
  proxyStdDev,
  numProxyRequests,
  supplierMean,
  supplierStdDev,
  numSupplierRequests
}: RequestDurationChartProps) {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [data, setData] = useState<Data[]>([] as Data[]);
  const [minValue, setMinValue] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [maxValue, setMaxValue] = useState<number>(0);
  useEffect(() => {
    const maxRequests = Math.max(numProxyRequests, numSupplierRequests);
    const divisor = maxRequests / 100;
    let data = {};
    let minValue = Number.MAX_SAFE_INTEGER;
    let maxValue = -1;
    const proxy = gaussian(proxyMean, proxyStdDev);
    const supplier = gaussian(supplierMean, supplierStdDev);
    for (let i = 0; i < numProxyRequests; ++i) {
      let p = Math.floor(proxy() / divisor);
      if (p < minValue) { minValue = p; }
      if (p > maxValue) { maxValue = p; }
      if (!data[p]) {
        data[p] = {
          duration: Math.floor(p * divisor),
          Proxy: 0,
          Supplier: 0
        }
      }
      data[p].Proxy++;
    
      let s = Math.floor(supplier() / divisor);
      if (s < minValue) { minValue = s; }
      if (s > maxValue) { maxValue = s; }
      if (!data[s]) {
        data[s] = {
          duration: Math.floor(s * divisor),
          Proxy: 0,
          Supplier: 0
        }
      }
      data[s].Supplier++;
    }
    setData(Object.values(data).map(d => ({
      duration: d.duration,
      Proxy: d.Proxy / numProxyRequests * 100,
      Supplier: d.Supplier / numSupplierRequests * 100,
    })));
    setMinValue(minValue);
    setMaxValue(maxValue);
  }, [proxyMean, proxyStdDev, numProxyRequests, supplierMean, supplierStdDev, numSupplierRequests]);

  if (data.length === 0) {
    return (<div></div>);
  };
  return (
    <div class="flex-1" style={{ height: "80px", fontSize: "6px", border: "1px solid rgba(121, 125, 134, 0.3)", borderRadius: 3, boxShadow: "1px 1px 1px 0 rgba(121, 125, 134, 0.3)", padding: "5px", margin: "3px" }}>
      <h5 style={{ fontSize: "1em", margin: 0, padding: 0, textAlign: "center" }}>{methodName}</h5>
      {isClient && <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="duration" type="number" domain={[minValue, maxValue]} interval="preserveStartEnd" tick={{ fontSize: "0.5em" }} unit="ms" height={15} tickSize={2} tickLine={{ strokeWidth: 0.5 }} axisLine={{ strokeWidth: 0.5 }} />
          <Tooltip wrapperStyle={{ outline: "none", fontSize: "1em" }} itemStyle={{ padding: 0, margin: 0 }} labelFormatter={(x) => `${x}ms`} formatter={(value, name, props) => value.toFixed(2) + '%'} contentStyle={{ borderRadius: "3px", padding: "3px" }} />
          <Legend verticalAlign="top" iconSize="0.6em" wrapperStyle={{ fontSize: "0.6em" }} />
          <Area type="monotone" dataKey="Proxy" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="Supplier" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </ResponsiveContainer>}
    </div>
  );
};

