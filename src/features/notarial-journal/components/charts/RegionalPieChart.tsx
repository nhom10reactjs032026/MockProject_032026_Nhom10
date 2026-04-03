import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const pieData = [
  {
    id: "incomplete",
    label: "Incompleted",
    value: 100,
    percentage: 40,
    color: "#fdf2e3",
  },
  {
    id: "active",
    label: "Active",
    value: 80,
    percentage: 32,
    color: "#c4a484",
  },
  {
    id: "missing",
    label: "Missing",
    value: 70,
    percentage: 28,
    color: "#ebebeb",
  },
];

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black text-white px-4 py-3 rounded-lg shadow-2xl border border-[#ebebeb]/50">
        <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">
          {data.label}
        </div>
        <div className="text-lg font-black">{data.value} Entries</div>
      </div>
    );
  }
  return null;
};

export const RegionalPieChart = () => {
  return (
    <div className="col-span-1 bg-white border border-[#ebebeb] shadow-sm rounded-xl p-6 flex flex-col text-center">
      <div className="flex justify-between items-start text-left mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">Chart</h3>
          <p className="text-sm font-semibold text-foreground">Entries</p>
          <p className="text-xs text-muted-foreground mt-1">
            From 1-6 Dec,
            <br />
            2020
          </p>
        </div>
        <button className="px-3 py-1 text-[10px] font-bold text-[#c4a484] uppercase tracking-[0.2em] border border-[#ebebeb] rounded-md hover:bg-[#f8f8f8] transition-colors">
          View Report
        </button>
      </div>

      <div className="flex-1 min-h-[250px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 text-left">
        {pieData.map((seg) => (
          <div key={seg.id} className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: seg.color }}
              ></span>{" "}
              {seg.label}
            </div>
            <div className="text-xs font-black pl-3.5 text-foreground">
              {seg.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
