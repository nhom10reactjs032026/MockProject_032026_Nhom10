import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

// Dữ liệu giả lập cho biểu đồ (Usage Trends)
const data = [
    { name: '1', seal: 8000, digitalCert: 7500 },
    { name: '2', seal: 7500, digitalCert: 7800 },
    { name: '3', seal: 8500, digitalCert: 8200 },
    { name: '4', seal: 4500, digitalCert: 4000 }, // Điểm rơi giống trong ảnh
    { name: '5', seal: 6000, digitalCert: 5800 },
    { name: '6', seal: 7000, digitalCert: 6500 },
    { name: '7', seal: 6500, digitalCert: 6200 },
    { name: '8', seal: 7200, digitalCert: 7000 },
    { name: '9', seal: 4000, digitalCert: 3800 },
    { name: '10', seal: 6000, digitalCert: 5500 },
    { name: '11', seal: 5000, digitalCert: 4800 },
    { name: '12', seal: 7500, digitalCert: 7200 },
];

export const UsageChart: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wide">
                Usage Trends
            </h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            {/* Tạo hiệu ứng dải màu (Gradient) cho Seal */}
                            <linearGradient id="colorSeal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                            {/* Tạo hiệu ứng dải màu cho Digital Cert */}
                            <linearGradient id="colorCert" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />

                        <Area
                            name="Seal"
                            type="monotone"
                            dataKey="seal"
                            stroke="#6366f1"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSeal)"
                        />
                        <Area
                            name="Digital Cert"
                            type="monotone"
                            dataKey="digitalCert"
                            stroke="#ec4899"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorCert)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UsageChart;