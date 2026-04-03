import { AlertTriangle, CheckCircle2, ChevronRight, DollarSign, Fingerprint, ListChecks, MapPin, MoreHorizontal, PenTool, Printer, RefreshCw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getFullActInfo } from "../api/mockActDetails";
import { mockActs } from "../api/mockData";
import { ActMenu } from "../components/overview/ActMenu";

interface SignerInfo {
  name: string;
  role: string;
  id: string;
  idType?: string;
  idVerified?: boolean;
}

interface JournalEntry {
  dateTime: string;
  actType: string;
  signers: SignerInfo[];
  fee: number | null;
  location: string;
  notes: string;
  thumbprint: File | null;
  thumbprintPreview?: string;
  signatureRecapture: File | null;
  signaturePreview?: string;
  notarySignature: File | null;
  notarySignaturePreview?: string;
}

export const ActJournalPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const [actInfo, setActInfo] = useState<any>(null);
  const [journal, setJournal] = useState<JournalEntry>({
    dateTime: '',
    actType: '',
    signers: [],
    fee: null,
    location: '',
    notes: '',
    thumbprint: null,
    thumbprintPreview: undefined,
    signatureRecapture: null,
    signaturePreview: undefined,
    notarySignature: null,
    notarySignaturePreview: undefined

  });
  const [compliancePassed, setCompliancePassed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [thumbprintRequired, setThumbprintRequired] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  // Lấy thông tin act
  useEffect(() => {
    if (!id) return;
    const fullInfo = getFullActInfo(id);

    if (!fullInfo) return;
    setActInfo(fullInfo);

    const actFromWork = mockActs.find(a => a.id === id);

    // Tạo danh sách signers
    const signersList = fullInfo.signers?.map((name: string, idx: number) => ({
      name,
      role: idx === 0 ? 'Grantor' : 'Grantee',
      id: idx === 0 ? 'DL123456789' : 'PENDING',
      idType: idx === 0 ? 'Driver License' : 'ID Pending',
      idVerified: idx === 0 ? true : false,
    })) || [];

    setJournal(prev => ({
      ...prev,
      actType: actFromWork?.type || fullInfo.certificateActType || '',
      dateTime: actFromWork
        ? `${actFromWork.dateTime} ${actFromWork.time} ${actFromWork.timezone}`
        : fullInfo.date || '',
      signers: signersList,
    }));

    const state = actFromWork?.state || fullInfo.state || '';
    setThumbprintRequired(state === 'California')

  }, [id]);

  useEffect(() => {
    const hasFee = journal.fee !== null;
    const hasLocation = journal.location.trim().length > 0;
    const hasThumbprint = thumbprintRequired ? journal.thumbprint !== null : true;
    const allMandatoryFilled = hasFee && hasLocation && hasThumbprint;
    setCompliancePassed(allMandatoryFilled);
  }, [journal.fee, journal.location, journal.thumbprint, thumbprintRequired]);

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setJournal(prev => ({ ...prev, fee: null }));
    } else {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        setJournal(prev => ({ ...prev, fee: num }));
      }
    }
  };

  const handleThumbprintCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setJournal(prev => ({
            ...prev,
            thumbprint: file,
            thumbprintPreview: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSignatureRecapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setJournal(prev => ({
            ...prev,
            signatureRecapture: file,
            signaturePreview: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSave = () => {
    if (!compliancePassed) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      console.log('Journal saved:', journal);
      setIsSaving(false);
      setShowSuccessModal(true);
    }, 1500);
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
          <ActMenu />
          <div className="p-8 flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 r">
              <Link to="/notary-acts">NOTARIAL ACTS LIST</Link>
              <span className="ml-10"><ChevronRight size={16} /></span>
              <span className="text-blue-600">JOURNAL ENTRY</span>
            </div>
          </div>

          <div className="px-8">
            {/* Header */}
            <div className="">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Journal Entry</h1>
            </div>
            {/* Top */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column*/}
              <div className="lg:col-span-2 space-y-6">
                {/* Auto-Populated Fields Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Auto-Populated Fields
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-black   mb-1">
                          Date and Time
                        </label>
                        <input
                          type="text"
                          value={journal.dateTime || 'N/A'}
                          disabled
                          className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-800 font-semibold cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-black   mb-1">
                          Act Type
                        </label>
                        <input
                          type="text"
                          value={journal.actType || 'N/A'}
                          disabled
                          className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-800 font-semibold cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-600   mb-1">
                        Signer Information
                      </label>
                      <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 text-sm text-gray-700 min-h-[80px]">
                        {journal.signers.length > 0 ? (
                          <ul className="space-y-1">
                            {journal.signers.map((signer, idx) => (
                              <li key={idx}>
                                <span className="font-semibold">{signer.name}</span> ({signer.role}) - ID: {signer.id}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-black">No signer data available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Manual Fields Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Manual Fields</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-black   mb-1">Fee Charged ($)</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <DollarSign size={16} className="text-gray-400" />
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="$15.00"
                          onWheel={(e) => (e.target as HTMLInputElement).blur()}
                          value={journal.fee === null ? '' : journal.fee}
                          onChange={handleFeeChange}
                          className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black   mb-1">Location of Act</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <MapPin size={16} className="text-gray-400" />
                        </span>
                        <input
                          type="text"
                          placeholder="Enter act location..."
                          value={journal.location}
                          onChange={(e) => setJournal(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black   mb-1">Notary Notes & Statutory Disclosures</label>
                      <textarea
                        rows={4}
                        placeholder="Enter any additional notes for the journal entry..."
                        value={journal.notes}
                        onChange={(e) => setJournal(prev => ({ ...prev, notes: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                      />
                    </div>
                  </div>
                </div>

                {/* Signature & Thumbprint: 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Left: Signer Signature */}
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-900">Signer Signature</h2>
                      <button
                        onClick={handleSignatureRecapture}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-bold  text-blue-700 hover:bg-blue-200 transition"
                      >
                        <RefreshCw size={12} />
                        RECAPTURE
                      </button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-22 text-center bg-gray-50 min-h-[150px] flex flex-col items-center justify-center">
                      {journal.signaturePreview ? (
                        <div className="relative">
                          <img src={journal.signaturePreview} alt="Signature" className="max-h-24 mx-auto" />
                          <button
                            onClick={() => setJournal(prev => ({ ...prev, signatureRecapture: null, signaturePreview: undefined }))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <PenTool size={32} className="text-gray-400 mb-2" />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right: Signer Thumbprint */}
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-bold text-gray-900">Signer Thumbprint</h2>
                      {thumbprintRequired && (
                        <span className="text-sm text-red-500 font-medium">Required</span>
                      )}
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-15 text-center bg-gray-50 min-h-[150px] flex flex-col items-center justify-center">
                      {journal.thumbprintPreview ? (
                        <div className="relative">
                          <img src={journal.thumbprintPreview} alt="Thumbprint" className="w-24 h-24 object-contain mx-auto" />
                          <button
                            onClick={() => setJournal(prev => ({ ...prev, thumbprint: null, thumbprintPreview: undefined }))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Fingerprint size={32} className="text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 mb-2 uppercase font-bold">THUMBPRINT AREA</p>
                          <button
                            onClick={handleThumbprintCapture}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-1.5 bg-white text-blue-500 font-bold text-sm hover:bg-blue-50 transition"
                          >
                            Capture Print
                          </button>
                        </>
                      )}
                    </div>
                    {thumbprintRequired && !journal.thumbprintPreview && (
                      <p className="text-sm text-amber-600 mt-2">Thumbprint is required for this state</p>
                    )}
                  </div>
                </div>

                {/* Journal Compliance Check Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Journal Compliance Check</h2>
                  <div className="flex items-center gap-2">
                    {compliancePassed ? (
                      <CheckCircle2 size={20} className="text-emerald-500" />
                    ) : (
                      <AlertTriangle size={20} className="text-amber-500" />
                    )}
                    <span className="text-sm font-semibold text-gray-700">
                      Compliance Status: {compliancePassed ? 'All requirements met' : 'Missing required fields'}
                    </span>
                  </div>
                  {showWarning && !compliancePassed && (
                    <div className="mt-2 p-2 bg-amber-50 text-amber-700 text-sm rounded-md flex items-center gap-1">
                      <AlertTriangle size={14} />
                      Please fill in all mandatory fields (Fee, Location, {thumbprintRequired ? 'Thumbprint' : ''}) before saving.
                    </div>
                  )}
                  <hr className="my-4 border-gray-200" />
                  <div>
                    <p className="text-sm text-gray-600">
                      This entry will be automatically recorded in your <Link to="#" className="text-blue-600  no-underline font-bold">
                        Master Notary Journal
                      </Link>.
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-between items-center mt-8">
                  <Link
                    to={`/notary-acts/${id}/certificate`}
                    className="inline-flex items-center px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </Link>
                  <button
                    onClick={handleSave}
                    disabled={!compliancePassed || isSaving}
                    className={`px-8 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold transition-all ${compliancePassed && !isSaving
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Saving...
                      </>
                    ) : (
                      'Save Journal Entry'
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Compliance Sidebar */}
              <div className="">
                <div className="">
                  {/* Compliance Details */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                    <div>
                      <h2 className="flex items-center justify-start gap-2 text-xl font-bold text-gray-900 mb-4">
                        <ListChecks className="text-blue-500" size={18} />
                        Compliance Details
                      </h2>

                      <div className="flex gap-4">
                        <ul className="space-y-4 text-sm text-gray-700">
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-emerald-500 mt-0.5" size={18} />
                            <div>
                              <b className="block text-gray-900">Identity Verification</b>
                              <p className="text-black text-sm">Verified via Real-Time ID Check</p>
                            </div>
                          </li>

                          <li className="flex items-start gap-3">
                            {compliancePassed ? (
                              <CheckCircle2 className="text-emerald-500 mt-0.5" size={18} />
                            ) : (
                              <AlertTriangle className="text-amber-500 mt-0.5" size={18} />
                            )}
                            <div>
                              <b className="block text-gray-900">Mandatory Fields</b>
                              <span className="block text-black text-sm">
                                {compliancePassed ? 'All required inputs completed' : 'Missing required fields'}
                              </span>
                            </div>
                          </li>

                          <li className="flex items-start gap-3">
                            <div className="border-2 border-amber-400 rounded-full p-0.5 mt-0.5">
                              <MoreHorizontal className="text-amber-400" size={14} />
                            </div>
                            <div>
                              <b className="block text-amber-600">Final Notary Seal</b>
                              <span className="block text-amber-500 text-sm">Pending final submission</span>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-blue-100 border border-blue-300 rounded-xl p-6 mt-6">
                        <label className="text-blue-600  text-sm font-bold">State statute reference</label>
                        <p className="text-sm text-blue-700 mt-1">
                          "Notary shall record in the sequential journal the date, time, and type of each official act." - GC $8206
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Print Registry Slip */}
                  <div
                    onClick={() => alert('Print feature will be implemented')}
                    className="flex items-center w-full p-4 mt-4 border border-gray-300 rounded-xl justify-between hover:bg-gray-50 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2">
                      <Printer size={16} />
                      <span className="text-sm font-medium">Print Registry Slip</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Journal Entry Saved</h3>
            <p className="text-sm text-gray-600 mb-6">
              The journal entry has been successfully recorded in your <Link to="#" className="text-blue-600 underline">
                Master Notary Journal
              </Link>.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                window.location.href = `/notary-acts/${id}`;
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2"
            >
              Go to Overview
            </button>
          </div>
        </div>
      )}
    </>
  );
};