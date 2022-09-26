import { useEffect, useState } from "preact/hooks";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  Tooltip,
  XAxis,
  YAxis
} from "https://esm.sh/recharts?alias=react:preact/compat,react-dom:preact/compat";

function ri(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const USER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_abcdefghijklmnopqrstuvwxyz";
const REQUEST_NAMES = [
  "getAvailableLocations",
  "getDecorationColors",
  "getFobPoints",
  "getAvailableCharges",
  "getConfigurationAndPricing (List, Net)",
  "getConfigurationAndPricing (Customer)",
];

function makeDataItem() {
  const requests = REQUEST_NAMES.reduce(
    (o, r) => ({ ...o, [r]: ri(100, 1200) })
  );
  const total = Object.values(requests).reduce((t, r) => t + r, 0);
  return {
    accountId: [...Array(ri(5, 9)).keys()].map((c) =>
      USER_CHARS[ri(0, USER_CHARS.length - 1)]
    ).join(""),
    ...requests,
    total
  };
}

const data = [...Array(5).keys()].map(makeDataItem).sort((a, b) =>
  a.total - b.total
);

const COLORS = [
  "rgba(102, 194, 165, 0.7)",
  "rgba(252, 141, 98, 0.7)",
  "rgba(141, 160, 203, 0.7)",
  "rgba(231, 138, 195, 0.7)",
  "rgba(166, 216, 84, 0.7)",
  "rgba(255, 217, 47, 0.7)",
];

export default function ActiveUsers() {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const minValue = Math.min.apply(
    null,
    data.reduce((o, d) => o.concat(d.requests), []),
  );
  const maxValue = Math.max.apply(
    null,
    data.reduce((o, d) => o.concat(d.requests), []),
  );
  const getSize = (value: number) =>
    (value - minValue) / (maxValue - minValue) * MAX_SIZE / 2;
  return (
    <div
      class="flex-1"
      style={{
        fontSize: "6px",
        border: "1px solid rgba(121, 125, 134, 0.3)",
        borderRadius: 3,
        boxShadow: "1px 1px 1px 0 rgba(121, 125, 134, 0.3)",
        padding: "5px",
        margin: "3px",
      }}
    >
      <h2 style={{ fontSize: "0.9rem" }}>Active Users</h2>
      {isClient && (
        <ResponsiveContainer minWidth="300px" maxHeight="150px">
          <BarChart data={data} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <XAxis
              dataKey="accountId"
              tickSize={2}
              tickLine={{ strokeWidth: 0.5 }}
              axisLine={{ strokeWidth: 0.5 }}
              height={10}
             />
            <YAxis
              tickSize={2}
              tickLine={{ strokeWidth: 0.5 }}
              axisLine={{ strokeWidth: 0.5 }}
              width={20}
            />
            <Tooltip
              wrapperStyle={{ outline: "none", fontSize: "1em" }}
              itemStyle={{ padding: 0, margin: 0 }}
              contentStyle={{ borderRadius: "3px", padding: "3px" }}
            />
            <Legend iconSize="0.8em" wrapperStyle={{ fontSize: "0.8em" }} />
            {REQUEST_NAMES.map((rn, i) => (
              <Bar key={rn} dataKey={rn} fill={COLORS[i]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
