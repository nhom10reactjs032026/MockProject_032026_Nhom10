import { SealStatCard } from '../components/SealStatCard';
import { ViolationBarChart } from '../components/ViolationBarChart';
import { DistributionDonutChart } from '../components/DistributionDonutChart';
import { UsageChart } from '../components/UsageChart';

export default function SealDashboardPage() {
    return (
        <div className="p-8 bg-[#f8fbff] min-h-screen">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-extrabold text-slate-800">Dashboard</h1>
                </div>

                <div className="flex flex-wrap gap-3">
                    {['All States', 'All Notaries', 'All Seals Type'].map(filter => (
                        <select key={filter} className="bg-[#eef2ff] text-blue-600 font-bold border-none rounded-lg px-4 py-2 text-sm outline-none">
                            <option>{filter}</option>
                        </select>
                    ))}
                </div>
            </div>

            {/* Row 1: 4 Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <SealStatCard title="Total Seals" count={56439} color="text-slate-800" />
                <SealStatCard title="Total digital certificates" count={1000} color="text-blue-700" />
                <SealStatCard title="Expiring soon" count={56439} color="text-yellow-500" borderColor="border-yellow-200" />
                <SealStatCard title="Revoked / suspended" count={56439} color="text-red-500" borderColor="border-red-200" />
            </div>

            {/* Row 2: Bar Chart & Donut Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <ViolationBarChart />
                </div>
                <div className="lg:col-span-1">
                    <DistributionDonutChart />
                </div>
            </div>

            {/* Row 3: Full Width Trends Chart */}
            <div className="w-full">
                <UsageChart />
            </div>
        </div>
    );
}