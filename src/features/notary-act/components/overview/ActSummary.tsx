import { useParams } from 'react-router-dom';
import { useAct } from '../../hooks/useAct';

export const ActSummary = () => {
  const { id } = useParams();
  const { act } = useAct(id);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </span>
        Act Summary
      </h2>

      <div className="grid grid-cols-2 gap-y-6 gap-x-12 px-2">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">ACT TYPE</p>
          <p className="text-sm font-semibold text-gray-900">{act?.type || 'Acknowledgment of Signature'}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">FILING DATE</p>
          <p className="text-sm font-semibold text-gray-900">{act?.dateTime || 'October 24, 2023'}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">JURISDICTION</p>
          <p className="text-sm font-semibold text-gray-900">{act?.state ? `${act.state} County` : 'Los Angeles County, CA'}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">ASSIGNED NOTARY</p>
          <p className="text-sm font-semibold text-gray-900">{act ? 'Sarah Jenkins' : 'Sarah Jenkins (ID: 982451)'}</p>
        </div>
      </div>
    </div>
  );
};
