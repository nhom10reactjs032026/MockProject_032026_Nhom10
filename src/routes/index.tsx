import { Outlet, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ErrorPage } from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import { AdminLayout } from "../components/layout/AdminLayout";
import {
  NotaryManagementPage,
  NotaryDetailsPage,
} from "@/features/notary-profile-management";

import { PlanSchedulingPage } from "../features/scheduling/pages/PlanSchedulingPage";
// Notary Journal Feature
import {
  NotaryJournalDashboard,
  JournalEntryDetail,
  JournalManagerPage,
} from "../features/notarial-journal";
import { DashboardLayout as JournalLayout } from "../components/layout/DashboardLayout";

// Notary Act Feature
import {
  ActListPage,
  ActOverviewPage,
  ActSetupPage,
  ActSignersPage,
  ActExecutionPage,
  ActCertificatePage,
  ActJournalPage,
  ActStatusPage,
} from "../features/notary-act";
import { ActExportPage } from "@/features/notary-act/pages/ActExportPage";

// CRM Management Feature
import {
  CrmDashboard,
  CustomerListPage,
  CustomerDetailPage,
} from "../features/crm-management";

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
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      // PUBLIC ROUTES
      { index: true, element: <HomePage /> },
      { path: "planning", element: <PlanSchedulingPage /> },
      { path: "account/login", element: <LoginPage /> },

      // USER ROUTES (Dành cho người dùng đã đăng nhập)
      {
        element: <ProtectedRoute allowedRoles={["user", "admin", "notary"]} />,
        children: [
          {
            path: "profile",
            element: (
              <div className="p-20 text-center font-bold">
                👤 THÔNG TIN CÁ NHÂN (USER/ADMIN/NOTARY)
              </div>
            ),
          },
          {
            path: "history",
            element: (
              <div className="p-20 text-center font-bold">
                📝 LỊCH SỬ GIAO DỊCH
              </div>
            ),
          },
        ],
      },

      // NOTARY ROUTES (Dành cho công chứng viên)
      {
        element: <ProtectedRoute allowedRoles={["notary", "admin"]} />,
        children: [
          {
            path: "notary/dashboard",
            element: (
              <div className="p-20 text-center font-bold text-blue-600">
                📜 BẢNG ĐIỀU KHIỂN CÔNG CHỨNG VIÊN
              </div>
            ),
          },
          {
            path: "notary/verify",
            element: (
              <div className="p-20 text-center font-bold text-blue-600">
                ✅ XÁC THỰC HỒ SƠ
              </div>
            ),
          },
        ],
      },

      // ADMIN ROUTES
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "admin",
            element: <AdminLayout />,
            children: [
              {
                path: "users",
                element: (
                  <div className="p-20 font-bold">👥 USERS MANAGEMENT</div>
                ),
              },
            ],
          },
        ],
      },

      // ADMIN PAGES under shared sidebar + topbar
      {
        element: <JournalLayout />,
        children: [
          {
            element: <ProtectedRoute allowedRoles={["admin"]} />,
            children: [
              {
                path: "admin/dashboard",
                element: (
                  <div className="p-20 font-bold">
                    🛠️ ADMIN DASHBOARD (PUBLIC)
                  </div>
                ),
              },
              { path: "admin/notaries", element: <NotaryManagementPage /> },
              {
                path: "admin/notaries/:id",
                element: <NotaryDetailsPage />,
              },

              // MODULE SEAL & DIGITAL SIGNATURE
              {
                path: "admin/seals",
                element: <SealModuleLayout />,
                children: [
                  { index: true, element: <SealDashboardPage /> },
                  {
                    path: "registry",
                    element: (
                      <div className="p-20 font-bold">Registry Content</div>
                    ),
                  },
                  { path: "detail", element: <SealDetailPage /> },
                  {
                    path: "traceability",
                    element: <TraceabilityLayout />,
                    children: [
                      { index: true, element: <IncidentReportPage /> },
                      {
                        path: "incident-detail",
                        element: <IncidentDetailPage />,
                      },
                      {
                        path: "seal-replacement-request",
                        element: <SealReplacementPage />,
                      },
                      { path: "replacement", element: <ReplacementPage /> },
                      {
                        path: "notification-log",
                        element: <NotificationLogPage />,
                      },
                      { path: "audit", element: <AuditCompliancePage /> },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // NOTARY JOURNAL FEATURE
      {
        path: "notary-journal",
        element: <JournalLayout />,
        children: [
          { index: true, element: <NotaryJournalDashboard /> },
          { path: "manager", element: <JournalManagerPage /> },
          {
            path: "registry",
            element: (
              <div className="p-20 text-center text-xl font-bold">
                Registry Page Placeholder
              </div>
            ),
          },
          { path: "detail", element: <JournalEntryDetail /> },
          {
            path: "technical",
            element: (
              <div className="p-20 text-center text-xl font-bold">
                Technical Page Placeholder
              </div>
            ),
          },
          {
            path: "traceability",
            element: (
              <div className="p-20 text-center text-xl font-bold">
                Traceability Page Placeholder
              </div>
            ),
          },
          {
            path: "security",
            element: (
              <div className="p-20 text-center text-xl font-bold">
                Security Page Placeholder
              </div>
            ),
          },
          {
            path: "risk",
            element: (
              <div className="p-20 text-center text-xl font-bold">
                Risk Handling Page Placeholder
              </div>
            ),
          },
          {
            path: "oversight",
            element: (
              <div className="p-20 text-center text-xl font-bold">
                Oversight Page Placeholder
              </div>
            ),
          },
        ],
      },

      // NOTARY ACT FEATURE
      {
        path: "notary-acts",
        element: <JournalLayout />,
        children: [
          { index: true, element: <ActListPage /> },
          { path: "registry", element: <ErrorPage /> },
          { path: "detail", element: <ErrorPage /> },
          { path: "technical", element: <ErrorPage /> },
          { path: "traceability", element: <ErrorPage /> },
          { path: "security", element: <ErrorPage /> },
          { path: "risk", element: <ErrorPage /> },
          { path: "oversight", element: <ErrorPage /> },
          { path: ":id", element: <ActOverviewPage /> },
          { path: ":id/setup", element: <ActSetupPage /> },
          { path: ":id/signers", element: <ActSignersPage /> },
          { path: ":id/execution", element: <ActExecutionPage /> },
          { path: ":id/certificate", element: <ActCertificatePage /> },
          { path: ":id/journal", element: <ActJournalPage /> },
          { path: ":id/status", element: <ActStatusPage /> },
          { path: ":id/export", element: <ActExportPage /> },
        ],
      },

      // CRM MANAGEMENT FEATURE
      {
        path: "crm",
        element: <Outlet />,
        children: [
          { index: true, element: <CrmDashboard /> },
          { path: "customers", element: <CustomerListPage /> },
          { path: "customers/:id", element: <CustomerDetailPage /> },
        ],
      },

      // CATCH-ALL ROUTE
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
