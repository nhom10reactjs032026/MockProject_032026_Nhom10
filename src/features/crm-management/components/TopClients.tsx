import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, Scale, Building, ChevronRight } from "lucide-react";

const TOP_CLIENTS = [
  { name: "Bank of America", value: "$1.2M", icon: <Landmark size={18} /> },
  { name: "Law Firm XYZ", value: "$850K", icon: <Scale size={18} /> },
  { name: "Real Estate ABC", value: "$640k", icon: <Building size={18} /> },
];

export const TopClients = () => {
  return (
    <Card className="shadow-sm border-slate-200 h-full">
      <CardHeader className="flex flex-row justify-between items-center pb-6">
        <CardTitle className="text-base font-bold text-slate-900">
          Top Clients
        </CardTitle>
        <button className="text-sm font-bold text-[#c4a47c] hover:text-[#1a1a1a] transition-colors">
          View All
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {TOP_CLIENTS.map((client, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-10 h-10 bg-[#fbf9f6] text-[#1a1a1a] rounded-lg flex items-center justify-center transition-colors group-hover:bg-[#1a1a1a] group-hover:text-white">
                {client.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-slate-900 group-hover:text-[#c4a47c] transition-colors">
                  {client.name}
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {client.value} Contract Value
                </p>
              </div>
              <ChevronRight
                size={18}
                className="text-slate-300 group-hover:text-slate-600 transition-colors"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
