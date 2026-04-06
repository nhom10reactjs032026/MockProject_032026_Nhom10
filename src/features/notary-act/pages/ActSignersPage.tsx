import { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import {
  UserPlus,
  CheckCircle2,
  Pencil,
  X,
=======
import { useAct } from '../hooks/useAct';
import { 
  UserPlus, 
  CheckCircle2, 
  Pencil, 
  X, 
>>>>>>> 9047337c604432794005721e21fd8061d69b2c93
  UploadCloud,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { ActMenu } from '../components/overview/ActMenu';

export const ActSignersPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const { act, isLoading } = useAct(id);
  const [verificationMethod, setVerificationMethod] = useState('physical');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const signerName = act?.clientName || 'Alice Wonderland';

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
            <span className="text-blue-600">SIGNERS AND IDENTITY</span>
          </div>
        </div> */}
        <ActMenu />

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
        <div className="px-8 max-w-6xl">
          {/* Content Container */}
          <div className="flex flex-col lg:flex-row gap-8">

            {/* LEFT COLUMN: Signer List */}
            <div className="w-full lg:w-1/3 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-gray-900">Signer List</h2>
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 shadow-sm transition-colors">
                  Add signer
                </button>
              </div>

              {/* Active Signer Card */}
              <div className="bg-white border-2 border-blue-100 p-4 rounded-xl shadow-[0_2px_10px_-4px_rgba(37,99,235,0.2)] cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{signerName}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">GRANTOR</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-50 border border-gray-200 text-gray-500 text-[9px] font-bold uppercase tracking-wider rounded">
                      Verified
                    </span>
                    <button className="text-gray-400 hover:text-blue-600 transition-colors"><Pencil size={14} /></button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors"><X size={16} /></button>
                  </div>
                </div>
              </div>

              {/* Add Placeholder */}
              <div className="border-2 border-dashed border-gray-200 p-6 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-colors group">
                <UserPlus size={24} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>

            {/* RIGHT COLUMN: Verification Details */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
<<<<<<< HEAD
                <h2 className="text-lg font-bold text-gray-900 mb-8">Identity Verification for Alice Wonderland</h2>
=======
                <h2 className="text-lg font-bold text-gray-900 mb-8">Identity Verification for {signerName}</h2>

>>>>>>> 9047337c604432794005721e21fd8061d69b2c93
                <div className="space-y-6">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">ID TYPE</label>
                      <select
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        defaultValue="State Driver's License"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: `right 1rem center`,
                          backgroundRepeat: `no-repeat`,
                          backgroundSize: `1.5em 1.5em`,
                        }}
                      >
                        <option>State Driver's License</option>
                        <option>Passport</option>
                        <option>State ID Card</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">ID NUMBER</label>
                      <input
                        type="text"
                        defaultValue="DL123456789"
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">ISSUING AUTHORITY</label>
                      <input
                        type="text"
                        defaultValue="California DMV"
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">EXPIRATION DATE</label>
                      <input
                        type="text"
                        defaultValue="12/31/2028"
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Verification Method */}
                  <div className="pt-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">VERIFICATION METHOD</label>
                    <div className="space-y-3">
                      <label
                        className={`flex items-center gap-3 cursor-pointer transition-opacity ${verificationMethod === 'physical' ? 'opacity-100' : 'opacity-50'}`}
                        onClick={() => setVerificationMethod('physical')}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${verificationMethod === 'physical' ? 'border-blue-600' : 'border-gray-300'}`}>
                          {verificationMethod === 'physical' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>}
                        </div>
                        <span className={`text-sm ${verificationMethod === 'physical' ? 'font-medium text-gray-900' : 'text-gray-600'}`}>Physical Presence</span>
                      </label>
                      <label
                        className={`flex items-center gap-3 cursor-pointer transition-opacity ${verificationMethod === 'ron' ? 'opacity-100' : 'opacity-50'}`}
                        onClick={() => setVerificationMethod('ron')}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${verificationMethod === 'ron' ? 'border-blue-600' : 'border-gray-300'}`}>
                          {verificationMethod === 'ron' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>}
                        </div>
                        <span className={`text-sm ${verificationMethod === 'ron' ? 'font-medium text-gray-900' : 'text-gray-600'}`}>Remote Online Notarization (KBA + ID Scan)</span>
                      </label>
                    </div>
                  </div>
                  {/* Attachments */}
                  <div className="pt-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">ATTACHMENTS</label>
                    <label className="border border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-gray-50 cursor-pointer transition-colors relative block w-full">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setUploadedFile(e.target.files[0].name);
                          }
                        }}
                      />
                      {uploadedFile ? (
                        <div className="flex flex-col items-center">
                          <CheckCircle2 size={24} className="text-emerald-500 mb-2" />
                          <p className="text-sm font-medium text-gray-900">{uploadedFile}</p>
                          <p className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest mt-2" onClick={(e) => { e.preventDefault(); setUploadedFile(null); }}>REMOVE</p>
                        </div>
                      ) : (
                        <>
                          <UploadCloud size={24} className="text-gray-400 mb-2" />
                          <p className="text-sm font-medium text-gray-500">
                            Drag and drop ID images here, or <span className="text-blue-600 hover:underline">Browse Files</span>
                          </p>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Compliance Validation */}
                  <div className="pt-4">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">COMPLIANCE VALIDATION</label>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                      <CheckCircle2 size={16} strokeWidth={2.5} />
                      Status: Valid
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 flex items-center justify-between">
            <Link
              to={`/notary-acts/${id}/setup`}
              className="px-6 py-2 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
            <Link
              to={`/notary-acts/${id}/execution`}
              className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-md"
            >
              Next
              <ArrowRight size={16} />
            </Link>
          </div>
<<<<<<< HEAD
=======

>>>>>>> 9047337c604432794005721e21fd8061d69b2c93
        </div>
        )}
      </div>
    </div>
  );
};
