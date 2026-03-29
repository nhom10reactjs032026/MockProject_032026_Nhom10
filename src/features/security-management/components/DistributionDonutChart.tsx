// src/features/security-management/components/DistributionDonutChart.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
    { name: 'Other', value: 40, color: '#93e2fb' },
    { name: 'HI', value: 10, color: '#fde68a' },
    { name: 'CA', value: 25, color: '#a7f3d0' },
    { name: 'TX', value: 15, color: '#fbcfe8' },
    { name: 'NY', value: 10, color: '#818cf8' },
];

export const DistributionDonutChart = () => (
    <div className="bg-white p-6 rounded-[32px] shadow-sm h-full">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Expired Digital Certificates Distribution By State</h3>
        <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
);