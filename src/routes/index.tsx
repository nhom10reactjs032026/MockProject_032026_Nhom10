import { createBrowserRouter, Outlet } from "react-router-dom";
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage";
import { ErrorPage } from "../pages/ErrorPage";

// Layout tổng của Admin
import { AdminLayout } from "../components/layout/AdminLayout";

// --- IMPORT MODULE SEAL ---
import { SealModuleLayout } from "@/features/security-management/pages/SealModuleLayout";
import SealDashboardPage from "@/features/security-management/pages/SealDashboardPage";
import SealDetailPage from "@/features/security-management/pages/SealDetailPage";
import { TraceabilityLayout } from "@/features/security-management/pages/TraceabilityLayout";
import { IncidentReportPage } from "@/features/security-management/pages/IncidentReportPage";
import { IncidentDetailPage } from "@/features/security-management/pages/IncidentDetailPage";
import { SealReplacementPage } from "@/features/security-management/pages/SealReplacementPage";
import { ReplacementPage } from "@/features/security-management/pages/ReplacementPage";
import { NotificationLogPage } from "@/features/security-management/pages/NotificationLogPage";
import { AuditCompliancePage } from "@/features/security-management/pages/AuditCompliancePage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "account/login", element: <LoginPage /> },

      // --- ADMIN ROUTES ---
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          // 1. Dashboard tổng
          {
            path: "dashboard",
            element: <div className="p-20 font-bold">🛠️ ADMIN DASHBOARD (PUBLIC)</div>
          },

          // 2. Quản lý khác
          { path: "users", element: <div className="p-20 font-bold">👥 USERS MANAGEMENT</div> },

          // 3. MODULE SEAL & DIGITAL SIGNATURE
          {
            path: "seals",
            element: <SealModuleLayout />,
            children: [
              { index: true, element: <SealDashboardPage /> },
              { path: "registry", element: <div className="p-20 font-bold">Registry Content</div> },
              { path: "detail", element: <SealDetailPage /> },
              {
                path: "traceability",
                element: <TraceabilityLayout />,
                children: [
                  { index: true, element: <IncidentReportPage /> },
                  { path: "incident-detail", element: <IncidentDetailPage /> },
                  { path: "seal-replacement-request", element: <SealReplacementPage /> },
                  { path: "replacement", element: <ReplacementPage /> },
                  { path: "notification-log", element: <NotificationLogPage /> },
                  { path: "audit", element: <AuditCompliancePage /> },
                ]
              },
            ]
          },
        ],
      },

      { path: "*", element: <ErrorPage /> },
    ],
  },
]);