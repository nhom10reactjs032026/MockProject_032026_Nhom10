import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

export const NotaryDocuments = () => {
  // Mock data dựa trên ảnh
  const documents = [
    {
      id: "#8829",
      type: "Commission",
      fileName: "commission_certificate_2022.pdf",
      date: "2022-06-03",
      size: "1.2M",
      status: "Verified",
    },
    {
      id: "#8828",
      type: "Insurance",
      fileName: "notary_insurance_policy.pdf",
      date: "2023-02-03",
      size: "2M",
      status: "Verified",
    },
    {
      id: "#8827",
      type: "RON",
      fileName: "ron_certification_2023.pdf",
      date: "2023-01-03",
      size: "3M",
      status: "Verified",
    },
    {
      id: "#8826",
      type: "Training",
      fileName: "advanced_training_cert.pdf",
      date: "2023-01-04",
      size: "4M",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center gap-2 h-11 px-6 rounded-xl font-bold transition-all">
          <Plus size={18} />
          Create Docs
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">
            Status
          </Label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-white border-none shadow-sm h-11 rounded-2xl">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">
            Date Range
          </Label>
          <div className="relative">
            <Select defaultValue="30">
              <SelectTrigger className="bg-white border-none shadow-sm h-11 rounded-2xl pl-4">
                <SelectValue placeholder="Last 30 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="90">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            <CalendarIcon
              size={16}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">
            Document Type
          </Label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-white border-none shadow-sm h-11 rounded-2xl">
              <SelectValue placeholder="All Documents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="commission">Commission</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col justify-end">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 h-4 w-4" />
            <Input
              className="pl-11 bg-white border-none shadow-sm h-11 rounded-2xl"
              placeholder="Search Documents..."
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 h-14 border-b border-gray-100">
              <TableHead className="pl-8 font-bold text-slate-400 uppercase text-[11px] tracking-widest">
                Document ID
              </TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest">
                Document Type
              </TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest">
                File Name
              </TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest">
                Upload Date
              </TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest">
                Size
              </TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest">
                Status
              </TableHead>
              <TableHead className="pr-8 text-right font-bold text-slate-400 uppercase text-[11px] tracking-widest">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow
                key={doc.id}
                className="hover:bg-slate-50/50 h-20 border-b border-gray-50 last:border-0 group"
              >
                <TableCell className="pl-8 font-bold text-blue-500 text-sm">
                  {doc.id}
                </TableCell>
                <TableCell className="text-slate-500 font-medium">
                  {doc.type}
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {doc.fileName}
                </TableCell>
                <TableCell className="text-slate-800 font-bold">
                  {doc.date}
                </TableCell>
                <TableCell className="text-slate-500 font-medium">
                  {doc.size}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`border-none px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider flex w-fit items-center gap-1.5 ${
                      doc.status === "Verified"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-500"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${doc.status === "Verified" ? "bg-emerald-500" : "bg-rose-500"}`}
                    />
                    {doc.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-8 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-500 hover:bg-blue-50 rounded-xl"
                    >
                      <Eye size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-emerald-500 hover:bg-emerald-50 rounded-xl"
                    >
                      <Pencil size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-rose-400 hover:bg-rose-50 rounded-xl"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-slate-400 font-medium mt-4 pb-10">
        <p>Showing 1 to 5 of 1,248 entries</p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl border border-gray-100 bg-white"
          >
            <ChevronLeft size={18} />
          </Button>
          <Button className="h-9 w-9 bg-blue-600 text-white rounded-xl font-bold">
            1
          </Button>
          <Button variant="ghost" className="h-9 w-9 rounded-xl">
            2
          </Button>
          <Button variant="ghost" className="h-9 w-9 rounded-xl">
            3
          </Button>
          <span className="px-2">...</span>
          <Button variant="ghost" className="h-9 w-9 rounded-xl">
            250
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl border border-gray-100 bg-white"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
