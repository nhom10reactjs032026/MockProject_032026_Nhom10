import React, { useState } from "react";
import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import { useNavigate, Link } from "react-router-dom";
import {
  ChevronLeft,
  Download,
  Printer,
  Lock,
  Link as LinkIcon,
  User,
  Fingerprint,
  Info,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FilePlus,
  Check,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const JournalEntryDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("entry-data");

  const tabs = [
    { id: "entry-data", label: "Entry Data", icon: User },
    { id: "signer-info", label: "Signer & ID Information", icon: User },
    { id: "signature", label: "Signature / Thumbprint", icon: Fingerprint },
    { id: "linked-act", label: "Linked Notarial Act", icon: LinkIcon },
    { id: "audit-log", label: "Audit Log", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col pt-20 transition-colors duration-500 font-['Plus_Jakarta_Sans']">
      <Header />

      {/* Hero Banner Section */}
      <section className="relative h-96 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&q=80&w=2301"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 text-center space-y-4 px-6 md:container mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight">
            Journal Entry Details
          </h1>
          <nav className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
            <Link to="/" className="hover:text-[#c4a484] transition-colors">
              Home
            </Link>
            <span className="opacity-60 text-sm">/</span>
            <Link
              to="/notary-journal"
              className="hover:text-[#c4a484] transition-colors"
            >
              Notary Journal Dashboard
            </Link>
            <span className="opacity-60 text-sm">/</span>
            <span className="opacity-80">Entry Details</span>
          </nav>
        </div>
      </section>

      <section className="py-8 px-6 flex-1">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Action Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border border-[#ebebeb] flex items-center justify-center rounded-none shadow-sm">
                <BookOpen className="w-6 h-6 text-[#c4a484]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Journal Entry Details
                </h1>
                <p className="text-muted-foreground text-sm">
                  Viewing archived legal record
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => navigate("/notary-journal")}
                variant="outline"
                className="bg-white border-[#ebebeb] text-foreground font-bold h-10 px-4 rounded-none hover:bg-[#f8f8f8] text-xs transition-all"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                variant="outline"
                className="bg-white border-[#ebebeb] text-foreground font-bold h-10 px-4 rounded-none hover:bg-[#f8f8f8] text-xs transition-all"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Record
              </Button>
              <Button className="bg-[#c4a484] hover:bg-[#b08e6d] text-white font-bold h-10 px-4 rounded-none text-xs transition-all shadow-sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-8 border-b border-[#ebebeb] bg-white px-6 pt-2 overflow-x-auto rounded-none shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-semibold flex items-center gap-2 transition-colors relative whitespace-nowrap ${
                    isActive
                      ? "text-[#c4a484]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c4a484]"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Card - Entry Data */}
          {activeTab === "entry-data" && (
            <>
              <div className="bg-white border border-[#ebebeb] rounded-none shadow-sm p-8">
                {/* Top Details */}
                <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-[#ebebeb] pb-8 gap-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-3xl font-bold text-foreground tracking-tight">
                        JE-2023-8842
                      </h2>
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-700 border-gray-200 font-bold rounded-none text-[10px] uppercase px-2 py-0.5"
                      >
                        <Lock className="w-3 h-3 mr-1" />
                        Locked
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground font-semibold">
                      <LinkIcon className="w-4 h-4" />
                      Linked Notarial Act:{" "}
                      <span className="text-[#c4a484]">#NA-9910</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:text-right gap-1 border-l-0 md:border-l border-[#ebebeb] md:pl-8">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Created By
                      </span>
                      <p className="text-sm font-semibold text-foreground">
                        Sarah Jenkins, Notary Public
                      </p>
                    </div>
                    <div className="mt-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Signed On
                      </span>
                      <p className="text-sm font-semibold text-foreground">
                        Oct 24, 2023 14:32 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Core Entry Data */}
                <div className="py-8 border-b border-[#ebebeb]">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                    Core Entry Data
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="relative">
                      <span className="absolute -left-3 top-1.5 w-1.5 h-1.5 rounded-full bg-[#c4a484]"></span>
                      <label className="text-xs font-bold text-muted-foreground flex items-center gap-1 mb-2">
                        Date & Time <Info className="w-3 h-3" />
                      </label>
                      <div className="bg-[#f8f8f8] border border-[#ebebeb] p-3 text-sm font-semibold text-foreground">
                        October 24, 2023 —
                        <br />
                        14:32:11
                      </div>
                      <p className="text-[10px] font-bold uppercase text-[#c4a484] mt-2 tracking-widest">
                        Auto-Populated
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground mb-2 block">
                        Act Type
                      </label>
                      <div className="bg-white border border-[#ebebeb] p-3 text-sm font-semibold text-foreground flex items-center h-[66px]">
                        Acknowledgment
                      </div>
                      <p className="text-[10px] font-bold uppercase text-muted-foreground mt-2 tracking-widest">
                        Manual Entry
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground mb-2 block">
                        Venue/State
                      </label>
                      <div className="bg-[#f8f8f8] border border-[#ebebeb] p-3 text-sm font-semibold text-foreground flex items-center h-[66px]">
                        Kings County, New York
                      </div>
                      <p className="text-[10px] font-bold uppercase text-[#c4a484] mt-2 tracking-widest">
                        Auto-Populated (GPS)
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground mb-2 block">
                        Notarial Fee
                      </label>
                      <div className="bg-white border border-[#ebebeb] p-3 text-sm font-semibold text-foreground flex items-center h-[66px]">
                        $15.00 USD
                      </div>
                      <p className="text-[10px] font-bold uppercase text-muted-foreground mt-2 tracking-widest">
                        Manual Entry
                      </p>
                    </div>
                  </div>
                </div>

                {/* Signer Information */}
                <div className="py-8">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                    Signer Information
                  </h3>
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex gap-4 flex-1">
                      <div className="w-16 h-16 bg-[#f8f8f8] rounded-none flex items-center justify-center shrink-0 border border-[#ebebeb]">
                        <User className="w-8 h-8 text-[#c4a484]" />
                      </div>
                      <div className="w-full">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Signer Name
                        </span>
                        <h4 className="text-lg font-bold text-foreground mb-4">
                          Michael R. Thompson
                        </h4>

                        <div className="border border-[#ebebeb] p-4 bg-white">
                          <div className="flex justify-between items-center border-b border-[#ebebeb] pb-3 mb-3">
                            <span className="text-sm font-bold text-muted-foreground">
                              ID Type:
                            </span>
                            <span className="text-sm font-bold text-foreground">
                              Passport (Exp. 2028)
                            </span>
                          </div>
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-bold text-muted-foreground">
                              Verification:
                            </span>
                            <span className="text-sm font-bold text-green-600 ml-2 text-right">
                              Verified via Knowledge-Based Auth
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="bg-[#fdf2e3] border border-[#c4a484]/30 p-5 rounded-none h-full">
                        <div className="flex items-center gap-2 mb-3">
                          <Fingerprint className="w-5 h-5 text-[#c4a484]" />
                          <h4 className="text-xs font-bold uppercase tracking-widest text-[#c4a484]">
                            Biometric Match Hash
                          </h4>
                        </div>
                        <p className="text-[11px] text-muted-foreground font-medium mb-1">
                          SHA-256:
                        </p>
                        <p className="text-xs text-foreground font-mono break-all leading-relaxed">
                          8e45a2c1d8f76b9e4a3c2b1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Protocol Card */}
                <div className="bg-white border border-[#ebebeb] p-8 rounded-none shadow-sm">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                    Field Source Protocol
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#c4a484]"></span>
                      <span className="text-sm font-bold text-foreground">
                        System Auto-Populated (Locked)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                      <span className="text-sm font-bold text-muted-foreground">
                        Manual Entry (Audited)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                      <span className="text-sm font-bold text-muted-foreground">
                        Third-Party API Hook
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chain of Custody */}
                <div className="bg-white border border-[#ebebeb] p-8 rounded-none shadow-sm flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Digital Chain of Custody
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c4a484]">
                      Integrity Verified
                    </span>
                  </div>

                  <div className="relative border-l-2 border-[#ebebeb] ml-2 space-y-8 flex-1">
                    <div className="relative pl-6">
                      <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-[#c4a484]"></span>
                      <h4 className="text-sm font-bold text-foreground">
                        Record Finalized & Encrypted
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-1 font-medium">
                        Oct 24, 2023 14:35:01 PM - System
                      </p>
                    </div>

                    <div className="relative pl-6">
                      <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></span>
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Signer Identity Confirmed
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-1 font-medium">
                        Oct 24, 2023 14:31:55 PM - Sarah Jenkins
                      </p>
                    </div>

                    <div className="relative pl-6">
                      <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></span>
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Journal Entry Created
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-1 font-medium">
                        Oct 24, 2023 14:30:12 PM - Sarah Jenkins
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Signer & ID Info Tab (SC_005) */}
          {activeTab === "signer-info" && (
            <div className="space-y-6">
              
              {/* Top Alert Banner */}
              <div className="bg-white border border-[#ebebeb] p-6 lg:px-8 py-6 rounded-none shadow-sm flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                <div>
                  <div className="flex items-center gap-2 text-yellow-600 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Verification Pending</span>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Signer Verification</h2>
                  <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
                    Complete the following fields to satisfy legal requirements for the statutory journal entry. Ensure all identification details match the presented documents.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <Button className="bg-[#c4a484] hover:bg-[#b08e6d] text-white font-bold h-10 px-6 rounded-none text-xs transition-all w-full lg:w-auto">
                    Finalize Entry
                  </Button>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Verification Status</p>
                    <div className="flex flex-row items-center justify-end gap-1.5 mt-0.5 text-red-500">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span className="text-sm font-bold">Incomplete Data</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium mt-1">
                    Date & Time: 2023-10-27 14:30
                  </p>
                </div>
              </div>

              {/* Main Split Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column Forms (Steps) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Step 1: Signer Information */}
                  <div className="bg-white border border-[#ebebeb] rounded-none shadow-sm">
                    <div className="px-6 py-4 flex items-center justify-between border-b border-[#ebebeb]">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#c4a484]" />
                        <h3 className="text-sm font-bold text-foreground">Signer Information</h3>
                      </div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Step 1 of 3</span>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-5">
                          <div>
                            <label className="text-xs font-bold text-muted-foreground block mb-2">Full Legal Name</label>
                            <input 
                              type="text" 
                              placeholder="As it appears on identification" 
                              className="w-full h-10 px-3 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-none placeholder:text-muted-foreground/50"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground block mb-2">Residential Address</label>
                            <textarea 
                              placeholder="Street, City, State, ZIP Code" 
                              className="w-full h-24 p-3 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-none resize-none placeholder:text-muted-foreground/50"
                            ></textarea>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground block mb-2 text-right">Signer Journal Signature</label>
                          <div className="border border-[#ebebeb] bg-[#2a4d44] h-36 flex flex-col items-center justify-center relative rounded-none">
                            <span className="absolute bottom-2 right-2 font-['Inter'] italic text-white/50 text-2xl rotate-[-10deg]">J.Doe</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground text-right mt-2 font-medium underline uppercase tracking-widest cursor-pointer hover:text-foreground">Provided by Signer</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Identification Details */}
                  <div className="bg-white border border-[#ebebeb] rounded-none shadow-sm">
                    <div className="px-6 py-4 flex items-center justify-between border-b border-[#ebebeb]">
                      <div className="flex items-center gap-2">
                        <FilePlus className="w-4 h-4 text-[#c4a484]" />
                        <h3 className="text-sm font-bold text-foreground">Identification Details</h3>
                      </div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Step 2 of 3</span>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground block mb-2">ID Type</label>
                          <div className="relative">
                            <select className="appearance-none w-full h-10 pl-3 pr-10 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-none text-foreground">
                              <option>Driver's License</option>
                              <option>Passport</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground block mb-2">Issuing Authority</label>
                          <input 
                            type="text" 
                            placeholder="e.g. State of California" 
                            className="w-full h-10 px-3 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-none placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground block mb-2">ID Number</label>
                          <input 
                            type="text" 
                            placeholder="Serial or license number" 
                            className="w-full h-10 px-3 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-none placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground block mb-2">Expiration Date</label>
                          <input 
                            type="text" 
                            placeholder="mm/dd/yyyy" 
                            className="w-full h-10 px-3 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-none placeholder:text-muted-foreground/50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Notary's Confirmation */}
                  <div className="bg-white border border-[#ebebeb] rounded-none shadow-sm">
                    <div className="px-6 py-4 flex items-center justify-between border-b border-[#ebebeb]">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#c4a484]" />
                        <h3 className="text-sm font-bold text-foreground">Notary's Confirmation</h3>
                      </div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Step 3 of 3</span>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 space-y-6">
                          <div>
                            <label className="text-xs font-bold text-muted-foreground block mb-2">Identification Method</label>
                            <div className="relative">
                              <select className="appearance-none w-full h-10 pl-3 pr-10 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-none text-foreground">
                                <option>Government-issued ID</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground block mb-2">Document Description</label>
                            <textarea 
                              placeholder="Power of Attorney / Deed / Affidavit..." 
                              className="w-full h-24 p-3 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-none resize-none placeholder:text-muted-foreground/50"
                            ></textarea>
                          </div>
                        </div>

                        <div className="flex-1 space-y-6">
                          <div>
                            <label className="text-xs font-bold text-muted-foreground block mb-2">Notary Fee ($)</label>
                            <div className="flex items-center">
                              <input 
                                type="text" 
                                placeholder="10.00"
                                value="10.000"
                                readOnly
                                className="w-full h-10 px-3 border border-r-0 border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-none text-foreground"
                              />
                              <div className="h-10 px-4 flex items-center border border-[#ebebeb] bg-[#f8f8f8] text-muted-foreground rounded-none">
                                <span className="text-sm font-bold">$</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-bold text-muted-foreground block mb-2">Venue</label>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <span className="w-16 text-sm text-muted-foreground">State:</span>
                                <div className="relative flex-1">
                                  <select className="appearance-none w-full h-10 pl-3 pr-10 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-none text-foreground">
                                    <option>California</option>
                                  </select>
                                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                                </div>
                              </div>
                              <div className="flex items-center">
                                <span className="w-16 text-sm text-muted-foreground">County:</span>
                                <div className="relative flex-1">
                                  <select className="appearance-none w-full h-10 pl-3 pr-10 border border-[#ebebeb] bg-white text-sm focus:outline-none focus:border-[#c4a484] transition-colors rounded-none text-foreground">
                                    <option>Los Angeles</option>
                                  </select>
                                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right pt-2">
                            <p className="text-[10px] text-muted-foreground font-medium underline uppercase tracking-widest cursor-pointer hover:text-foreground">Verified by Notary</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column Boxes */}
                <div className="space-y-6">
                  
                  {/* Verification Method Card */}
                  <div className="bg-white border border-[#ebebeb] rounded-none shadow-sm flex flex-col">
                    <div className="px-6 py-4 flex items-center gap-2 border-b border-[#ebebeb]">
                      <CheckCircle2 className="w-4 h-4 text-[#c4a484]" />
                      <h3 className="text-sm font-bold text-foreground">Verification Method</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="border border-[#c4a484] bg-white rounded-none p-4 flex items-start justify-between cursor-pointer shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#c4a484]"></div>
                        <div>
                          <h4 className="font-bold text-sm text-foreground">Physical Presence</h4>
                          <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">Signer is personally known or appears in person</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-[#c4a484] flex items-center justify-center bg-[#fdf2e3] shrink-0 mt-1">
                          <Check className="w-3 h-3 text-[#c4a484]" />
                        </div>
                      </div>

                      <div className="border border-[#ebebeb] bg-white rounded-none p-4 flex items-start justify-between cursor-pointer hover:border-gray-300 transition-colors">
                        <div>
                          <h4 className="font-bold text-sm text-foreground">RON (Remote Online)</h4>
                          <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">Audio-visual technology verification</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center shrink-0 mt-1">
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Checklist Card */}
                  <div className="bg-white border border-[#ebebeb] rounded-none shadow-sm flex flex-col">
                    <div className="px-6 py-4 flex items-center gap-2 border-b border-[#ebebeb]">
                      <CheckCircle2 className="w-4 h-4 text-[#c4a484]" />
                      <h3 className="text-sm font-bold text-foreground">Compliance Checklist</h3>
                    </div>
                    <div className="p-6 space-y-4 flex flex-col gap-3">
                      <div className="border border-green-200 bg-green-50 rounded-none p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm font-semibold">ID Type Selected</span>
                        </div>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-green-700">Valid</span>
                      </div>

                      <div className="border border-gray-200 bg-gray-50 rounded-none p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500">
                          <div className="w-4 h-4 rounded-full border border-gray-400"></div>
                          <span className="text-sm font-semibold">Name Matching</span>
                        </div>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Missing</span>
                      </div>

                      <div className="border border-red-200 bg-red-50 rounded-none p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="w-4 h-4" />
                          <span className="text-sm font-semibold">Expiration Status</span>
                        </div>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-red-600">Invalid</span>
                      </div>
                    </div>
                  </div>

                  {/* Attached Document Card */}
                  <div className="bg-white border border-[#ebebeb] rounded-none shadow-sm flex flex-col">
                    <div className="px-6 py-4 flex items-center gap-2 border-b border-[#ebebeb]">
                      <BookOpen className="w-4 h-4 text-[#c4a484]" />
                      <h3 className="text-sm font-bold text-foreground">Attached Document</h3>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="flex gap-4">
                        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-[#ebebeb] rounded-none p-4 hover:bg-[#f8f8f8] cursor-pointer transition-colors text-center h-24">
                          <Download className="w-5 h-5 text-gray-400 mb-2" />
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Customer Profile</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-[#ebebeb] rounded-none p-4 hover:bg-[#f8f8f8] cursor-pointer transition-colors text-center h-24">
                          <Download className="w-5 h-5 text-gray-400 mb-2" />
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Signed document<br/>attached</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-muted-foreground block mb-2">Status</span>
                        <div className="bg-green-100/50 border border-green-200 p-3 flex gap-2 items-start rounded-none mb-3">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <p className="text-xs font-semibold text-green-800">information is verified and secured by the state.</p>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 p-3 flex gap-2 items-start rounded-none">
                          <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                          <p className="text-xs font-medium text-yellow-800 leading-tight">
                            <span className="font-bold">SYSTEM NOTE:</span> [The records were last updated on 2026-03-19]
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-[#ebebeb]">
                        <button className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest hover:text-foreground underline">
                          Discard Changes
                        </button>
                        <Button className="bg-[#c4a484] hover:bg-[#b08e6d] text-white font-bold h-10 px-6 rounded-none text-xs transition-all shadow-sm">
                          Next Step
                        </Button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
