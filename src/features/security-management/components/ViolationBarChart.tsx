import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'FL', value: 55 }, { name: 'HI', value: 65 }, { name: 'CA', value: 75 },
    { name: 'TX', value: 105 }, { name: 'NY', value: 58 }, { name: 'Other', value: 78 },
];

export const ViolationBarChart = () => (
    <div className="bg-white p-6 rounded-[32px] shadow-sm h-full">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Seal Usage Violations By State</h3>
        <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Bar dataKey="value" fill="#f87171" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);