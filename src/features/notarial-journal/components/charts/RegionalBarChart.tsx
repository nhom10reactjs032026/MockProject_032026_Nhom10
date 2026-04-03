import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const barData = [
  { name: "TX", value: 100 },
  { name: "CA", value: 50 },
  { name: "FL", value: 70 },
  { name: "NY", value: 40 },
  { name: "IL", value: 60 },
  { name: "GA", value: 25 },
];

export const RegionalBarChart = () => {
  return (
    <div className="col-span-1 lg:col-span-2 bg-white border border-[#ebebeb] shadow-sm rounded-xl p-6 flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Entries by State
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            Distribution of notary acts across major states
          </p>
        </div>
        <button className="text-[10px] font-bold text-[#c4a484] uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
          View Details
        </button>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dx={-10}
            />
            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{ 
                borderRadius: "12px", 
                border: "none", 
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" 
              }}
            />
            <Bar
              dataKey="value"
              fill="#c4a484"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
