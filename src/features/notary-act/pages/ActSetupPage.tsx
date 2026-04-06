import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useAct } from '../hooks/useAct';
import { 
  CheckCircle2, 
  FileText, 
  MapPin, 
  Users, 
  ListChecks,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { ActMenu } from '../components/overview/ActMenu';

export const ActSetupPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const { act, isLoading } = useAct(id);
  const [actType, setActType] = useState('Acknowledgment');
  const [actions, setActions] = useState({ oath: true, thumbprint: false });

  useEffect(() => {
    if (act?.type) {
      if (['Acknowledgment', 'Jurat (Verification upon Oath)', 'Copy Certification'].includes(act.type)) {
        setActType(act.type);
      } else {
        setActType('Acknowledgment');
      }
    }
  }, [act]);

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
        {/* <div className="mb-6">
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

          <div className="px-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-8">
            <Link to="/notary-acts" className="cursor-pointer hover:text-gray-600 transition-colors">NOTARIAL ACTS LIST</Link>
            <span>›</span>
            <span className="text-blue-600">SET UP</span>
          </div>
        </div> */}
                        <ActMenu/>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
        <div className="px-8 max-w-5xl">
          {/* Form Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
             
            {/* LEFT COLUMN */}
            <div className="space-y-10">
              
              {/* Act Type Selection */}
              <section>
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-blue-600"><CheckCircle2 size={18} /></span>
                  Act Type Selection
                </h2>
                <div className="space-y-3">
                  {/* Act Types */}
                  {[
                    { id: 'Acknowledgment', desc: 'Signer declares they signed the document willingly.' },
                    { id: 'Jurat (Verification upon Oath)', desc: 'Signer swears the truth of document contents.' },
                    { id: 'Copy Certification', desc: 'Notary certifies the copy is a true reproduction.' }
                  ].map(type => (
                    <div 
                      key={type.id}
                      onClick={() => setActType(type.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-colors border ${
                        actType === type.id 
                          ? 'bg-violet-50/50 border-violet-200' 
                          : 'bg-white border-gray-100 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          actType === type.id 
                            ? 'bg-violet-600 border-4 border-violet-100' 
                            : 'border-2 border-slate-300'
                        }`}>
                          {actType === type.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{type.id}</p>
                          <p className="text-xs text-slate-500 mt-1">{type.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Document Info */}
              <section>
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-blue-600"><FileText size={18} /></span>
                  Document Info
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">DOCUMENT TITLE</label>
                    <input 
                      type="text" 
                      defaultValue={act?.reference || "Mortgage Agreement - Refinance"}
                      key={act?.reference || "default-ref"}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">NUMBER OF PAGES</label>
                    <input 
                      type="number" 
                      defaultValue="12"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </section>

            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-10">

              {/* State-Based Rules */}
              <section>
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-blue-600"><MapPin size={18} /></span>
                  State-Based Rules
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">SELECT STATE</label>
                    <select
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      defaultValue={act?.state || "California"}
                      key={act?.state || "default-state"}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: `right 1rem center`,
                        backgroundRepeat: `no-repeat`,
                        backgroundSize: `1.5em 1.5em`,
                      }}
                    >
                      <option value="California">California</option>
                      <option value="Texas">Texas</option>
                      <option value="New York">New York</option>
                    </select>
                  </div>
                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">DYNAMIC FIELDS FOR SELECTED STATE</p>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Pursuant to CA Civil Code § 1189, an acknowledgment must contain specific statutory wording. The California compliant certificate template will be applied.
                    </p>
                  </div>
                </div>
              </section>

              {/* Signer Count */}
              <section>
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-blue-600"><Users size={18} /></span>
                  Signer Count
                </h2>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">NUMBER OF SIGNERS</label>
                  <input 
                    type="number" 
                    defaultValue="2"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </section>

              {/* Required Actions */}
              <section>
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-blue-600"><ListChecks size={18} /></span>
                  Required Actions
                </h2>
                <div className="space-y-3">
                  <div 
                    onClick={() => setActions(prev => ({ ...prev, oath: !prev.oath }))}
                    className={`flex items-center gap-3 p-4 rounded-xl shadow-sm cursor-pointer transition-colors border ${
                      actions.oath ? 'bg-white border-gray-100' : 'bg-gray-50 border-transparent opacity-70'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                      actions.oath ? 'bg-violet-600 text-white' : 'bg-white border-2 border-gray-200'
                    }`}>
                      {actions.oath && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${actions.oath ? 'text-slate-900' : 'text-slate-700'}`}>Oath / Affirmation administration</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Mandatory for this act type</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setActions(prev => ({ ...prev, thumbprint: !prev.thumbprint }))}
                    className={`flex items-center gap-3 p-4 rounded-xl shadow-sm cursor-pointer transition-colors border ${
                      actions.thumbprint ? 'bg-white border-gray-100' : 'bg-gray-50 border-transparent opacity-70'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                      actions.thumbprint ? 'bg-violet-600 text-white' : 'bg-white border-2 border-gray-200'
                    }`}>
                      {actions.thumbprint && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${actions.thumbprint ? 'text-slate-900' : 'text-slate-700'}`}>Thumbprint required</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Required for CA Real Estate Docs</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
            <Link 
              to="/notary-acts" 
              className="px-6 py-2.5 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
            <Link 
              to={`/notary-acts/${id}/signers`}
              className="px-8 py-2.5 bg-blue-600 hover:bg-violet-600 transition-colors text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-[0_4px_14px_-4px_rgba(37,99,235,0.4)]"
            >
              Next
              <ArrowRight size={16} />
            </Link>
          </div>
          
        </div>
        )}
      </div>
    </div>
  );
};
