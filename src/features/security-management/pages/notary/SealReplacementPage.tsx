import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Stamp, ShieldCheck } from 'lucide-react';
import { getSealDetail } from "../../data/seals";
import { toast } from "sonner";

export const SealReplacementPage = () => {
    // State to switch between 2 types: 'physical' or 'digital'
    const [activeType, setActiveType] = useState<'physical' | 'digital'>('physical');

    const { id } = useParams();
    const navigate = useNavigate();
    const sealId = id ?? "";
    const seal = useMemo(() => (sealId ? getSealDetail(sealId) : undefined), [sealId]);

    const initializedRef = useRef(false);

    // Physical form state
    const [shape, setShape] = useState("Round");
    const [size, setSize] = useState("");
    const [materialType, setMaterialType] = useState("");
    const [impressionFileName, setImpressionFileName] = useState<string | null>(null);

    // Digital form state
    const [serialNumber, setSerialNumber] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [certificateFileName, setCertificateFileName] = useState<string | null>(null);

    useEffect(() => {
        if (initializedRef.current) return;
        if (!seal) return;

        // Prefill from mock seal metadata when available
        if (seal.physical) {
            setShape(seal.physical.shape ?? "Round");
            setSize(seal.physical.size ?? "");
            setMaterialType(seal.physical.materialType ?? "");
        }
        if (seal.electronic) {
            setSerialNumber(seal.electronic.serialNumber ?? "");
        }

        // Heuristic: if seal type is electronic/signature, default to digital tab
        if (seal.type !== "Physical") {
            setActiveType("digital");
        }

        initializedRef.current = true;
    }, [seal]);

    const onCancel = () => {
        if (seal) {
            navigate(`/admin/seals/${seal.type === "Physical" ? "p" : "e"}/${seal.id}`);
            return;
        }

        navigate("/admin/seals/registry");
    };

    const saveRequest = () => {
        if (!seal) return;

        if (activeType === "physical") {
            if (!shape.trim() || !size.trim() || !materialType.trim()) {
                toast.error("Please fill all Physical Seal fields.");
                return;
            }
        } else {
            if (!serialNumber.trim() || !issueDate || !expirationDate) {
                toast.error("Please fill all Certificate fields.");
                return;
            }
            if (!certificateFileName) {
                toast.error("Please attach a certificate file.");
                return;
            }
        }

        const KEY = "sealReplacementRequests";
        const nextItem = {
            id: `${Date.now()}`,
            sealId: seal.id,
            sealType: seal.type,
            requestType: activeType,
            payload:
                activeType === "physical"
                    ? {
                          shape,
                          size,
                          materialType,
                          impressionFileName,
                      }
                    : {
                          serialNumber,
                          issueDate,
                          expirationDate,
                          certificateFileName,
                      },
            createdAt: new Date().toISOString(),
            status: "submitted",
        } as const;

        try {
            const raw = localStorage.getItem(KEY);
            const arr = raw ? (JSON.parse(raw) as unknown[]) : [];
            localStorage.setItem(KEY, JSON.stringify([nextItem, ...arr]));
        } catch {
            // ignore
        }

        toast.success("Replacement request submitted (mock)");
        navigate("/admin/seals/registry");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-[32px] border border-blue-50 shadow-sm">
                {/* 1. Ownership Information Card */}
                <div className="p-8 bg-slate-50/50 rounded-[32px] border border-slate-100 mb-8">
                    <h4 className="text-[13px] font-black uppercase text-slate-900 mb-8 tracking-[0.1em] pl-3">
                        Ownership Information
                    </h4>

                    {!seal ? (
                        <div className="text-sm font-bold text-slate-700">
                            Seal not found for ID: <span className="font-black">{sealId || "—"}</span>
                        </div>
                    ) : (

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div>
                            <p className="text-[9px] font-black uppercase text-slate-400 mb-1.5 tracking-widest">Notary Name</p>
                            <p className="font-bold text-slate-800 text-lg">{seal.notary}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase text-slate-400 mb-1.5 tracking-widest">Commission number</p>
                            <p className="font-bold text-slate-800 text-lg">COMM-{seal.id}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase text-slate-400 mb-1.5 tracking-widest">State</p>
                            <p className="font-bold text-slate-800 text-lg">{seal.state}</p>
                        </div>
                    </div>
                    )}
                </div>

                {/* 2. SUB NAV BAR (Tabs to select asset type) */}
                <div className="flex border-b border-slate-100 mb-8 gap-8">
                    <button
                        onClick={() => setActiveType('physical')}
                        className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeType === 'physical' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        Physical Seal Info
                        {activeType === 'physical' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveType('digital')}
                        className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeType === 'digital' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        Certificate Info
                        {activeType === 'digital' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"></div>}
                    </button>
                </div>

                {/* 3. CONTENT CHANGES ACCORDING TO TAB */}
                <div className="animate-in slide-in-from-right-2 duration-300">
                    {activeType === 'physical' ? (
                        /* FORM FOR PHYSICAL SEAL  */
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-5">
                                <h4 className="font-black text-sm text-blue-600 flex items-center gap-2">
                                    <Stamp size={18} /> Basic Information
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">Shape</label>
                                        <select
                                            value={shape}
                                            onChange={(e) => setShape(e.target.value)}
                                            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none"
                                        >
                                            <option>Round</option>
                                            <option>Rectangular</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">Size</label>
                                        <input
                                            type="text"
                                            value={size}
                                            onChange={(e) => setSize(e.target.value)}
                                            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm"
                                            placeholder="1.5 inch"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">Type</label>
                                        <input
                                            type="text"
                                            value={materialType}
                                            onChange={(e) => setMaterialType(e.target.value)}
                                            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm"
                                            placeholder="Rubber Stamp"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <h4 className="font-black text-sm text-blue-600 italic">Seal Impression</h4>
                                <label className="border-2 border-dashed border-slate-200 rounded-[32px] h-60 flex flex-col items-center justify-center bg-slate-50 hover:border-blue-300 transition-all cursor-pointer overflow-hidden group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const f = e.target.files?.[0];
                                            setImpressionFileName(f ? f.name : null);
                                        }}
                                    />

                                    <div className="text-center p-6 group-hover:scale-105 transition-transform">
                                        <Upload className="mx-auto text-slate-300 mb-2" size={40} />
                                        <p className="text-[10px] font-black uppercase text-slate-400">
                                            {impressionFileName ? `Selected: ${impressionFileName}` : "Click to upload new impression"}
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    ) : (
                        /* FORM FOR DIGITAL CERTIFICATE */
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-5">
                                <h4 className="font-black text-sm text-blue-600 flex items-center gap-2">
                                    <ShieldCheck size={18} /> Certificate Details
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">Serial Number</label>
                                        <input
                                            type="text"
                                            value={serialNumber}
                                            onChange={(e) => setSerialNumber(e.target.value)}
                                            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm"
                                            placeholder="33223232"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">Issue Date</label>
                                            <input
                                                type="date"
                                                value={issueDate}
                                                onChange={(e) => setIssueDate(e.target.value)}
                                                className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">Expiration Date</label>
                                            <input
                                                type="date"
                                                value={expirationDate}
                                                onChange={(e) => setExpirationDate(e.target.value)}
                                                className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <h4 className="font-black text-sm text-blue-600 italic">Attach Certificate File</h4>
                                <label className="border-2 border-dashed border-blue-100 rounded-[32px] h-60 flex flex-col items-center justify-center bg-blue-50/30 hover:bg-blue-50 transition-all cursor-pointer">
                                    <input
                                        type="file"
                                        accept=".p12,.cer,.crt,.pem"
                                        className="hidden"
                                        onChange={(e) => {
                                            const f = e.target.files?.[0];
                                            setCertificateFileName(f ? f.name : null);
                                        }}
                                    />
                                    <Upload className="text-blue-300 mb-2" size={40} />
                                    <p className="text-[10px] font-black uppercase text-blue-400">
                                        {certificateFileName ? `Selected: ${certificateFileName}` : "Upload .p12 or .cer file"}
                                    </p>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                {/* 4. Footer Buttons */}
                <div className="flex justify-end gap-4 mt-12 pt-8 border-t border-slate-50">
                    <button
                        onClick={onCancel}
                        className="px-8 py-3 rounded-xl font-black text-xs uppercase text-slate-400 hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveRequest}
                        disabled={!seal}
                        className="px-10 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase italic shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit {activeType === 'physical' ? 'Seal' : 'Certificate'} Request
                    </button>
                </div>
            </div>
        </div>
    );
};