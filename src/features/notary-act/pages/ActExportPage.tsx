import { BadgeCheck, Ban, Braces, CheckCircle2, ChevronRight, FileText, Gavel, History, Lock, Printer, RefreshCw, Share2, User, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { getFullActInfo } from "../api/mockActDetails";
import { ActMenu } from "../components/overview/ActMenu";
interface DownloadActivity {
  id: string;
  user: string;
  role: string;
  documentId: string;
  format: string;
  timestamp: string;
  status: "Verified" | "Pending Auth" | "Archived" | "Voided";
}

export const ActExportPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [actInfo, setActInfo] = useState<any>(null);
  const [exportFormat, setExportFormat] = useState<"secure-pdf" | "certified-copy" | "raw-json">("secure-pdf");
  const [clientAccess, setClientAccess] = useState(true);
  const [regulatorAccess, setRegulatorAccess] = useState(false);
  const [activityLogs, setActivityLogs] = useState<DownloadActivity[]>([]);
  const [generatingLink, setGeneratingLink] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    const fullInfo = getFullActInfo(id);
    if (fullInfo) {
      setActInfo(fullInfo);

      const mockActivities: DownloadActivity[] = Array.from({ length: 12 }).map((_, index) => ({
        id: `${index + 1}`,
        user: index % 2 === 0 ? fullInfo.clientName : "A. Regulator",
        role: index % 2 === 0 ? "Client" : "Auditor",
        documentId: `${fullInfo.actId}-${index % 3 === 0 ? 'CERT' : 'DOC'}`,
        format: index % 3 === 0 ? "PDF" : index % 3 === 1 ? "CERTIFIED" : "JSON",
        timestamp: `2023-10-${20 + index} 11:${10 + index} AM`,
        status:
          index % 4 === 0
            ? "Pending Auth"
            : index % 5 === 0
              ? "Archived"
              : index % 6 === 0
                ? "Voided"
                : "Verified",
      }));
      setActivityLogs(mockActivities);
    }
  }, [id]);

  const handleGenerateLink = () => {
    if (!clientAccess && !regulatorAccess) {
      alert("At least one access role must be enabled.");
      return;
    }

    setGeneratingLink(true);
    setTimeout(() => {
      const fakeLink = `https://notaryapp.com/secure/${id}/${Math.random()
        .toString(36)
        .substring(2, 10)}`;
      setGeneratedLink(fakeLink);
      setShowLinkModal(true);
      setGeneratingLink(false);
    }, 1000);
  };

  const handlePrintReport = () => {
    const printContents = printRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (!printContents) return;

    document.body.innerHTML = `
    <html>
      <head>
        <title>Audit Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background: #f5f5f5; text-align: left; }
          h2 { margin-bottom: 4px; }
          .print-header { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleExportClick = (
    format: "secure-pdf" | "certified-copy" | "raw-json"
  ) => {
    setExportFormat(format);

    const blob = new Blob(["Mock file content"], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `act-${id}.${format}`;
    a.click();
  };

  const handleDone = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigate(`/notary-acts/${id}`);
    }, 800);
  };

  const totalPages = Math.ceil(activityLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = activityLogs.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (!actInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="animate-in fade-in duration-500 bg-[#f8fbff]/30 min-h-screen pb-12">
        <div className="max-w-[1400px] mx-auto py-8">
          {/* Tabs */}
          {/* <div className="mb-6">
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
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 ">
                <Link to="/notary-acts">NOTARIAL ACTS LIST</Link>
                <ChevronRight size={16} />
                <span className="text-blue-600">EXPORT</span>
              </div>
            </div>
          </div> */}
          <ActMenu />
          <div className="p-8 flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 r">
              <Link to="/notary-acts">NOTARIAL ACTS LIST</Link>
              <span className="ml-10"><ChevronRight size={16} /></span>
              <span className="text-blue-600">EXPORT</span>
            </div>
          </div>
          <div className="px-8">

            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Export & Record Access</h1>
                <p className="text-sm text-gray-500">
                  Manage secure document distribution for Client Account: <span className="font-semibold text-gray-700">{actInfo.clientName}</span> ({actInfo.actId})
                </p>
              </div>
              <div className="flex gap-3">
                {/* Đã xóa nút Download File ở đây */}
                <button
                  onClick={handleGenerateLink}
                  disabled={generatingLink}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generatingLink ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Share2 size={16} />
                      Generate Secure Link
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Two-column  */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column  */}
              <div className="space-y-6">
                {/* Export Options Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h2 className="text-xs font-bold text-gray-900  uppercase mb-4">
                    Export Options
                  </h2>

                  <div className="space-y-3">
                    <button
                      disabled={exportFormat === "secure-pdf"}
                      onClick={() => handleExportClick("secure-pdf")}
                      className={`w-full flex items-center p-4 rounded-2xl border transition-all duration-200 group ${exportFormat === "secure-pdf"
                        ? "border-blue-500 bg-blue-50/50 shadow-sm"
                        : "border-gray-100 bg-slate-50 hover:border-gray-200 hover:bg-slate-100"
                        }`}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 text-red-500 mr-4 shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-base font-bold text-gray-900">Secure PDF</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Encrypted with watermark</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                    </button>

                    <button
                      disabled={exportFormat === "certified-copy"}
                      onClick={() => handleExportClick("certified-copy")}
                      className={`w-full flex items-center p-4 rounded-2xl border transition-all duration-200 group ${exportFormat === "certified-copy"
                        ? "border-blue-500 bg-blue-50/50 shadow-sm"
                        : "border-gray-100 bg-slate-50 hover:border-gray-200 hover:bg-slate-100"
                        }`}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mr-4 shrink-0">
                        <BadgeCheck className="w-6 h-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-base font-bold text-gray-900">Certified Copy</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Digital signature included</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                    </button>

                    <button
                      disabled={exportFormat === "raw-json"}
                      onClick={() => handleExportClick("raw-json")}
                      className={`w-full flex items-center p-4 rounded-2xl border transition-all duration-200 group ${exportFormat === "raw-json"
                        ? "border-blue-500 bg-blue-50/50 shadow-sm"
                        : "border-gray-100 bg-slate-50 hover:border-gray-200 hover:bg-slate-100"
                        }`}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-200 text-slate-700 mr-4 shrink-0">
                        <Braces className="w-6 h-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-base font-bold text-gray-900">Raw JSON/CSV</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Audit-ready data format</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Access Control Card */}
                <div

                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <h2 className="text-base font-bold text-gray-900 mb-4">Access Control</h2>

                  <div className="space-y-3">
                    {/* Client Access */}
                    <div className="flex items-center justify-between bg-slate-50/80 px-4 py-3.5 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-900">Client Access</span>
                      </div>
                      <button
                        onClick={() => setClientAccess(!clientAccess)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none ${clientAccess ? "bg-blue-600" : "bg-gray-200"
                          }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${clientAccess ? "translate-x-[22px]" : "translate-x-[2px]"
                            }`}
                        />
                      </button>
                    </div>

                    {/* Regulator Access */}
                    <div className="flex items-center justify-between bg-slate-50/80 px-4 py-3.5 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Gavel className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-900">Regulator Access</span>
                      </div>
                      <button
                        onClick={() => setRegulatorAccess(!regulatorAccess)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none ${regulatorAccess ? "bg-blue-600" : "bg-gray-200"
                          }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${regulatorAccess ? "translate-x-[22px]" : "translate-x-[2px]"
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    * Enabling Regulator Access will trigger an automatic FINRA-compliant notification.
                  </div>
                </div>
              </div>

              {/* Right Column - Download Activity Logs (span 2) */}
              <div className="lg:col-span-2">
                <div
                  ref={printRef}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">Download Activity Logs</h2>
                      <p className="text-xs text-gray-500 mt-1">Real-time audit trail of all record interactions</p>
                    </div>
                    <button
                      onClick={handlePrintReport}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-blue-500 font-bold cursor-pointer hover:bg-gray-50 transition-colors rounded-lg"
                    >
                      <Printer size={16} />
                      Print Audit Report
                    </button>
                  </div>

                  <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase  border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4">USER / ROLE</th>
                          <th className="px-6 py-4">DOCUMENT ID</th>
                          <th className="px-6 py-4">FORMAT</th>
                          <th className="px-6 py-4">TIMESTAMP</th>
                          <th className="px-6 py-4">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {currentLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-bold text-gray-900">{log.user}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{log.role}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600 font-medium">
                              <div className="max-w-[80px] break-words">
                                {log.documentId}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide
              ${log.format === 'PDF' ? 'bg-red-100 text-red-600' : ''}
              ${log.format === 'CERTIFIED' ? 'bg-blue-100 text-blue-600' : ''}
              ${log.format === 'JSON' || log.format === 'ZIP' ? 'bg-slate-100 text-slate-600' : ''}
            `}>
                                {log.format}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              <div className="max-w-[120px] break-words">
                                {log.timestamp}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {log.status === "Verified" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                  <CheckCircle2 size={14} className="text-green-600" />
                                  Verified
                                </span>
                              )}
                              {log.status === "Voided" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                  <Ban size={14} className="text-red-600" />
                                  Voided
                                </span>
                              )}
                              {log.status === "Pending Auth" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                                  <Lock size={14} className="text-orange-600" />
                                  Pending Auth
                                </span>
                              )}
                              {log.status === "Archived" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                                  <History size={14} className="text-slate-500" />
                                  Archived
                                </span>
                              )}

                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  {activityLogs.length > 0 && (
                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                      <p>
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, activityLogs.length)} of {activityLogs.length} entries
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          &lt;
                        </button>

                        {Array.from({ length: totalPages }).map((_, idx) => {
                          const pageNum = idx + 1;
                          const isActive = currentPage === pageNum;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              className={`px-3 py-1 rounded-lg font-medium transition-colors ${isActive
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                                }`}
                            >
                              {pageNum}
                            </button>
                          )
                        })}

                        <button
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          &gt;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
              <Link
                to={`/notary-acts/${id}/status`}
                className="inline-flex items-center px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </Link>
              <button
                onClick={handleDone}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-all disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Done
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secure Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Share2 className="w-6 h-6 text-blue-600" />
              </div>
              <button
                onClick={() => setShowLinkModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <h3 className="text-xs font-bold text-gray-900 mb-2">Secure Link Generated</h3>
            <p className="text-sm text-gray-600 mb-4">
              This link will expire in 24 hours and requires OTP authentication.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg mb-4 break-all">
              <code className="text-xs text-blue-600">{generatedLink}</code>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  alert("Link copied to clipboard!");
                }}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowLinkModal(false)}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};