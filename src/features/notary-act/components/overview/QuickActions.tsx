import { Link, useParams } from 'react-router-dom';
import { PlayCircle, Eye, Lock, ArrowRight } from 'lucide-react';

export const QuickActions = () => {
  const { id } = useParams();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
        Quick Actions
      </h2>

      <div className="space-y-3">
        <Link 
          to={`/notary-acts/${id}/setup`}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-violet-600 transition-colors text-white rounded-xl font-bold text-sm shadow-[0_4px_14px_-4px_rgba(37,99,235,0.4)]"
        >
          <PlayCircle size={18} />
          Continue Act
        </Link>
        
        <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 rounded-xl font-bold text-sm shadow-sm">
          <Eye size={18} className="text-gray-400" />
          View Draft Certificate
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-red-100 hover:bg-red-50 transition-colors text-red-600 rounded-xl font-bold text-sm shadow-sm">
          <Lock size={18} className="text-red-400" />
          Lock Record
        </button>
      </div>

      <div className="mt-6 text-center">
        <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors tracking-wide">
          <ArrowRight size={14} />
          Go to Full Audit Trail
        </a>
      </div>
    </div>
  );
};
