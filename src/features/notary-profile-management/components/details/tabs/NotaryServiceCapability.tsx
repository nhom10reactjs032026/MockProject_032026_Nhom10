import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit3, Calendar, X } from "lucide-react";

interface NotaryServiceCapabilityProps {
  notaryId: string;
}

export const NotaryServiceCapability = ({
  notaryId,
}: NotaryServiceCapabilityProps) => {
  // State giả lập cho Blackout dates
  const [blackoutDates, setBlackoutDates] = useState(["5/23/2026"]);

  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">
          Capabilities & Service Eligibility
        </h2>
        <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 h-10 px-6 rounded-xl font-bold transition-all shadow-lg shadow-blue-100">
          <Edit3 size={16} />
          Edit Section
        </Button>
      </div>

      {/* Service Capabilities Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800">
          Service Capabilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Mobile Notary */}
          <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
            <div className="space-y-1">
              <p className="font-bold text-slate-700">Mobile Notary</p>
              <p className="text-xs text-slate-400">
                Can accept on-site notarization jobs
              </p>
            </div>
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-blue-600"
            />
          </div>

          {/* Card 2: RON Certified */}
          <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
            <div className="space-y-1">
              <p className="font-bold text-slate-700">RON Certified</p>
              <p className="text-xs text-slate-400">
                Can accept remote online notarization
              </p>
            </div>
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-blue-600"
            />
          </div>

          {/* Card 3: Loan Signing */}
          <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
            <p className="font-bold text-slate-700">Loan Signing</p>
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-blue-600"
            />
          </div>

          {/* Card 4: Apostille support */}
          <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
            <p className="font-bold text-slate-700">Apostille support</p>
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Service Area & Travel Distance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label className="text-[15px] font-bold text-slate-700">
            Service Area
          </Label>
          <Input
            disabled
            value="San Diego County"
            className="h-12 bg-slate-50/50 border-none rounded-2xl text-slate-600 font-medium"
          />
        </div>
        <div className="space-y-3">
          <Label className="text-[15px] font-bold text-slate-700">
            Max Travel Distance
          </Label>
          <Input
            disabled
            value="50 miles"
            className="h-12 bg-slate-50/50 border-none rounded-2xl text-slate-600 font-medium"
          />
        </div>
      </div>

      {/* Languages Spoken */}
      <div className="space-y-3">
        <Label className="text-[15px] font-bold text-slate-700">
          Languages Spoken
        </Label>
        <div className="flex gap-3 p-2 bg-slate-50/50 rounded-2xl min-h-[50px] items-center">
          <Badge className="bg-blue-50 text-blue-500 hover:bg-blue-50 border-none px-6 py-1.5 rounded-full font-medium">
            English
          </Badge>
          <Badge className="bg-blue-50 text-blue-500 hover:bg-blue-50 border-none px-6 py-1.5 rounded-full font-medium">
            English
          </Badge>
          <Badge className="bg-blue-50 text-blue-500 hover:bg-blue-50 border-none px-6 py-1.5 rounded-full font-medium">
            English
          </Badge>
        </div>
      </div>

      {/* Availability Section */}
      <div className="space-y-6 pt-4">
        <h3 className="text-xl font-bold text-slate-800">Availability</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Working Hours */}
          <div className="space-y-4">
            <Label className="text-[15px] font-bold text-slate-700">
              Working Hours
            </Label>
            <div className="grid grid-cols-2 gap-y-4">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day} className="flex items-center gap-3">
                  <Checkbox
                    id={day}
                    defaultChecked={day !== "Saturday" && day !== "Sunday"}
                    className="w-5 h-5 rounded-md border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label
                    htmlFor={day}
                    className="text-sm font-medium text-slate-600 cursor-pointer"
                  >
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Blackout Dates */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <Label className="text-[15px] font-bold text-slate-700">
                Blackout dates
              </Label>
              <span className="text-slate-400">↑</span>
            </div>

            <div className="space-y-3">
              {blackoutDates.map((date, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-slate-100 pb-2"
                >
                  <span className="text-slate-600 font-medium">{date}</span>
                  <X
                    className="text-slate-300 cursor-pointer hover:text-rose-500 transition-colors"
                    size={18}
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <div className="relative flex-1">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <Input
                    placeholder="mm/dd/yyyy"
                    className="pl-10 h-11 rounded-xl border-slate-200"
                  />
                </div>
                <Button
                  variant="secondary"
                  className="bg-slate-100 text-slate-400 hover:bg-slate-200 h-11 px-6 rounded-xl font-bold"
                >
                  Add Date
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
