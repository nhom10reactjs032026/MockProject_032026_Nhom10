import { RegionalBarChart } from "./charts/RegionalBarChart";
import { RegionalPieChart } from "./charts/RegionalPieChart";

export const RegionalChartSummary = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <RegionalBarChart />
      <RegionalPieChart />
    </div>
  );
};
