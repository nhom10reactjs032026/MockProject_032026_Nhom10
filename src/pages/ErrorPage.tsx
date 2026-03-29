import { useRouteError, useNavigate, isRouteErrorResponse } from "react-router-dom";
import { AlertCircle, Home, RefreshCcw, ArrowLeft } from "lucide-react";

export function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    let errorMessage: string;
    let errorStatus: number | string = "Unknown";

    if (isRouteErrorResponse(error)) {
        // error is type `ErrorResponse`
        errorMessage = error.data?.message || error.statusText;
        errorStatus = error.status;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === "string") {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = "An unexpected error occurred.";
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col items-center p-8 text-center animate-in fade-in zoom-in duration-500">

                    {/* Error Status Badge */}
                    <div className="mb-6 p-4 bg-red-50 rounded-2xl">
                        <AlertCircle className="w-12 h-12 text-red-500" />
                    </div>

                    <h1 className="text-7xl font-black text-slate-900 mb-2">
                        {errorStatus}
                    </h1>

                    <h2 className="text-2xl font-bold text-slate-800 mb-4">
                        Oops! Something went wrong
                    </h2>

                    <p className="text-slate-500 mb-8 leading-relaxed">
                        {errorMessage === "Not Found"
                            ? "We couldn't find the page you're looking for. It might have been moved or deleted."
                            : errorMessage}
                    </p>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all active:scale-95"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
                        >
                            <Home className="w-4 h-4" />
                            Home Page
                        </button>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 text-slate-400 hover:text-indigo-600 flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                        <RefreshCcw className="w-3 h-3" />
                        Try refreshing the page
                    </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-1/4 right-1/4 -z-10 w-64 h-64 bg-slate-200/50 rounded-full blur-3xl opacity-30" />
            </div>
        </div>
    );
}
