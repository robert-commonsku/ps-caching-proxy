import { useEffect, useState } from "preact/hooks";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "https://esm.sh/recharts?alias=react:preact/compat,react-dom:preact/compat";

function ri(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getRandomValue() {
  return { tod: ri(0, 95), dow: ri(0, 6), count: ri(1, 5) };
}

const gAL = [...Array(15).keys()].map(getRandomValue).sort((a, b) =>
  a.dow - b.dow
);
const gDC = [...Array(13).keys()].map(getRandomValue).sort((a, b) =>
  a.dow - b.dow
);
const gFP = [...Array(9).keys()].map(getRandomValue).sort((a, b) =>
  a.dow - b.dow
);
const gAC = [...Array(10).keys()].map(getRandomValue).sort((a, b) =>
  a.dow - b.dow
);
const gCPLN = [...Array(32).keys()].map(getRandomValue).sort((a, b) =>
  a.dow - b.dow
);
const gCPC = [...Array(55).keys()].map(getRandomValue).sort((a, b) =>
  a.dow - b.dow
);

function pad(n) {
  return n < 10 ? "0" + n : n;
}

function formatToD(tod) {
  return pad(Math.floor(tod / 4)) + ":" + pad((tod % 4) * 15);
}

function formatDoW(dow) {
  return DAYS_OF_WEEK[dow];
}

function formatTooltip(value, name, props) {
  if ("Time of Day" === name) {
    return formatToD(value);
  } else if ("Day of Week" === name) {
    return formatDoW(value);
  }
  return value;
}

export default function RequestTimeChart() {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
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
      <h2 style={{ fontSize: "0.9rem" }}>Request Times</h2>
      {isClient && (
        <ResponsiveContainer minWidth="300px" maxHeight="200px">
          <ScatterChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <XAxis
              name="Day of Week"
              type="number"
              dataKey="dow"
              range={[0, 5]}
              domain={[-0.5, 6.5]}
              ticks={[0, 1, 2, 3, 4, 5, 6]}
              tickSize={2}
              height={10}
              tickLine={{ strokeWidth: 0.5 }}
              axisLine={{ strokeWidth: 0.5 }}
              tickFormatter={formatDoW}
            />
            <YAxis
              name="Time of Day"
              type="number"
              dataKey="tod"
              range={[0, 95]}
              domain={[0, 96]}
              ticks={[0, 12, 24, 36, 48, 60, 72, 84, 96]}
              tickSize={2}
              width={20}
              tickLine={{ strokeWidth: 0.5 }}
              axisLine={{ strokeWidth: 0.5 }}
              tickFormatter={formatToD}
            />
            <ZAxis
              name="# Requests"
              scale="linear"
              dataKey="count"
              range={[10, 100]}
            />
            <Legend iconSize="0.8em" wrapperStyle={{ fontSize: "0.8em" }} />
            <Tooltip
              wrapperStyle={{ outline: "none", fontSize: "1em" }}
              itemStyle={{ padding: 0, margin: 0 }}
              contentStyle={{ borderRadius: "3px", padding: "3px" }}
              formatter={formatTooltip}
            />
            <Scatter
              name="getAvailableLocations"
              data={gAL}
              fill="rgba(102, 194, 165, 0.7)"
            />
            <Scatter
              name="getDecorationColors"
              data={gDC}
              fill="rgba(252, 141, 98, 0.7)"
            />
            <Scatter
              name="getFobPoints"
              data={gFP}
              fill="rgba(141, 160, 203, 0.7)"
            />
            <Scatter
              name="getAvailableCharges"
              data={gAC}
              fill="rgba(231, 138, 195, 0.7)"
            />
            <Scatter
              name="getConfigurationAndPricing (List, Net)"
              data={gCPLN}
              fill="rgba(166, 216, 84, 0.7)"
            />
            <Scatter
              name="getConfigurationAndPricing (Customer)"
              data={gCPC}
              fill="rgba(255, 217, 47, 0.7)"
            />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
