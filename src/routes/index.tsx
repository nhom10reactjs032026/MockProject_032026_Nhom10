import { Navigate, Outlet, createBrowserRouter, useParams } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import  {LoginPage}  from "../pages/LoginPage";
import { ErrorPage } from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import { AdminLayout } from "../components/layout/AdminLayout";
import {
  NotaryManagementPage,
  NotaryDetailsPage,
  NotaryCreatePage,
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

import { SecurityManagementLayout } from "@/features/security-management/pages/SecurityManagementLayout";

import AccessControlAuthorizationPage from "../features/security-management/modules/access-control/pages/AccessControlAuthorizationPage";
import {
  SealDetailElectricPage,
  SealDetailPhysicalPage,
  SealRegistryPage,
} from "../features/security-management/modules/seals";
import { UsageHistoryPage } from "../features/security-management/modules/usage-history";

// --- SEAL & DIGITAL SIGNATURE MODULE (ADMIN SIDE) ---
import { SealModuleLayout } from "@/features/security-management/pages/admin/SealModuleLayout";
import SealDashboardPage from "@/features/security-management/pages/admin/SealDashboardPage";
import SealTechnicalPage from "@/features/security-management/pages/admin/SealTechnicalPage";
import { RiskHandlingLayout as AdminRiskLayout } from "@/features/security-management/pages/admin/RiskHandlingLayout";
import { IncidentDetailPage } from "@/features/security-management/pages/admin/IncidentDetailPage";
import { ReplacementPage } from "@/features/security-management/pages/admin/ReplacementPage";
import { NotificationLogPage } from "@/features/security-management/pages/admin/NotificationLogPage";
import { AuditCompliancePage } from "@/features/security-management/pages/admin/AuditCompliancePage";
import { SealReplacementApprovalPage } from "@/features/security-management/pages/admin/SealReplacementApprovalPage";
import { OversightLayout } from "@/features/security-management/pages/admin/OversightLayout";

// --- SEAL & DIGITAL SIGNATURE MODULE (NOTARY SIDE) ---
import { RiskHandlingLayout as NotaryRiskLayout } from "@/features/security-management/pages/notary/RiskHandlingLayout";
import { IncidentReportPage } from "@/features/security-management/pages/notary/IncidentReportPage";
import { SealReplacementPage } from "@/features/security-management/pages/notary/SealReplacementPage";

function LegacySealDetailRedirect({ kind }: { kind: "e" | "p" }) {
  const { id } = useParams();
  return (
    <Navigate
      to={id ? `/admin/seals/${kind}/${id}` : "/admin/seals"}
      replace
    />
  );
}




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


      {
        path: "/profile",
        element: <div className="p-20 text-center font-bold">👤 THÔNG TIN CÁ NHÂN (USER/ADMIN/NOTARY)</div>,
      },
      {
        path: "/history",
        element: <div className="p-20 text-center font-bold">📝 LỊCH SỬ GIAO DỊCH</div>,
      },
      {
        path: "/crm/customers/:id",
        element: <CustomerDetailPage />,
      },


      // USER ROUTES (For logged in users)
      {
        element: <ProtectedRoute allowedRoles={["user", "admin", "notary"]} />,
        children: [
          {

            element: <JournalLayout />,
            children: [
              // SECURITY MANAGEMENT (module routes)
              { path: "security", element: <AccessControlAuthorizationPage /> },
              { path: "seals", element: <Navigate to="/admin/seals" replace /> },
              { path: "seals/e/:id", element: <LegacySealDetailRedirect kind="e" /> },
              { path: "seals/p/:id", element: <LegacySealDetailRedirect kind="p" /> },
              { path: "usage", element: <UsageHistoryPage /> },

              {
                path: "profile",
                element: (
                  <div className="p-20 text-center font-bold">
                    👤 PERSONAL INFORMATION (USER/ADMIN/NOTARY)
                  </div>
                ),
              },
              {
                path: "history",
                element: (
                  <div className="p-20 text-center font-bold">
                    📝 TRANSACTION HISTORY
                  </div>
                ),
              },
            ],
          },
        ],
      },

      // NOTARY GENERAL ROUTES
      {
        element: <ProtectedRoute allowedRoles={["notary", "admin"]} />,
        children: [
          {
            path: "notary/dashboard",
            element: (
              <div className="p-20 text-center font-bold text-blue-600">
                📜 NOTARY DASHBOARD
              </div>
            ),
          },
          {
            path: "notary/verify",
            element: (
              <div className="p-20 text-center font-bold text-blue-600">
                ✅ DOCUMENT VERIFICATION
              </div>
            ),
          },
        ],
      },

      // ADMIN CORE ROUTES
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
              { path: "admin/notaries/create", element: <NotaryCreatePage /> },
              {
                path: "admin/notaries/:id",
                element: <NotaryDetailsPage />,
              },

              // SECURITY MANAGEMENT (3 modules) under shared horizontal tabs

              // MODULE SEAL & DIGITAL SIGNATURE (ADMIN SIDE)

              {
                element: <SecurityManagementLayout />,
                children: [
                  {
                    path: "admin/seals",
                    element: <SealModuleLayout />,
                    children: [
                      { index: true, element: <SealDashboardPage /> },
                      { path: "registry", element: <SealRegistryPage /> },

                      // SC_003.1 / SC_003.2
                      { path: "e/:id", element: <SealDetailElectricPage /> },
                      { path: "p/:id", element: <SealDetailPhysicalPage /> },

                      // SC_007.x optional: replacement flow by seal
                      { path: ":id/replacement", element: <SealReplacementPage /> },

                  { path: "technical", element: <SealTechnicalPage /> },
                  {
                    path: "risk-handling",
                    element: <AdminRiskLayout />,
                    children: [
                      // Default sub-route for Risk Handling
                      { index: true, element: <IncidentDetailPage /> },

                      { path: "replacement-request", element: <SealReplacementApprovalPage /> },
                      { path: "replacement", element: <ReplacementPage /> },
                      { path: "notification-log", element: <NotificationLogPage /> },
                      // { path: "audit", element: <AuditCompliancePage /> },

                    ],
                  },
                ],
              },

                  // SC_006
                  { path: "admin/security", element: <Navigate to="/admin/security/access-control" replace /> },
                  { path: "admin/security/access-control", element: <AccessControlAuthorizationPage /> },

                  // SC_005
                  { path: "admin/usage", element: <Navigate to="/admin/traceability/usage" replace /> },
                  { path: "admin/traceability", element: <Navigate to="/admin/traceability/usage" replace /> },
                  { path: "admin/traceability/usage", element: <UsageHistoryPage /> },
                ],
              },

              // SC_004
              {
                path: "admin/technical/keys",
                element: <SealTechnicalPage />,
              },

              // SC_007.1 - SC_007.5
              { path: "admin/incidents", element: <IncidentReportPage /> },
              { path: "admin/incidents/:id", element: <IncidentDetailPage /> },
              { path: "admin/incidents/:id/replacement", element: <SealReplacementPage /> },

              // SC_007.6
              { path: "admin/regulatory/notifications", element: <NotificationLogPage /> },
              {
                path: "admin/regulatory/notifications/:id",
                element: (
                  <div className="mx-auto min-h-screen max-w-[1400px] bg-transparent px-4 py-8 sm:px-6 lg:px-8">
                    <div className="text-2xl font-bold">Regulatory Notification Detail</div>
                    <div className="mt-2 text-sm text-slate-500">Placeholder page</div>
                  </div>
                ),
              },

              // SC_008
              { path: "admin/compliance/audit", element: <AuditCompliancePage /> },
              {
                path: "admin/compliance/audit/:id",
                element: (
                  <div className="mx-auto min-h-screen max-w-[1400px] bg-transparent px-4 py-8 sm:px-6 lg:px-8">
                    <div className="text-2xl font-bold">Audit Log Detail</div>
                    <div className="mt-2 text-sm text-slate-500">Placeholder page</div>
                  </div>
                ),
              },

              // CRM MANAGEMENT FEATURE
              {
                path: "crm",
                children: [
                  { index: true, element: <CrmDashboard /> },
                  { path: "customers", element: <CustomerListPage /> },
                  { path: "customers/:id", element: <CustomerDetailPage /> },
                ],
              },
              {
                path: "admin/oversight",
                element: <OversightLayout />,
                children: [
                  { index: true, element: <AuditCompliancePage /> }, // Audit is now the default page for Oversight
                ]
              },
            ],
          },
        ],
      },

      // NOTARY RISK HANDLING MODULE (Newly implemented)
      {
        path: "notary-risk",
        element: <JournalLayout />,
        children: [
          {
            element: <ProtectedRoute allowedRoles={["notary", "admin"]} />,
            children: [
              {
                element: <NotaryRiskLayout />,
                children: [
                  { index: true, element: <IncidentReportPage /> },
                  { path: "incident", element: <IncidentReportPage /> },
                  { path: "replacement", element: <SealReplacementPage /> },
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
          // Static paths defined before dynamic :id to prevent conflicts
          { path: "registry", element: <ErrorPage /> },
          { path: "detail", element: <ErrorPage /> },
          { path: "technical", element: <ErrorPage /> },
          { path: "traceability", element: <ErrorPage /> },
          { path: "security", element: <ErrorPage /> },
          { path: "risk", element: <ErrorPage /> },
          { path: "oversight", element: <ErrorPage /> },
          // Dynamic routes
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

      // CATCH-ALL ROUTE
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);