import { AlertTriangle, Ban, CheckCircle2, ChevronRight, FileText, History, Lock, RefreshCw, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getFullActInfo } from "../api/mockActDetails";
import { mockActs } from "../api/mockData";

interface AuditLogEntry {
    id: string;
    timestamp: string;
    user: string;
    action: string;
    details: string;
}

export const ActStatusPage = () => {
    const { id } = useParams();
    const location = useLocation();

    const [actInfo, setActInfo] = useState<any>(null);
    const [timeline, setTimeline] = useState<any[]>([]);
    const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
    const [currentStatus, setCurrentStatus] = useState<string>("");
    const [voidReason, setVoidReason] = useState("");
    const [voidNotes, setVoidNotes] = useState("");
    const [approvalRequired, setApprovalRequired] = useState(false);
    const [isVoiding, setIsVoiding] = useState(false);
    const [voidSuccess, setVoidSuccess] = useState(false);
    const [legalHold, setLegalHold] = useState(false);

    const tabs = [
        { label: "Overview", path: `/notary-acts/${id}` },
        { label: "Set up", path: `/notary-acts/${id}/setup` },
        { label: "Signers and identity", path: `/notary-acts/${id}/signers` },
        { label: "Execution", path: `/notary-acts/${id}/execution` },
        { label: "Certificate", path: `/notary-acts/${id}/certificate` },
        { label: "Journal Entry", path: `/notary-acts/${id}/journal` },
        { label: "Status", path: `/notary-acts/${id}/status` },
        { label: "Export", path: `/notary-acts/${id}/export` },
    ];

    const buildTimeline = (timelineData: any, status: string) => {
        const events = [
            { status: 'Draft', timestamp: '', completed: false },
            { status: 'Completed', timestamp: '', completed: false },
            { status: 'Locked', timestamp: '', completed: false }
        ];

        if (timelineData?.draftedAt) {
            events[0].timestamp = new Date(timelineData.draftedAt).toLocaleString();
            events[0].completed = true;
        }
        if (timelineData?.completedAt) {
            events[1].timestamp = new Date(timelineData.completedAt).toLocaleString();
            events[1].completed = true;
        }
        if (timelineData?.lockedAt) {
            events[2].timestamp = new Date(timelineData.lockedAt).toLocaleString();
            events[2].completed = true;
        }

        if (!events[0].timestamp) events[0].timestamp = 'Not available';
        if (!events[1].timestamp) events[1].timestamp = 'Not available';
        if (!events[2].timestamp) events[2].timestamp = 'Not available';

        if (status === 'Voided') {
            events.push({ status: 'Voided', timestamp: new Date().toLocaleString(), completed: true });
        }

        return events;
    };

    useEffect(() => {
        if (!id) return;
        const fullInfo = getFullActInfo(id);
        if (fullInfo) {
            setActInfo(fullInfo);
            const act = mockActs.find((a) => a.id === id);
            const statusFromAct = act?.status || "Inprocess";
            setCurrentStatus(statusFromAct);

            const timelineEvents = buildTimeline(fullInfo.timeline, statusFromAct);
            setTimeline(timelineEvents);

            const logs: AuditLogEntry[] = [];

            if (fullInfo.timeline?.draftedAt) {
                logs.push({
                    id: "1",
                    timestamp: new Date(fullInfo.timeline.draftedAt).toLocaleString(),
                    user: "Sarah Jenkins (Notary)",
                    action: "Created",
                    details: `Act ${fullInfo.actId} drafted`,
                });
            }

            if (fullInfo.timeline?.completedAt) {
                logs.push({
                    id: "2",
                    timestamp: new Date(fullInfo.timeline.completedAt).toLocaleString(),
                    user: "Sarah Jenkins (Notary)",
                    action: "Completed",
                    details: "Notarization completed",
                });
            }

            if (fullInfo.timeline?.lockedAt) {
                logs.push({
                    id: "3",
                    timestamp: new Date(fullInfo.timeline.lockedAt).toLocaleString(),
                    user: "System",
                    action: "Locked",
                    details: "Record locked automatically after finalization",
                });
            }

            if (logs.length === 0) {
                logs.push({
                    id: "1",
                    timestamp: "Not available",
                    user: "System",
                    action: "Created",
                    details: `Act ${fullInfo.actId} created`,
                });
            }

            setAuditLogs(logs);
        }
    }, [id]);

    const handleVoid = () => {
        if (!voidReason) {
            alert("Please select a void reason.");
            return;
        }
        if (approvalRequired) {
            const confirmVoid = window.confirm(
                "Approval is required. Are you sure you want to void this act? This action cannot be undone."
            );
            if (!confirmVoid) return;
        }
        setIsVoiding(true);
        setTimeout(() => {
            setCurrentStatus("Voided");
            setVoidSuccess(true);
            setAuditLogs((prev) => [
                {
                    id: Date.now().toString(),
                    timestamp: new Date().toLocaleString(),
                    user: "Sarah Jenkins (Notary)",
                    action: "Voided",
                    details: `Reason: ${voidReason}. Notes: ${voidNotes || "No additional notes"}`,
                },
                ...prev,
            ]);
            setTimeline((prev) => {
                const hasVoided = prev.some((e) => e.status === "Voided");
                if (!hasVoided) {
                    return [
                        ...prev,
                        { status: "Voided", timestamp: new Date().toLocaleString(), completed: true },
                    ];
                }
                return prev;
            });
            setIsVoiding(false);
            setTimeout(() => setVoidSuccess(false), 3000);
        }, 1000);
    };

    if (!actInfo) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500 bg-[#f8fbff]/30 min-h-screen pb-12">
            <div className="max-w-[1400px] mx-auto py-8">
                {/* Tabs */}
                <div className="mb-6">
                    <div className="flex items-center gap-8 border-b border-gray-100 px-8 mb-6 overflow-x-auto whitespace-nowrap">
                        {tabs.map((tab) => {
                            const isActive = location.pathname === tab.path;
                            return (
                                <Link
                                    key={tab.label}
                                    to={tab.path}
                                    className={`py-4 text-sm font-medium border-b-2 transition-colors ${isActive
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    {tab.label}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="px-8 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 tracking-wider">
                            <Link to="/notary-acts">NOTARIAL ACTS LIST</Link>
                            <ChevronRight size={16} />
                            <span className="text-blue-600">STATUS</span>
                        </div>
                    </div>
                </div>

                <div className="px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Status, Void, and Audit History</h1>
                    </div>

                    <div className="space-y-8">
                        {/* Status Timeline */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-6">Status Timeline (ACT-ID : {actInfo.actId})</h2>
                            <div className="relative">
                                <div className="flex justify-between items-stretch">
                                    {timeline.map((event, index) => (
                                        <div key={event.status} className="flex-1 text-center relative group">
                                            <div className="flex flex-col items-center">
                                                {/* Icon Circle */}
                                                <div className={`
                                                    relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                                                    transition-all duration-300 shadow-sm
                                                    ${event.completed
                                                        ? event.status === "Voided"
                                                            ? "bg-red-100 text-red-600 border-2 border-red-200"
                                                            : "bg-emerald-100 text-emerald-600 border-2 border-emerald-200"
                                                        : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                                                    }
                                                    group-hover:scale-105
                                                `}>
                                                    {event.status === "Draft" && <FileText size={22} />}
                                                    {event.status === "Completed" && <CheckCircle2 size={22} />}
                                                    {event.status === "Locked" && <Lock size={22} />}
                                                    {event.status === "Voided" && <Ban size={22} />}
                                                </div>
                                                {/* Status Label */}
                                                <p className={`mt-3 font-semibold text-sm ${event.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                                    {event.status}
                                                </p>
                                                {/* Timestamp */}
                                                <p className="text-xs text-gray-500 mt-1 max-w-[140px] break-words">
                                                    {event.timestamp}
                                                </p>
                                            </div>
                                            {/* Connecting Line */}
                                            {index < timeline.length - 1 && (
                                                <div className="absolute top-6 left-1/2 w-full h-0.5 -z-0">
                                                    <div className={`
                                                        absolute top-0 left-0 w-full h-full
                                                        transition-all duration-300
                                                        ${event.completed && timeline[index + 1]?.completed
                                                            ? "bg-emerald-500"
                                                            : "bg-gray-200"
                                                        }
                                                    `} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Void Workflow */}
                        {currentStatus !== "Voided" && (
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <AlertTriangle size={18} className="text-amber-500" />
                                    Void Workflow
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
                                            Void Reason *
                                        </label>
                                        <select
                                            value={voidReason}
                                            onChange={(e) => setVoidReason(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select reason</option>
                                            <option value="Incorrect information">Incorrect information</option>
                                            <option value="Duplicate act">Duplicate act</option>
                                            <option value="Signer requested cancellation">Signer requested cancellation</option>
                                            <option value="Notarial error">Notarial error</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            rows={3}
                                            placeholder="Enter any additional notes..."
                                            value={voidNotes}
                                            onChange={(e) => setVoidNotes(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="approvalRequired"
                                            checked={approvalRequired}
                                            onChange={(e) => setApprovalRequired(e.target.checked)}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor="approvalRequired" className="text-sm text-gray-700">
                                            Approval required for voiding (company policy)
                                        </label>
                                    </div>
                                    <div className="pt-2">
                                        <button
                                            onClick={handleVoid}
                                            disabled={isVoiding}
                                            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${isVoiding
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                : "bg-red-600 hover:bg-red-700 text-white shadow-md"
                                                }`}
                                        >
                                            {isVoiding ? (
                                                <>
                                                    <RefreshCw size={16} className="animate-spin" />
                                                    Voiding...
                                                </>
                                            ) : (
                                                <>
                                                    <Ban size={16} />
                                                    Void Act
                                                </>
                                            )}
                                        </button>
                                        {voidSuccess && (
                                            <p className="mt-2 text-sm text-emerald-600">Act has been voided successfully.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Audit Log */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <History size={18} className="text-blue-500" />
                                Audit Log
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                                        <tr>
                                            <th className="px-4 py-3">Timestamp</th>
                                            <th className="px-4 py-3">User</th>
                                            <th className="px-4 py-3">Action</th>
                                            <th className="px-4 py-3">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {auditLogs.map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-gray-600">{log.timestamp}</td>
                                                <td className="px-4 py-3 font-medium text-gray-900">{log.user}</td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                        {log.action}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-500">{log.details}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Legal Hold Indicator */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Shield size={18} className="text-purple-500" />
                                Legal Hold Indicator
                            </h2>
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="legalHold"
                                    checked={legalHold}
                                    onChange={(e) => setLegalHold(e.target.checked)}
                                    className="w-4 h-4 mt-1 text-purple-600 rounded focus:ring-purple-500"
                                />
                                <div>
                                    <label htmlFor="legalHold" className="text-sm font-medium text-gray-900">
                                        Place this record on legal hold
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">
                                        When enabled, this record cannot be modified or deleted, even if it is not yet voided or locked.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};