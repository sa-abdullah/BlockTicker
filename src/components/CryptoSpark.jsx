import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";


const CryptoSparkline = ({ prices }) => {
  if (!prices || prices.length === 0) return null;

  
  
  // Format data for recharts (convert timestamp to readable format)
  const data = prices.map(([timestamp, price]) => ({
    time: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long" }).format(new Date(timestamp)), // Format timestamp
    price,
  }));

  const isPriceUp = prices[prices.length - 1][1] > prices[0][1]; // Compare last and first price
  const lineColor = isPriceUp ? "#007bff" : "#ff0000"; // Blue for uptrend, Red for downtrend

  return (
    <ResponsiveContainer className="w-full h-[250px]">
      <LineChart data={data} >
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />

        <XAxis
          dataKey="time"
          tick={{ fontSize: 12, fill: "#666" }}
          tickLine={false}
          axisLine={true}
          angle={-30}
          dy={5}
        />

        <YAxis
          domain={["auto", "auto"]}
          tick={{ fontSize: 14, fill: "#666" }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          tickLine={false}
          axisLine={true}
        />

        <Tooltip
          contentStyle={{ backgroundColor: "#fff", borderRadius: "5px" }}
          formatter={(value) => `$${value.toFixed(2)}`}
        />

        <defs>
          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          fill="url(#priceGradient)"
          strokeWidth={2}
        />

        <Line
          type="monotone"
          dataKey="price"
          stroke={lineColor}
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CryptoSparkline;
