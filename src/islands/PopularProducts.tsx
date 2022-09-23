function ri(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SKU_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function makeDataItem() {
  return {
    productId: [...Array(ri(5, 10)).keys()].map(c => SKU_CHARS[ri(0, SKU_CHARS.length - 1)]).join(''),
    requests: [0, 1, 2, 3, 4, 5].map(r => ri(100, 1200))
  }
}
  
const data = [...Array(10).keys()].map(makeDataItem).sort((a, b) => a.requests.reduce((t, i) => t + i, 0) - b.requests.reduce((t, i) => t + i, 0));

const MIN_SIZE = 1;
const MAX_SIZE = 20;

const REQUEST_NAMES = [
  "getAvailableLocations",
  "getDecorationColors",
  "getFobPoints",
  "getAvailableCharges",
  "getConfigurationAndPricing (List, Net)",
  "getConfigurationAndPricing (Customer)"
];

const COLORS = [
  "rgba(102, 194, 165, 0.7)",
  "rgba(252, 141, 98, 0.7)",
  "rgba(141, 160, 203, 0.7)",
  "rgba(231, 138, 195, 0.7)",
  "rgba(166, 216, 84, 0.7)",
  "rgba(255, 217, 47, 0.7)"
];

export default function PopularProducts() {
  const minValue = Math.min.apply(null, data.reduce((o, d) => o.concat(d.requests), []));
  const maxValue = Math.max.apply(null, data.reduce((o, d) => o.concat(d.requests), []));
  const getSize = (value: number) => (value - minValue) / (maxValue - minValue) * MAX_SIZE / 2;
  return (
    <div class="flex-initial" style={{ border: "1px solid rgba(121, 125, 134, 0.3)", borderRadius: 3, boxShadow: "1px 1px 1px 0 rgba(121, 125, 134, 0.3)", padding: "5px", margin: "3px" }}>
      <h1>Popular Products</h1>
      <table style={{ fontSize: "0.8em" }}>
        <tbody>
          {data.map(d => (
            <tr key={d.productId}>
              <td>{d.productId}</td>
              {d.requests.map((r, i) => (
                <td key={i} title={`${r} ${REQUEST_NAMES[i]} requests`}>
                  <svg width={MAX_SIZE} height={MAX_SIZE} viewBox={`0 0 ${MAX_SIZE} ${MAX_SIZE}`} xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50%" cy="50%" r={getSize(r)} fill={COLORS[i]} />
                  </svg>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
