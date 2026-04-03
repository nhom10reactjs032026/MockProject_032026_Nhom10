import { Link, useLocation, useParams } from 'react-router-dom';

export const ActOverviewHeader = () => {
  const { id } = useParams();
  const location = useLocation();

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
    <div className="mb-6">
      {/* Sub Navigation */}
      <div className="flex items-center justify-around mb-3 bg-white ">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.label}
              to={tab.path}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${isActive
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
            >
              {tab.label}
            </Link>
          );
        })}

      </div>

      {/* Breadcrumb & Title */}
      <div className="px-4">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          <Link to="/notary-acts" className="cursor-pointer hover:text-gray-600 transition-colors">NOTARIAL ACTS LIST</Link>
          <span>›</span>
          <span className="text-blue-600">OVERVIEW</span>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">#ACT-94022</h1>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-widest">
              In progress
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">🔗</span>
            Linked Job: <a href="#" className="text-blue-600 hover:underline">#JOB-4421</a>
          </p>
        </div>
      </div>
    </div>
  );
};
