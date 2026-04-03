import { AlertTriangle, ChevronRight, LockKeyhole, Save, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getFullActInfo, mockActDetails } from "../api/mockActDetails";
import { mockActs } from "../api/mockData";
import { ActMenu } from "../components/overview/ActMenu";
import { useAct } from "../hooks/useAct";
import { saveCertificateToMockDB } from "../api/mockActDetails";

export const ActCertificatePage = () => {
    const { id } = useParams();
    const location = useLocation();

    const [actInfo, setActInfo] = useState<any>(null);
    // const [selectedActType, setSelectedActType] = useState('');
    // const [selectedState, setSelectedState] = useState('');
    // const [venue, setVenue] = useState('');
    // const [date, setDate] = useState('');
    // const [signers, setSigners] = useState<string[]>([]);
    // const [sealType, setSealType] = useState<'physical' | 'electronic'>('physical');
    const [isEditingVenue, setIsEditingVenue] = useState(false);
    const [isEditingDate, setIsEditingDate] = useState(false);
    const [showFinalizeWarning, setShowFinalizeWarning] = useState(false);
    const [isFinalizing, setIsFinalizing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { state, dispatch } = useAct();
    useEffect(() => {
        if (!id) return;
        const fullInfo = getFullActInfo(id);
        if (fullInfo) {
            setActInfo(fullInfo);

            dispatch({ type: "SET_VENUE", payload: fullInfo.venue })
            dispatch({ type: "SET_DATE", payload: fullInfo.date })
            dispatch({ type: "SET_SIGNERS", payload: fullInfo.signers })
            dispatch({ type: "SET_ACT_TYPE", payload: fullInfo.type });
            dispatch({ type: "SET_STATE", payload: fullInfo.state })
            // const actFromWork = mockActs.find(a => a.id === id);
            // if (actFromWork) {
            //     setSelectedActType(actFromWork.type);
            //     setSelectedState(actFromWork.state);
            // } else {
            //     setSelectedActType(fullInfo.certificateActType);
            //     setSelectedState(fullInfo.state);
            // }
            // setVenue(fullInfo.venue);
            // setDate(fullInfo.date);
            // setSigners(fullInfo.signers);
        }
    }, [id]);

    // const tabs = [
    //     { label: 'Overview', path: `/notary-acts/${id}` },
    //     { label: 'Set up', path: `/notary-acts/${id}/setup` },
    //     { label: 'Signers and identity', path: `/notary-acts/${id}/signers` },
    //     { label: 'Execution', path: `/notary-acts/${id}/execution` },
    //     { label: 'Certificate', path: `/notary-acts/${id}/certificate` },
    //     { label: 'Journal Entry', path: `/notary-acts/${id}/journal` },
    //     { label: 'Status', path: `/notary-acts/${id}/status` },
    //     { label: 'Export', path: `/notary-acts/${id}/export` },
    // ];

    // const handleFinalize = () => {
    //     if (!showFinalizeWarning) {
    //         setShowFinalizeWarning(true);
    //         return;
    //     }
    //     setIsFinalizing(true);
    //     setTimeout(() => {
    //         console.log('Act finalized and locked');
    //         setIsFinalizing(false);
    //         setShowFinalizeWarning(false);
    //         setShowSuccessModal(true);
    //     }, 2000);
    // };
    const handleFinalize = () => {
        if (!id) return;

        setIsFinalizing(true);

        setTimeout(() => {
            saveCertificateToMockDB(id, {
                venue: state.venue,
                date: state.date,
                signers: state.signers,
                sealType: state.sealType
            });

            dispatch({ type: "FINALIZE" });

            setIsFinalizing(false);
            setShowSuccessModal(true);
        }, 800);
    };
    console.log(mockActDetails[id]);
    const actTypeOptions = useMemo(() => {
        return [...new Set(mockActs.map(act => act.type))];
    }, []);

    const stateOptions = useMemo(() => {
        return [...new Set(mockActs.map(act => act.state))];
    }, []);

    const handleViewDrafts = () => {
        alert('View drafts feature will be implemented.');
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
                    <div className="mb-6">
                        {/* menu */}
                        {/* <div className="flex items-center justify-around mb-3 bg-white ">
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

                        </div> */}
                        <ActMenu />

                        {/* Bread */}
                        <div className="px-8 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 r">
                                <Link to="/notary-acts">NOTARIAL ACTS LIST</Link>
                                <span className="ml-10"><ChevronRight size={16} /></span>
                                <span className="text-blue-600">CERTIFICATE & SEAL GENERATION</span>
                            </div>
                
                            <div className="flex gap-3">
                                <button
                                    onClick={handleViewDrafts}
                                    className="px-4 py-2 text-sm font-bold items-center flex gap-2 cursor-pointer hover:bg-blue-500 hover:text-white hover:rounded-xl active:scale-95 transition"
                                >
                                    <Save />
                                    Drafts
                                </button>
                                <button
                                    className="px-3 py-3 text-sm font-bold items-center bg-blue-500 rounded-xl flex gap-2 cursor-pointer hover:shadow-sm text-white active:scale-95 transition"
                                    onClick={handleFinalize}
                                    disabled={isFinalizing}
                                >
                                    {isFinalizing ? (
                                        <>
                                            Finalizing
                                            <div className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.1s]"></span>
                                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <LockKeyhole />
                                            Finalize & Lock
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {showFinalizeWarning && !isFinalizing && (
                            <div className="mt-2 px-4 flex items-center gap-2 text-amber-600 text-xs bg-amber-50 p-2 rounded-lg">
                                <AlertTriangle size={14} />
                                <span>Once locked, the record is immutable and cannot be modified.</span>
                                <button
                                    onClick={handleFinalize}
                                    className="ml-auto text-xs font-bold text-amber-700 underline"
                                >
                                    Confirm Lock
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Main content */}
                    <div className="bg-white p-8 border-t-2 border-b-2 border-black-200">
                        <div className="text-2xl font-extrabold text-gray-900 mb-6">Notarial Certificate and Seal</div>
                        <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm space-y-8">
                            {/* Certificate Template */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900  mb-4">
                                    Certificate Template
                                </h2>
                                <div className="grid grid-cols-2 gap-6 w-full">
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-1.5">Act Type</label>
                                        <select
                                            value={state.actType}
                                            onChange={(e) => dispatch({ type: "SET_ACT_TYPE", payload: e.target.value})
                                            }
                                            className=" w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold"
                                        >
                                            {actTypeOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-1.5">State</label>
                                        <select
                                            value={state.state}
                                            onChange={(e) => dispatch({ type: "SET_STATE", payload: e.target.value })}
                                            className=" w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 "
                                        >
                                            {stateOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-3 p-3 ">
                                    Template automatically selected based on Act Type and State.
                                </div>
                            </div>


                            {/* Editable Fields */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900  mb-4">Editable Fields</h2>
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Venue */}
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-1.5">Venue</label>
                                        {isEditingVenue ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={state.venue}
                                                    onChange={(e) =>
                                                        dispatch({ type: "SET_VENUE", payload: e.target.value })
                                                    }
                                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => setIsEditingVenue(false)}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 cursor-pointer"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center group">
                                                <p className="text-sm font-medium text-gray-900 bg-gray-50 px-4 py-3 rounded-xl w-full border border-gray-200">{state.venue}</p>
                                                <button
                                                    onClick={() => setIsEditingVenue(true)}
                                                    className="cursor-pointer text-xs text-blue-600 hover:text-blue-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="block text-sm font-bold text-black  mb-1.5">Date</label>
                                        {isEditingDate ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="date"
                                                    value={state.date}
                                                    onChange={(e) =>
                                                        dispatch({ type: "SET_DATE", payload: e.target.value })
                                                    }
                                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => setIsEditingDate(false)}
                                                    className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center group">
                                                <p className="text-sm font-medium text-gray-900 bg-gray-50 px-4 py-3 rounded-xl w-full border border-gray-200">{state.date}</p>
                                                <button
                                                    onClick={() => setIsEditingDate(true)}
                                                    className=" cursor-pointer text-xs text-blue-600 hover:text-blue-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Names of Signers */}
                                <div className="mt-6">
                                    <label className="block text-sm font-bold text-gray-500  mb-1.5">Names of Signers</label>
                                    <div className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-3 transition-all hover:bg-gray-100/70">
                                        <p className="text-sm font-medium text-gray-900">{state.signers.join(', ')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Seal Application */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900  mb-4">Seal Application</h2>
                                <div className="space-y-4">
                                    <div className="">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="sealType"
                                                checked={state.sealType === 'physical'}
                                                onChange={() => dispatch({ type: "SET_SEAL_TYPE", payload: "physical" })}
                                                className="hidden peer"
                                            />
                                            <div className="w-4 h-4 rounded-full border border-gray-300 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all" />
                                            <span className="text-sm font-medium text-gray-700">Physical Seal Reference</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="sealType"
                                                checked={state.sealType === 'electronic'}
                                                onChange={() =>
                                                    dispatch({ type: "SET_SEAL_TYPE", payload: "electronic" })
                                                } className="hidden peer"
                                            />
                                            <div className="w-4 h-4 rounded-full border border-gray-300 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all" />
                                            <span className="text-sm font-medium text-gray-700">Electronic Seal (eSeal) / Digital Certificate</span>
                                        </label>
                                    </div>
                                    <div className="mt-4 p-20 border-1 border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center space-y-4">
                                        <p className="text-xs font-bold text-gray-500 r">SEAL PLACEMENT AREA PLACEHOLDER</p>
                                        <div className="w-56 h-24 border-2 border-dashed border-gray-400 rounded-lg bg-white flex items-center justify-center">
                                            <span className="text-sm font-bold text-gray-500">NOTARY SEAL</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Preview */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900  mb-4">Preview</h2>
                            </div>

                            <hr className="my-6" />

                            {/* Footer */}
                            <div className="flex justify-between items-center">
                                <Link
                                    to={`/notary-acts/${id}/execution`}
                                    className="inline-flex items-center px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </Link>
                                <div >
                                    <button
                                        onClick={handleFinalize}
                                        disabled={isFinalizing}
                                        className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-md active:scale-95"
                                    >
                                        {isFinalizing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                Finalizing...
                                            </>
                                        ) : (
                                            <>
                                                <LockKeyhole size={16} />
                                                Finalize and Lock Record
                                            </>

                                        )}
                                    </button>
                                    <p className="ml-auto text-right text-xs p-2">Once locked, the record is immutable</p>
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
                                <LockKeyhole className="w-6 h-6 text-green-600" />
                            </div>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Record Finalized & Locked</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            The notarial act has been successfully finalized and locked. The document is now immutable and permanently sealed.
                        </p>
                        <button
                            onClick={() => {
                                setShowSuccessModal(false);
                                // Điều hướng về trang overview của act này
                                window.location.href = `/notary-acts/${id}`;
                            }}
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2"
                        >
                            <LockKeyhole size={16} />
                            Go to Overview
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};