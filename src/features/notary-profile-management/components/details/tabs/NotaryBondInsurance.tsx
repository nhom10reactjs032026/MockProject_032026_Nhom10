import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Upload } from "lucide-react";
import { useNotaryDetail } from "../../../hooks/useNotaries"; // Giả định hook này trả về cả bond và insurance

interface NotaryBondInsuranceProps {
  notaryId: string;
}

export const NotaryBondInsurance = ({ notaryId }: NotaryBondInsuranceProps) => {
  const { data: notary, isLoading } = useNotaryDetail(notaryId);

  // Mock data dựa trên ảnh nếu hook chưa có dữ liệu
  const bond = {
    provider: "Travelers Insurance Group",
    amount: "15.000",
    effectiveDate: "2024-03-15",
    expirationDate: "2026-03-15",
    status: "Expired",
  };

  const insurance = {
    provider: "Notary Shield Inc",
    policyNumber: "NSI-2024-00847",
    coverageAmount: "100.000",
    effectiveDate: "2023-03-15",
    expirationDate: "2026-03-15",
    status: "Expired",
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-80 w-full rounded-3xl" />
        <Skeleton className="h-80 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">
          Bond & Insurance
        </h2>
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center gap-2 h-11 px-8 rounded-xl font-bold transition-all">
          <Upload size={18} />
          Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bond Card */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-slate-800">Bond</h3>
            <Badge className="bg-rose-50 text-rose-500 border-none font-bold text-[10px] uppercase h-6 px-3 rounded-full">
              {bond.status}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 ml-1">
                Bond Provider
              </Label>
              <Input
                disabled
                value={bond.provider}
                className="bg-slate-50/50 border-none h-12 rounded-2xl text-slate-700 font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 ml-1">
                Bond Amount ($)
              </Label>
              <Input
                disabled
                value={`$${bond.amount}`}
                className="bg-slate-50/50 border-none h-12 rounded-2xl text-slate-700 font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 ml-1">
                Bond Effective date
              </Label>
              <Input
                disabled
                value={bond.effectiveDate}
                className="bg-slate-50/50 border-none h-12 rounded-2xl text-slate-700 font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 ml-1">
                Bond Expiration Date
              </Label>
              <Input
                disabled
                value={`${bond.expirationDate} (Expired)`}
                className="bg-rose-50 border-none h-12 rounded-2xl text-rose-500 font-bold"
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4 border-blue-100 text-blue-600 hover:bg-blue-50 h-12 rounded-2xl font-bold flex gap-2"
          >
            <Pencil size={18} />
            Edit Bond
          </Button>
        </div>

        {/* Insurance Card */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-slate-800">Insurance</h3>
            <Badge className="bg-rose-50 text-rose-500 border-none font-bold text-[10px] uppercase h-6 px-3 rounded-full">
              {insurance.status}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 ml-1">
                Insurance Provider
              </Label>
              <Input
                disabled
                value={insurance.provider}
                className="bg-slate-50/50 border-none h-12 rounded-2xl text-slate-700 font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 ml-1">
                Policy Number
              </Label>
              <Input
                disabled
                value={insurance.policyNumber}
                className="bg-slate-50/50 border-none h-12 rounded-2xl text-slate-700 font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 ml-1">
                Coverage Amount ($)
              </Label>
              <Input
                disabled
                value={`$${insurance.coverageAmount}`}
                className="bg-slate-50/50 border-none h-12 rounded-2xl text-slate-700 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 ml-1">
                  Effective Date
                </Label>
                <Input
                  disabled
                  value={insurance.effectiveDate}
                  className="bg-slate-50/50 border-none h-12 rounded-2xl text-slate-700 font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 ml-1">
                  Expiration Date
                </Label>
                <Input
                  disabled
                  value={`${insurance.expirationDate} (Expired)`}
                  className="bg-rose-50 border-none h-12 rounded-2xl text-rose-500 font-bold"
                />
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4 border-blue-100 text-blue-600 hover:bg-blue-50 h-12 rounded-2xl font-bold flex gap-2"
          >
            <Pencil size={18} />
            Edit Insurance
          </Button>
        </div>
      </div>
    </div>
  );
};
