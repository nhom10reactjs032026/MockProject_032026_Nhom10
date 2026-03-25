import { useState } from 'react';
import { Maximize2, FileText, Minimize2 } from 'lucide-react';

export const DocumentPreview = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="bg-[#111827] rounded-3xl p-6 shadow-xl relative overflow-hidden group">
        {/* Decorative gradient blur */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="flex items-center gap-2 mb-8 relative z-10 text-gray-400">
          <FileText size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Document Preview</span>
        </div>

        <div className="space-y-4 mb-10 relative z-10">
          <div className="w-3/4 h-2.5 bg-gray-700/50 rounded-full"></div>
          <div className="w-full h-2.5 bg-gray-700/50 rounded-full"></div>
          <div className="w-full h-2.5 bg-gray-700/50 rounded-full"></div>
          <div className="w-5/6 h-2.5 bg-gray-700/50 rounded-full"></div>
          <div className="w-2/3 h-2.5 bg-gray-700/50 rounded-full"></div>
        </div>

        <div className="flex justify-between items-end relative z-10 mb-8 mt-12">
          <div className="w-24 h-10 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest text-center px-2">NOTARY SEAL</span>
          </div>
          <div className="text-right">
            <div className="w-32 h-6 border-b border-gray-600 mb-2 flex items-end justify-center pb-1">
              <span style={{ fontFamily: 'cursive' }} className="text-gray-300 text-lg leading-none italic opacity-60">Sarah Jenkins</span>
            </div>
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Digital Signature applied</span>
          </div>
        </div>

        <button 
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 transition-colors text-white rounded-xl backdrop-blur-md font-bold text-xs"
        >
          <Maximize2 size={16} />
          Expand Document
        </button>
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#111827] w-full max-w-4xl h-[80vh] rounded-3xl p-8 relative flex flex-col">
            <button 
              onClick={() => setIsExpanded(false)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <Minimize2 size={20} />
            </button>
            <div className="flex items-center gap-2 mb-8 text-gray-400">
              <FileText size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Document Preview - Expanded</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-2xl border border-gray-800 p-8 flex flex-col items-center justify-center text-center overflow-y-auto">
              {/* Giant Placeholder Document Content */}
              <FileText size={64} className="text-gray-700 mb-6" />
              <div className="w-full max-w-2xl space-y-6">
                <div className="h-6 w-1/3 bg-gray-800 rounded mx-auto mb-10"></div>
                <div className="h-3 w-full bg-gray-800 rounded"></div>
                <div className="h-3 w-11/12 bg-gray-800 rounded"></div>
                <div className="h-3 w-full bg-gray-800 rounded"></div>
                <div className="h-3 w-4/5 bg-gray-800 rounded"></div>
                <div className="h-3 w-full bg-gray-800 rounded mt-8"></div>
                <div className="h-3 w-full bg-gray-800 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-800 rounded"></div>
              </div>
              <div className="w-full max-w-2xl flex justify-between mt-20">
                 <div className="w-32 h-16 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center px-2">NOTARY SEAL</span>
                </div>
                <div className="text-right">
                  <div className="w-48 h-10 border-b border-gray-600 mb-2 flex items-end justify-center pb-1">
                    <span style={{ fontFamily: 'cursive' }} className="text-gray-300 text-3xl leading-none italic opacity-60">Sarah Jenkins</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Digital Signature applied</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
