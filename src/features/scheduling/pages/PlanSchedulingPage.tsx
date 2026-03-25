    import React, { useState } from "react";
    import { Sidebar } from "../components/Sidebar";
    import { TopBar } from "../components/TopBar";
    import { CreateJob } from "../components/CreateJob";
    import { JobList } from "../components/JobList";
    import { MasterCalendar } from "../components/MasterCalendar";
    import { Dispatch } from "../components/Dispatch";
    import { JobDetail } from "../components/JobDetail";

    type Tab = "create" | "list" | "calendar" | "dispatch" | "detail" | "timeline";

    const TABS: { key: Tab; label: string }[] = [
    { key: "create", label: "Create job" },
    { key: "list", label: "Job list" },
    { key: "calendar", label: "Master calendar" },
    { key: "dispatch", label: "Dispatch" },
    { key: "detail", label: "Job detail" },
    { key: "timeline", label: "Timeline" },
    ];

    export const PlanSchedulingPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>("create");
    const [sidebarActive, setSidebarActive] = useState("job-request");

    const renderContent = () => {
        switch (activeTab) {
        case "create":
            return <CreateJob onCancel={() => setActiveTab("list")} />;
        case "list":
            return <JobList />;
        case "calendar":
            return <MasterCalendar />;
        case "dispatch":
            return <Dispatch />;
        case "detail":
            return <JobDetail />;
        case "timeline":
            return (
            <div className="flex items-center justify-center h-full text-gray-300">
                <div className="text-center">
                <div className="text-5xl mb-3">⏱</div>
                <p className="text-lg font-semibold">Timeline</p>
                <p className="text-sm mt-1">Timeline view coming soon</p>
                </div>
            </div>
            );
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
        <Sidebar active={sidebarActive} onSelect={setSidebarActive} />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
            <TopBar />

            {/* Tabs */}
            <div className="flex items-center gap-1 px-6 pt-4 pb-0 bg-white border-b border-gray-100 flex-shrink-0">
            {TABS.map((tab) => {
                const isActive = tab.key === activeTab;
                return (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative px-4 py-3 text-sm font-semibold transition-all duration-200 rounded-t-xl ${
                    isActive
                        ? "text-blue-600 bg-blue-50/60"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                >
                    {tab.label}
                    {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                </button>
                );
            })}
            </div>

            {/* Page content */}
            <main className="flex-1 overflow-y-auto p-6">
            {renderContent()}
            </main>
        </div>
        </div>
    );
    };