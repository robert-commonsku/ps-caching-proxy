import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

function ri(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ALPHABET = "ABCEDEFHIJKLMNOPQRSTUVWXYZ";
const SKU_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
function getProductId(min = 5, max = 10) {
  return [...Array(ri(5, 10)).keys()].map((c) =>
    SKU_CHARS[ri(0, SKU_CHARS.length - 1)]
  ).join("");
}
const USER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_abcdefghijklmnopqrstuvwxyz";
function getAccountId() {
  return [...Array(ri(5, 9)).keys()].map((c) =>
    USER_CHARS[ri(0, USER_CHARS.length - 1)]
  ).join("");
}
const WEIRD_CHARS = USER_CHARS + "!-$#%^&*()@ ";
function getWeirdName(min = 5, max = 20, set = WEIRD_CHARS) {
  return [...Array(ri(min, max)).keys()].map((c) =>
    set[ri(0, set.length - 1)]
  ).join("");
}

const NOW = Date.now();

interface DataItem {
  accountId: string;
  productId: string;
  date: Date;
  methodName: string;
  issue: string;
  status: "active" | "ignored" | "revalidating"
}
function makeDataItem() {
  const methodName: string = REQUEST_NAMES[ri(0, 5)];
  return {
    accountId: getAccountId(),
    productId: getProductId(),
    date: new Date(NOW - ri(1, 1440) * 60 * 1000),
    methodName,
    issue: PROBLEMS[methodName][ri(0, PROBLEMS[methodName].length - 1)],
    status: "active"
  };
}

const REQUEST_NAMES = [
  "getAvailableLocations",
  "getDecorationColors",
  "getFobPoints",
  "getAvailableCharges",
  "getConfigurationAndPricing (List, Net)",
  "getConfigurationAndPricing (Customer)",
];

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const PROBLEMS = {
  "getAvailableLocations": [
    "No locations found",
    `Ugly location name [${getWeirdName()}]`,
    `Duplicate Location id [${ri(1, 100)}]`
  ],
  "getDecorationColors": [
    "No colors found",
    `Ugly color name [${getWeirdName()}]`,
    `Ugly decoration name [${getWeirdName()}]`,
    `Duplicate color id [${ri(1, 100)}]`,
    `Duplicate decoration id [${ri(1, 100)}]`
  ],
  "getFobPoints": [
    "No fob points found",
    `Unrecogized state [${toTitleCase(getWeirdName(5, 10, ALPHABET))}]`,
    `Unrecogized country [${getWeirdName(2, 2, ALPHABET).toUpperCase()}]`,
    `Unrecogized currency [${getWeirdName(3, 3, ALPHABET).toUpperCase()}]`,
    `Duplicate fob id [${ri(1, 100)}]`
  ],
  "getAvailableCharges": [
    "No charges found",
    `Ugly charge name [${toTitleCase(getWeirdName(10, 20, USER_CHARS + " "))}]`,
    `Unrecognized charge type [${getWeirdName(3,6, ALPHABET).toUpperCase()}]`,
    `Duplicate charge id [${ri(1, 100)}]`
  ],
  "getConfigurationAndPricing (List, Net)": [
    "No part ids found",
    "Configuration inconsistent with List price type",
    "Configuration inconsistent with Net price type",
    "Decorations returned for Blank configuration type",
    `Price expiry date is in past on charge [${ri(1, 100)}]`,
    `Price expiry date is in past on part [${getProductId()}]`,
    `No current price effective dates on charge [${ri(1, 100)}]`,
    `No current price effective dates on part [${getProductId()}]`,
    `No prices on part [${getProductId()}]`,
    `No prices on charge [${ri(1, 100)}]`,
    `Location id not in getAvailableLocations [${ri(1, 100)}]`,
    `Charge id not in getAvailableCharges [${ri(1, 100)}]`
  ],
  "getConfigurationAndPricing (Customer)": [
    "No part ids found",
    "Configuration inconsistent with List price type",
    "Configuration inconsistent with Net price type",
    "Decorations returned for Blank configuration type",
    `Price expiry date is in past on charge [${ri(1, 100)}]`,
    `Price expiry date is in past on part [${getProductId()}]`,
    `No current price effective dates on charge [${ri(1, 100)}]`,
    `No current price effective dates on part [${getProductId()}]`,
    `No prices on part [${getProductId()}]`,
    `No prices on charge [${ri(1, 100)}]`,
    `Location id not in getAvailableLocations [${ri(1, 100)}]`,
    `Charge id not in getAvailableCharges [${ri(1, 100)}]`
  ]
};

const COLORS = [
  "rgba(102, 194, 165, 0.7)",
  "rgba(252, 141, 98, 0.7)",
  "rgba(141, 160, 203, 0.7)",
  "rgba(231, 138, 195, 0.7)",
  "rgba(166, 216, 84, 0.7)",
  "rgba(255, 217, 47, 0.7)",
];

const startData = [...Array(9).keys()].map(makeDataItem).sort((a, b) => a.date.getTime() - b.date.getTime());


export default function Issues() {
  const [data, setData] = useState<DataItem>(startData);
  const ignoreIssue = (i) => setData(
    data.slice(0, i).concat(
      { ...data[i], status: "ignored" }
    ).concat(
      data.slice(i + 1)
    )
  );
  const revalidateIssue = (i) => setData(
    data.slice(0, i).concat(
      { ...data[i], status: "revalidating" }
    ).concat(
      data.slice(i + 1)
    )
  );
  const hasIssues = data.filter(d => d.status !== "ignored").length > 0;
  return (
    <div
      class="flex-initial"
      style={{
        border: "1px solid rgba(121, 125, 134, 0.3)",
        borderRadius: 3,
        boxShadow: "1px 1px 1px 0 rgba(121, 125, 134, 0.3)",
        padding: "5px",
        margin: "3px",
      }}
    >
      <h2 style={{ fontSize: "0.9rem" }}>Issues</h2>
      {!hasIssues ?
      <div style={{ textAlign: "center" }}>
        <p>Woohoo! Amazing! No data issues!!!</p>
        <img style={{ margin: "0 auto", maxHeight: "225px" }} src="/party.svg" alt="Party Time!" />
      </div> :
      <table style={{ width: "100%", fontSize: "0.5em" }}>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Date</th>
            <th>Method</th>
            <th>Account</th>
            <th>Product</th>
            <th>Issue</th>
            <th colSpan={2}>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => ({ ...d, i})).filter(d => "ignored" !== d.status).map(d => (
            <tr key={d.productId}>
              <td>{d.date.toLocaleString()}</td>
              <td title={d.methodName}>
                <svg
                  width="100%"
                  height={10}
                  viewBox="0 0 10 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50%" cy="50%" r="5" fill={COLORS[REQUEST_NAMES.indexOf(d.methodName)]} />
                </svg>
              </td>
              <td>{d.accountId}</td>
              <td>{d.productId}</td>
              <td>{d.issue}</td>
              <td>
                {"active" === d.status && <Button onClick={() => ignoreIssue(d.i)}>
                  Ignore 
                </Button>}
              </td>
              <td>
                {"active" === d.status ? <Button onClick={() => revalidateIssue(d.i)}>
                  Revalidate 
                </Button> : ("revalidating" === d.status && <p style={{ margin: "6px" }}>
                  Revalidating...
                </p>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}
