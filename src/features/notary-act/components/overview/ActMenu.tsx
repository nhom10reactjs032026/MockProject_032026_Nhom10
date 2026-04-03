import { Link, useLocation, useParams } from "react-router-dom";

export const ActMenu = () => {
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
        <>
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

        </>
    )
}