import React from "react";
import { 
  Search, Filter, Download, Plus, MoreVertical, 
  Calendar, ChevronLeft, ChevronRight, AlertTriangle, 
  AlertCircle, Lock, Circle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const journalEntries = [
  {
    id: '#8829',
    alert: null,
    dateTime: 'Oct 24, 10:30 AM',
    notary: 'Jane Doe',
    actType: 'Acknowledgment',
    signerName: 'John Smith',
    fee: '$25.00',
    status: 'Completed',
    statusType: 'success',
    riskFlags: 'None',
  },
  {
    id: '#8828',
    alert: 'warning',
    dateTime: 'Oct 24, 09:15 AM',
    notary: 'Jane Doe',
    actType: 'Jurat',
    signerName: 'Mary Ellis',
    fee: '$15.00',
    status: 'Draft',
    statusType: 'draft',
    riskFlags: 'Warning',
  },
  {
    id: '#8827',
    alert: null,
    dateTime: 'Oct 23, 04:45 PM',
    notary: 'Robert Fox',
    actType: 'Oaths',
    signerName: 'Alice Wong',
    fee: '-',
    status: 'Locked',
    statusType: 'locked',
    riskFlags: 'None',
  },
  {
    id: '#8826',
    alert: null,
    dateTime: 'Oct 23, 02:00 PM',
    notary: 'Jane Doe',
    actType: 'Deed',
    signerName: 'Charles Reed',
    fee: '$50.00',
    status: 'Completed',
    statusType: 'success',
    riskFlags: 'None',
  },
  {
    id: '#8825',
    alert: 'error',
    dateTime: 'Oct 22, 11:30 AM',
    notary: 'Robert Fox',
    actType: 'Deed',
    signerName: 'Linda White',
    fee: '$25.00',
    status: 'Action Required',
    statusType: 'error',
    riskFlags: 'Warning',
  }
];

export const JournalManagerTab = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">

      {/* Table Container */}
      <div className="bg-white border border-[#ebebeb] rounded-none shadow-sm flex flex-col mt-4">
        {/* Toolbar - SC_002 Accurate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 p-6 border-b border-[#ebebeb]">
          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">STATUS</label>
            <select className="h-10 border border-[#ebebeb] bg-white px-3 outline-none focus:ring-1 focus:ring-[#c4a484] text-sm text-foreground">
              <option>All Statuses</option>
              <option>Completed</option>
              <option>Draft</option>
              <option>Action Required</option>
            </select>
          </div>
          {/* DATE RANGE */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">DATE RANGE</label>
            <div className="relative h-10 border border-[#ebebeb] bg-white flex items-center px-3 cursor-pointer">
              <span className="text-sm text-foreground">Last 30 Days</span>
              <Calendar className="absolute right-3 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          {/* ACT TYPE */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">ACT TYPE</label>
            <select className="h-10 border border-[#ebebeb] bg-white px-3 outline-none focus:ring-1 focus:ring-[#c4a484] text-sm text-foreground">
              <option>All Acts</option>
              <option>Acknowledgment</option>
              <option>Jurat</option>
              <option>Oaths</option>
            </select>
          </div>
          {/* NOTARY */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">NOTARY</label>
            <Input placeholder="Name or ID" className="h-10 border border-[#ebebeb] bg-white px-3 outline-none focus-visible:ring-[#c4a484] text-sm rounded-none text-foreground placeholder:text-muted-foreground" />
          </div>
          {/* STATE */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">STATE</label>
            <select className="h-10 border border-[#ebebeb] bg-white px-3 outline-none focus:ring-1 focus:ring-[#c4a484] text-sm text-foreground">
              <option>All States</option>
              <option>Texas</option>
              <option>California</option>
              <option>New York</option>
            </select>
          </div>
          {/* CLEAR BUTTON */}
          <div className="flex flex-col gap-1.5 justify-end">
            <Button variant="outline" className="h-10 border-[#ebebeb] bg-[#f8f8f8] text-[#c4a484] font-bold uppercase tracking-widest text-[11px] rounded-none hover:bg-[#c4a484]/10 w-full">
              CLEAR ALL
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="min-w-[1100px]">
            <TableHeader className="bg-white">
              <TableRow className="border-b border-[#ebebeb]">
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4 px-6">
                  ENTRY ID
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  DATE/TIME
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  NOTARY
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  ACT TYPE
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  SIGNER NAME
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  FEE
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  STATUS
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4">
                  RISK FLAGS
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-muted-foreground py-4 text-right pr-6">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {journalEntries.map((log) => (
                <TableRow
                  key={log.id}
                  className="hover:bg-[#f8f8f8]/50 transition-colors group border-b border-[#ebebeb]"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#c4a484] text-sm">{log.id}</span>
                      {log.alert === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />}
                      {log.alert === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-medium py-4 text-sm whitespace-nowrap">
                    {log.dateTime}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-4 text-sm">
                    {log.notary}
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="inline-flex items-center px-3 py-1 bg-[#f8f8f8] border border-[#ebebeb] text-muted-foreground text-xs font-semibold rounded-none">
                      {log.actType}
                    </span>
                  </TableCell>
                  <TableCell className="text-foreground font-bold py-4 text-sm whitespace-nowrap">
                    {log.signerName}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-4 text-sm">
                    {log.fee}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    {log.statusType === 'success' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-bold hover:bg-green-50 rounded-none text-[10px] uppercase tracking-widest px-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 shrink-0"></span> {log.status}
                      </Badge>
                    )}
                    {log.statusType === 'draft' && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-bold hover:bg-blue-50 rounded-none text-[10px] uppercase tracking-widest px-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 shrink-0"></span> {log.status}
                      </Badge>
                    )}
                    {log.statusType === 'locked' && (
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 font-bold hover:bg-gray-100 rounded-none text-[10px] uppercase tracking-widest px-2">
                        <Lock className="w-3 h-3 mr-1.5 text-gray-500 shrink-0" /> {log.status}
                      </Badge>
                    )}
                    {log.statusType === 'error' && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-bold hover:bg-red-50 rounded-none text-[10px] uppercase tracking-widest px-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 shrink-0"></span> {log.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    {log.riskFlags === 'None' ? (
                      <span className="text-sm font-semibold text-foreground">None</span>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 font-bold hover:bg-yellow-50 rounded-none text-[10px] uppercase tracking-widest px-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 shrink-0"></span> {log.riskFlags}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right py-4 pr-6 whitespace-nowrap">
                    <button 
                      onClick={() => navigate('/notary-journal/detail')}
                      className="text-[12px] font-bold text-[#c4a484] hover:opacity-80 transition-opacity"
                    >
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Info */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground font-medium text-center sm:text-left">
            Showing 1 to 5 of 1,248 entries
          </span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-[#f8f8f8] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-[#c4a484] text-white font-bold text-sm rounded-none">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-[#f8f8f8] font-bold text-sm rounded-none transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-[#f8f8f8] font-bold text-sm rounded-none transition-colors">
              3
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-muted-foreground font-bold text-sm">
              ...
            </span>
            <button className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-[#f8f8f8] font-bold text-sm rounded-none transition-colors">
              250
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-[#f8f8f8] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
