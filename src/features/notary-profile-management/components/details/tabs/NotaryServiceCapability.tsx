import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit3, Calendar, X, PlusCircle } from "lucide-react";

interface NotaryServiceCapabilityProps {
  notaryId: string;
}

/**
 * Component to manage Notary capabilities, service areas, and blackout dates.
 * Validates date formats and handles dynamic addition/removal of dates.
 */
export const NotaryServiceCapability = ({
  notaryId,
}: NotaryServiceCapabilityProps) => {
  // --- State for Blackout Dates ---
  const [blackoutDates, setBlackoutDates] = useState<string[]>(["05/23/2026"]);
  const [dateInput, setDateInput] = useState("");

  // Function to add a new blackout date with basic validation
  const handleAddDate = () => {
    // Regex for mm/dd/yyyy
    const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

    if (dateInput && datePattern.test(dateInput)) {
      if (!blackoutDates.includes(dateInput)) {
        setBlackoutDates([...blackoutDates, dateInput]);
        setDateInput(""); // Clear input on success
      }
    } else if (dateInput) {
      alert("Invalid date format. Use mm/dd/yyyy.");
    }
  };

  const handleRemoveDate = (targetDate: string) => {
    setBlackoutDates(blackoutDates.filter((date) => date !== targetDate));
  };

  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">
          Capabilities & Service Eligibility
        </h2>
        <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 h-10 px-6 rounded-xl font-bold transition-all shadow-lg shadow-blue-100">
          <Edit3 size={16} />
          Edit Settings
        </Button>
      </div>

      {/* Capability Toggles */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800">
          Service Capabilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: "Mobile Notary",
              desc: "Available for on-site notarization",
            },
            {
              label: "RON Certified",
              desc: "Certified for remote online sessions",
            },
            {
              label: "Loan Signing",
              desc: "Qualified for mortgage loan signings",
            },
            {
              label: "Apostille Support",
              desc: "Available for document authentication",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all"
            >
              <div className="space-y-0.5">
                <p className="font-bold text-slate-700">{item.label}</p>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Area and Distance (Read-only for now) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        <div className="space-y-3">
          <Label className="text-[14px] font-bold text-slate-700 ml-1">
            Assigned Service Area
          </Label>
          <Input
            disabled
            value="San Diego County"
            className="h-12 bg-slate-50/50 border-none rounded-2xl text-slate-600 font-bold"
          />
        </div>
        <div className="space-y-3">
          <Label className="text-[14px] font-bold text-slate-700 ml-1">
            Maximum Travel Radius
          </Label>
          <Input
            disabled
            value="50 miles"
            className="h-12 bg-slate-50/50 border-none rounded-2xl text-slate-600 font-bold"
          />
        </div>
      </div>

      {/* Languages List */}
      <div className="space-y-3">
        <Label className="text-[14px] font-bold text-slate-700 ml-1">
          Languages Spoken
        </Label>
        <div className="flex flex-wrap gap-2.5 p-3 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          {["English", "Spanish", "Vietnamese"].map((lang, idx) => (
            <Badge
              key={idx}
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none px-5 py-1.5 rounded-full font-bold text-xs"
            >
              {lang}
            </Badge>
          ))}
        </div>
      </div>

      {/* Availability & Blackout Dates */}
      <div className="space-y-6 pt-6 border-t border-slate-50">
        <h3 className="text-xl font-bold text-slate-800">
          Availability Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Weekday Checkboxes */}
          <div className="space-y-4">
            <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider text-slate-400">
              Working Days
            </Label>
            <div className="grid grid-cols-2 gap-y-4">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day} className="flex items-center gap-3">
                  <Checkbox
                    id={`day-${day}`}
                    defaultChecked={day !== "Saturday" && day !== "Sunday"}
                    className="w-5 h-5 rounded-md border-slate-300 data-[state=checked]:bg-blue-600"
                  />
                  <label
                    htmlFor={`day-${day}`}
                    className="text-sm font-medium text-slate-600 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Blackout Date Input and List */}
          <div className="space-y-4">
            <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider text-slate-400">
              Blackout Dates
            </Label>
            <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 min-h-[140px] flex flex-col justify-between">
              <div className="space-y-2">
                {blackoutDates.map((date, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0"
                  >
                    <span className="text-slate-700 font-bold text-sm tracking-tight">
                      {date}
                    </span>
                    <button
                      onClick={() => handleRemoveDate(date)}
                      className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {blackoutDates.length === 0 && (
                  <p className="text-xs text-slate-400 italic py-2">
                    No blackout dates defined.
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <div className="relative flex-1">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <Input
                    placeholder="mm/dd/yyyy"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="pl-10 h-10 rounded-xl border-slate-200 focus:ring-2 ring-blue-100"
                  />
                </div>
                <Button
                  onClick={handleAddDate}
                  variant="secondary"
                  className="bg-slate-900 text-white hover:bg-slate-800 h-10 px-4 rounded-xl font-bold flex items-center gap-1"
                >
                  <PlusCircle size={16} />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
