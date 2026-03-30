import { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { 
  MapPin, 
  UserCheck, 
  PenTool, 
  Lock, 
  AlignLeft,
  CheckCircle2,
  LockKeyhole,
  UploadCloud
} from 'lucide-react';

export const ActExecutionPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const [isVerified, setIsVerified] = useState(true);
  const [oathStatus, setOathStatus] = useState<'yes'|'no'>('yes');
  const [hasSignature1, setHasSignature1] = useState(true);
  const [hasSignature2, setHasSignature2] = useState(false);
  const [wetSignature1, setWetSignature1] = useState<string | null>(null);
  const [wetSignature2, setWetSignature2] = useState<string | null>(null);

  const tabs = [
    { label: 'Overview', path: `/notary-acts/${id}` },
    { label: 'Set up', path: `/notary-acts/${id}/setup` },
    { label: 'Signers and identity', path: `/notary-acts/${id}/signers` },
    { label: 'Execution', path: `/notary-acts/${id}/execution` },
    { label: 'Certificate', path: `/notary-acts/${id}/certificate` },
    { label: 'Journal Entry', path: `/notary-acts/${id}/journal` },
    { label: 'Status', path: `/notary-acts/${id}/status` },
    { label: 'Export', path: `/notary-acts/${id}/export` },
  ];

  return (
    <div className="animate-in fade-in duration-500 bg-[#f8fbff]/30 min-h-screen pb-12">
      <div className="max-w-[1400px] mx-auto py-8">
        {/* Header exact match with the screenshot */}
        <div className="mb-6">
          <div className="flex items-center gap-8 border-b border-gray-100 px-8 mb-6 overflow-x-auto whitespace-nowrap">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.label}
                  to={tab.path}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          <div className="px-8 flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <Link to="/notary-acts" className="cursor-pointer hover:text-gray-600 transition-colors">NOTARIAL ACTS LIST</Link>
              <span>›</span>
              <span className="text-blue-600">EXCUTION ACT</span>
            </div>
            
            <button className="px-6 py-2 bg-rose-500 hover:bg-rose-600 transition-colors text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-md">
              <Lock size={16} />
              Record
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="px-8 max-w-4xl mx-auto space-y-6">
          
          {/* Row 1: Forms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Appearance */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div className="w-full">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Personal Appearance</h3>
                  <p className="text-xs text-gray-500 mt-1">Confirm physical presence of principal.</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Toggle Switch */}
                      <div 
                        onClick={() => setIsVerified(!isVerified)}
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors relative flex items-center ${isVerified ? 'bg-violet-600' : 'bg-gray-300'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all ${isVerified ? 'right-1' : 'left-1'}`}></div>
                      </div>
                      <span className={`text-sm font-bold ${isVerified ? 'text-violet-700' : 'text-gray-500'}`}>
                        {isVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Oath/Affirmation */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <UserCheck size={20} />
                </div>
                <div className="w-full">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Oath/Affirmation</h3>
                  <p className="text-xs text-gray-500 mt-1">Administered according to law?</p>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <button 
                      onClick={() => setOathStatus('yes')}
                      className={`flex-1 py-1.5 font-bold text-sm rounded-lg transition-colors shadow-sm border-2 ${
                        oathStatus === 'yes' 
                          ? 'bg-violet-50 border-violet-600 text-violet-700' 
                          : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      Yes
                    </button>
                    <button 
                      onClick={() => setOathStatus('no')}
                      className={`flex-1 py-1.5 font-bold text-sm rounded-lg transition-colors shadow-sm border-2 ${
                        oathStatus === 'no' 
                          ? 'bg-rose-50 border-rose-500 text-rose-600' 
                          : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Signature Capture */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                <PenTool size={18} className="text-blue-600" />
                Signature Capture
              </h2>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-100">
                Verified Identity
              </span>
            </div>

            {/* Signer Block 1 */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900">Alice Wonderland</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 mb-4">GRANTOR</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">WET SIGNATURE UPLOAD</label>
                  <label className="h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors relative block w-full">
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setWetSignature1(e.target.files[0].name);
                        }
                      }}
                    />
                    {wetSignature1 ? (
                      <div className="flex flex-col items-center p-2">
                        <CheckCircle2 size={24} className="text-emerald-500 mb-2" />
                        <p className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{wetSignature1}</p>
                        <p className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest mt-2" onClick={(e) => { e.preventDefault(); setWetSignature1(null); }}>REMOVE</p>
                      </div>
                    ) : (
                      <>
                        <UploadCloud size={24} className="text-gray-400 mb-2" />
                        <p className="text-sm font-bold text-gray-700">Upload scan</p>
                        <p className="text-[10px] font-bold text-gray-400 tracking-wider">PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </label>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">ELECTRONIC SIGNATURE</label>
                    <button 
                      onClick={() => setHasSignature1(!hasSignature1)}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest"
                    >
                      {hasSignature1 ? 'CLEAR' : 'RE-SIGN'}
                    </button>
                  </div>
                  <div className="h-32 border-2 border-gray-100 rounded-xl bg-white flex flex-col items-center justify-center relative overflow-hidden group hover:border-blue-200 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                      <span className="font-black text-2xl -rotate-12 whitespace-nowrap">NOTARY DIGITAL</span>
                    </div>
                    {/* Placeholder signature */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                      {hasSignature1 ? (
                        <span style={{ fontFamily: 'cursive' }} className="text-3xl font-light text-slate-800">Alice Wonderland</span>
                      ) : (
                        <div className="w-full h-full border-b border-gray-100 flex items-end justify-center pb-2"></div>
                      )}
                    </div>
                    <div className="absolute bottom-2 w-full text-center">
                      <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">SIGN ABOVE</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Signer Block 2 (Repeated in Mockup) */}
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Jhon Doe</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 mb-4">GRANTEE</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">WET SIGNATURE UPLOAD</label>
                  <label className="h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors relative block w-full">
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setWetSignature2(e.target.files[0].name);
                        }
                      }}
                    />
                    {wetSignature2 ? (
                      <div className="flex flex-col items-center p-2">
                        <CheckCircle2 size={24} className="text-emerald-500 mb-2" />
                        <p className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{wetSignature2}</p>
                        <p className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest mt-2" onClick={(e) => { e.preventDefault(); setWetSignature2(null); }}>REMOVE</p>
                      </div>
                    ) : (
                      <>
                        <UploadCloud size={24} className="text-gray-400 mb-2" />
                        <p className="text-sm font-bold text-gray-700">Upload scan</p>
                        <p className="text-[10px] font-bold text-gray-400 tracking-wider">PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </label>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">ELECTRONIC SIGNATURE</label>
                    <button 
                      onClick={() => setHasSignature2(!hasSignature2)}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest"
                    >
                      {hasSignature2 ? 'CLEAR' : 'RE-SIGN'}
                    </button>
                  </div>
                  <div className="h-32 border-2 border-gray-100 rounded-xl bg-white flex flex-col items-center justify-center relative overflow-hidden group hover:border-blue-200 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                      <span className="font-black text-2xl -rotate-12 whitespace-nowrap">NOTARY DIGITAL</span>
                    </div>
                    {/* Placeholder stroke line for sign */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                      {hasSignature2 ? (
                        <span style={{ fontFamily: 'cursive' }} className="text-3xl font-light text-slate-800">Jhon Doe</span>
                      ) : (
                        <div className="w-full h-full border-b border-gray-100 flex items-end justify-center pb-2"></div>
                      )}
                    </div>
                    <div className="absolute bottom-2 w-full text-center">
                      <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">SIGN ABOVE</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Row 3: Date and Time Lock */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <LockKeyhole size={18} className="text-blue-600" />
              Date and Time Lock
            </h2>
            <div className="relative w-full border border-gray-200 rounded-xl overflow-hidden flex bg-white focus-within:ring-2 focus-within:ring-blue-500">
              <input 
                type="text" 
                defaultValue="2023-10-27 11:30 AM" 
                className="flex-1 bg-transparent px-4 py-3 text-sm font-bold text-gray-700 outline-none"
              />
              <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 text-sm font-bold transition-colors">
                <Lock size={16} />
                Lock
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-3 font-medium">Date and time will be locked upon completion of the act.</p>
          </div>

          {/* Row 4: Notes and Observations */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <AlignLeft size={18} className="text-blue-600" />
              Notes and Observations
            </h2>
            
            <textarea 
              placeholder="Enter session details, principal capacity, or irregularities..."
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 resize-none h-32"
            ></textarea>
            
            <div className="mt-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
              <span className="text-gray-400 flex items-center gap-1.5"><UploadCloud size={14} /> AUTO-SAVED</span>
              <span className="text-emerald-500 flex items-center gap-1.5"><CheckCircle2 size={14} /> JOURNAL COMPLIANT</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 pb-8">
            <button className="w-full sm:flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_14px_-4px_rgba(37,99,235,0.4)]">
              <CheckCircle2 size={18} />
              Complete & Finalize Act
            </button>
            <button className="w-full sm:flex-1 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm">
              Save for Later
            </button>
          </div>

          <div className="text-center pb-8 border-t border-gray-100 pt-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex justify-center items-center gap-1.5">
              <Lock size={12} /> Encrypted End-to-End Session
            </p>
            <p className="text-[9px] font-bold text-gray-400 mt-2 tracking-wider">Session started: Oct 24, 2023 at 2:15 PM EST • Local Device Time</p>
          </div>

        </div>
      </div>
    </div>
  );
};
