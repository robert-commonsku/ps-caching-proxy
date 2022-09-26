import { useEffect, useMemo, useState } from "preact/hooks";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "https://esm.sh/react-simple-maps?alias=react:preact/compat,react-dom:preact/compat";
import { scaleLinear } from "https://esm.sh/d3-scale?alias=react:preact/compat,react-dom:preact/compat";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const d = [
  {
    ip: "191.78.39.64",
    lat: 3.43722,
    lng: -76.5225,
    count: 5,
    country: "Colombia",
  },
  {
    ip: "65.161.123.106",
    lat: 41.8781,
    lng: -87.6298,
    count: 5,
    country: "United States",
  },
  { ip: "80.59.219.1", lat: 40.5932, lng: -3.4988, count: 5, country: "Spain" },
  {
    ip: "84.38.241.124",
    lat: 42.7036,
    lng: 23.3187,
    count: 1,
    country: "Bulgaria",
  },
  {
    ip: "80.186.202.211",
    lat: 60.1699,
    lng: 24.9384,
    count: 2,
    country: "Finland",
  },
  {
    ip: "90.105.109.52",
    lat: 47.2145,
    lng: -1.5512,
    count: 4,
    country: "France",
  },
  {
    ip: "206.199.183.173",
    lat: 28.7444,
    lng: -81.3599,
    count: 1,
    country: "United States",
  },
  {
    ip: "205.60.88.49",
    lat: 36.9151,
    lng: -76.1866,
    count: 4,
    country: "United States",
  },
  {
    ip: "197.39.156.247",
    lat: 27.1868,
    lng: 31.196,
    count: 1,
    country: "Egypt",
  },
  {
    ip: "27.230.82.192",
    lat: 1.35208,
    lng: 103.82,
    count: 1,
    country: "Singapore",
  },
  {
    ip: "19.54.178.148",
    lat: 42.3223,
    lng: -83.1763,
    count: 5,
    country: "United States",
  },
  {
    ip: "95.249.15.184",
    lat: 44.3471,
    lng: 9.2315,
    count: 5,
    country: "Italy",
  },
  {
    ip: "50.196.194.161",
    lat: 41.8528,
    lng: -87.6232,
    count: 3,
    country: "United States",
  },
  {
    ip: "90.158.124.158",
    lat: 41.0247,
    lng: 28.9252,
    count: 2,
    country: "Turkey",
  },
  {
    ip: "9.245.242.211",
    lat: 41.8781,
    lng: -87.6298,
    count: 4,
    country: "United States",
  },
  {
    ip: "145.84.93.152",
    lat: 52.0659,
    lng: 4.4004,
    count: 4,
    country: "Netherlands",
  },
  {
    ip: "83.234.185.65",
    lat: 47.2361,
    lng: 39.7189,
    count: 4,
    country: "Russia",
  },
  {
    ip: "101.78.34.88",
    lat: 39.9042,
    lng: 116.407,
    count: 4,
    country: "China",
  },
  {
    ip: "189.3.133.225",
    lat: -22.9068,
    lng: -43.1729,
    count: 4,
    country: "Brazil",
  },
  {
    ip: "160.212.218.234",
    lat: 41.377,
    lng: -79.8202,
    count: 5,
    country: "United States",
  },
  {
    ip: "104.228.24.215",
    lat: 42.5376,
    lng: -73.7071,
    count: 2,
    country: "United States",
  },
  {
    ip: "107.38.103.134",
    lat: 41.8781,
    lng: -87.6298,
    count: 1,
    country: "United States",
  },
  {
    ip: "151.113.207.165",
    lat: 43.6146,
    lng: -116.248,
    count: 5,
    country: "United States",
  },
  {
    ip: "74.175.29.162",
    lat: 30.7144,
    lng: -85.5492,
    count: 3,
    country: "United States",
  },
  {
    ip: "212.203.178.115",
    lat: 52.1814,
    lng: 20.9927,
    count: 2,
    country: "Poland",
  },
  {
    ip: "114.21.13.118",
    lat: 34.6937,
    lng: 135.502,
    count: 3,
    country: "Japan",
  },
  {
    ip: "139.145.255.204",
    lat: 58.97,
    lng: 5.73311,
    count: 2,
    country: "Norway",
  },
  {
    ip: "142.23.178.141",
    lat: 48.4527,
    lng: -123.37,
    count: 5,
    country: "Canada",
  },
  { ip: "27.5.34.36", lat: 28.6542, lng: 77.2373, count: 3, country: "India" },
  {
    ip: "80.72.207.20",
    lat: 53.4333,
    lng: 14.5612,
    count: 3,
    country: "Poland",
  },
  {
    ip: "52.193.113.201",
    lat: 35.6895,
    lng: 139.692,
    count: 5,
    country: "Japan",
  },
  {
    ip: "18.56.134.148",
    lat: 41.8781,
    lng: -87.6298,
    count: 5,
    country: "United States",
  },
  {
    ip: "50.205.65.246",
    lat: 42.461,
    lng: -70.9475,
    count: 1,
    country: "United States",
  },
  {
    ip: "178.87.194.54",
    lat: 24.4662,
    lng: 39.6168,
    count: 3,
    country: "Saudi Arabia",
  },
  {
    ip: "94.170.92.242",
    lat: 52.3676,
    lng: 4.90414,
    count: 3,
    country: "Netherlands",
  },
  {
    ip: "44.186.195.84",
    lat: 32.819,
    lng: -117.179,
    count: 1,
    country: "United States",
  },
  {
    ip: "24.199.64.50",
    lat: 40.793,
    lng: -74.0247,
    count: 2,
    country: "United States",
  },
  {
    ip: "88.71.226.158",
    lat: 52.2562,
    lng: 10.0586,
    count: 5,
    country: "Germany",
  },
  {
    ip: "49.36.132.170",
    lat: 28.6328,
    lng: 77.2204,
    count: 4,
    country: "India",
  },
  {
    ip: "32.16.118.46",
    lat: 39.9526,
    lng: -75.1652,
    count: 1,
    country: "United States",
  },
  {
    ip: "8.213.121.111",
    lat: 24.6869,
    lng: 46.7224,
    count: 5,
    country: "Saudi Arabia",
  },
  {
    ip: "94.108.30.125",
    lat: 50.8534,
    lng: 4.347,
    count: 1,
    country: "Belgium",
  },
  {
    ip: "146.216.61.110",
    lat: 47.5535,
    lng: 7.59804,
    count: 5,
    country: "Switzerland",
  },
  {
    ip: "65.14.64.48",
    lat: 25.5333,
    lng: -80.3973,
    count: 5,
    country: "United States",
  },
  {
    ip: "191.128.125.100",
    lat: -15.7792,
    lng: -47.9341,
    count: 2,
    country: "Brazil",
  },
  {
    ip: "32.235.223.151",
    lat: 40.7128,
    lng: -74.006,
    count: 1,
    country: "United States",
  },
  {
    ip: "208.0.201.162",
    lat: 41.457,
    lng: -72.8231,
    count: 2,
    country: "United States",
  },
  {
    ip: "50.152.244.146",
    lat: 41.8781,
    lng: -87.6298,
    count: 5,
    country: "United States",
  },
  {
    ip: "137.39.116.147",
    lat: 40.7128,
    lng: -74.006,
    count: 1,
    country: "United States",
  },
  {
    ip: "140.162.108.115",
    lat: 38.959,
    lng: -77.3557,
    count: 4,
    country: "United States",
  },
  {
    ip: "150.180.131.165",
    lat: 33.4484,
    lng: -112.074,
    count: 3,
    country: "United States",
  },
  {
    ip: "149.75.116.194",
    lat: 42.3736,
    lng: -71.1097,
    count: 2,
    country: "United States",
  },
  {
    ip: "82.143.178.25",
    lat: 51.1067,
    lng: 16.9653,
    count: 1,
    country: "Poland",
  },
  {
    ip: "26.175.38.111",
    lat: 39.9747,
    lng: -82.8947,
    count: 1,
    country: "United States",
  },
  {
    ip: "177.16.27.145",
    lat: -12.9901,
    lng: -38.4889,
    count: 3,
    country: "Brazil",
  },
  {
    ip: "40.114.137.0",
    lat: 52.3667,
    lng: 4.9,
    count: 1,
    country: "Netherlands",
  },
  {
    ip: "188.68.160.77",
    lat: 57.6261,
    lng: 39.8845,
    count: 1,
    country: "Russia",
  },
  {
    ip: "69.29.235.124",
    lat: 43.8138,
    lng: -91.2519,
    count: 2,
    country: "United States",
  },
  {
    ip: "17.248.204.171",
    lat: 37.3219,
    lng: -122.03,
    count: 5,
    country: "United States",
  },
  {
    ip: "113.17.52.154",
    lat: 23.2206,
    lng: 108.8046,
    count: 4,
    country: "China",
  },
  {
    ip: "173.73.114.79",
    lat: 39.0503,
    lng: -77.3909,
    count: 5,
    country: "United States",
  },
  {
    ip: "18.199.170.91",
    lat: 50.1109,
    lng: 8.68213,
    count: 3,
    country: "Germany",
  },
  {
    ip: "25.26.16.214",
    lat: 51.5074,
    lng: -0.127758,
    count: 1,
    country: "United Kingdom",
  },
  {
    ip: "219.99.125.177",
    lat: 43.0763,
    lng: 141.3654,
    count: 2,
    country: "Japan",
  },
  {
    ip: "107.66.26.161",
    lat: 40.7128,
    lng: -74.006,
    count: 2,
    country: "United States",
  },
  {
    ip: "132.165.67.159",
    lat: 48.7018,
    lng: 2.13408,
    count: 2,
    country: "France",
  },
  {
    ip: "84.25.38.44",
    lat: 52.041,
    lng: 4.4014,
    count: 2,
    country: "Netherlands",
  },
  {
    ip: "38.175.70.223",
    lat: 40.7128,
    lng: -74.006,
    count: 2,
    country: "United States",
  },
  {
    ip: "7.135.184.177",
    lat: 39.9747,
    lng: -82.8947,
    count: 3,
    country: "United States",
  },
  {
    ip: "183.80.255.38",
    lat: 21.0278,
    lng: 105.834,
    count: 2,
    country: "Vietnam",
  },
  {
    ip: "152.178.115.241",
    lat: 40.7128,
    lng: -74.006,
    count: 4,
    country: "United States",
  },
  {
    ip: "150.120.124.81",
    lat: 38.6278,
    lng: -90.2031,
    count: 4,
    country: "United States",
  },
  {
    ip: "203.194.189.227",
    lat: 22.2661,
    lng: 114.247,
    count: 5,
    country: "Hong Kong",
  },
  {
    ip: "202.25.30.218",
    lat: 35.6906,
    lng: 139.77,
    count: 2,
    country: "Japan",
  },
  {
    ip: "20.167.96.46",
    lat: -33.86,
    lng: 151.2094,
    count: 1,
    country: "Australia",
  },
  {
    ip: "17.92.49.200",
    lat: 37.3219,
    lng: -122.03,
    count: 5,
    country: "United States",
  },
  {
    ip: "11.213.35.62",
    lat: 39.9747,
    lng: -82.8947,
    count: 1,
    country: "United States",
  },
  {
    ip: "104.201.179.164",
    lat: 39.9531,
    lng: -75.5987,
    count: 3,
    country: "United States",
  },
  {
    ip: "58.17.242.126",
    lat: 29.4316,
    lng: 106.912,
    count: 4,
    country: "China",
  },
  {
    ip: "193.181.230.57",
    lat: 59.3293,
    lng: 18.0686,
    count: 1,
    country: "Sweden",
  },
  {
    ip: "152.81.187.244",
    lat: 48.837,
    lng: 2.10312,
    count: 5,
    country: "France",
  },
  {
    ip: "178.84.5.126",
    lat: 52.6318,
    lng: 4.7409,
    count: 4,
    country: "Netherlands",
  },
  {
    ip: "49.174.207.68",
    lat: 37.5179,
    lng: 126.8682,
    count: 4,
    country: "South Korea",
  },
  {
    ip: "98.29.38.62",
    lat: 39.5627,
    lng: -84.2224,
    count: 3,
    country: "United States",
  },
  {
    ip: "139.254.218.57",
    lat: 39.9747,
    lng: -82.8947,
    count: 3,
    country: "United States",
  },
  {
    ip: "41.172.243.174",
    lat: -33.9249,
    lng: 18.4241,
    count: 4,
    country: "South Africa",
  },
  {
    ip: "183.98.65.113",
    lat: 37.5794,
    lng: 126.9754,
    count: 2,
    country: "South Korea",
  },
];

export default function MapChart() {
  const [data, setData] = useState([]);
  const [maxValue, setMaxValue] = useState<number>(0);

  useEffect(() => {
    setMaxValue(5);
    setData(d);
  }, []);

  const reqScale = useMemo(
    () => scaleLinear().domain([0, maxValue]).range([0, 12]),
    [maxValue],
  );

  return (
    <div
      style={{
        border: "1px solid rgba(121, 125, 134, 0.3)",
        borderRadius: 3,
        boxShadow: "1px 1px 1px 0 rgba(121, 125, 134, 0.3)",
        padding: "5px",
        margin: "3px",
      }}
    >
      <h2 style={{ fontSize: "0.9rem" }}>Request Origins</h2>
      <ComposableMap projectionConfig={{ rotate: [-10, 0, 0] }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#DDD" />
            ))}
        </Geographies>
        {data.map(({ ip, lng, lat, count, country }) => (
          <Marker key={ip} coordinates={[lng, lat]}>
            <circle fill="#F53" stroke="#FFF" r={reqScale(count)}>
              <title>{ip} ({country}): {count} requests</title>
            </circle>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
