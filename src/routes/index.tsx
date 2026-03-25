import { createBrowserRouter, Outlet } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ErrorPage } from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import { AdminLayout } from "../components/layout/AdminLayout";
import { NotaryManagementPage, NotaryDetailsPage } from "@/features/notary-profile-management";

// Notary Journal Feature
import {
  NotaryJournalDashboard,
  JournalEntryDetail,
  JournalManagerPage,
  DashboardLayout as JournalLayout,
} from "../features/notarial-journal";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      // 1. PUBLIC ROUTES
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "account/login",
        element: <LoginPage />,
      },

      // 2. USER ROUTES
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
              <div className="p-20 text-center font-bold">📝 LỊCH SỬ GIAO DỊCH</div>
            ),
          },
        ],
      },

      // 3. NOTARY ROUTES
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

      // 4. ADMIN ROUTES
      {
        path: "admin",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: "dashboard",
                element: (
                  <div className="p-20 text-center font-bold text-slate-800">
                    🛠️ QUẢN TRỊ VIÊN - DASHBOARD
                  </div>
                ),
              },
              {
                path: "notaries",
                element: <NotaryManagementPage />,
              },
              {
                path: "notaries/:id",
                element: <NotaryDetailsPage />,
              },
              {
                path: "users",
                element: (
                  <div className="p-20 text-center font-bold text-slate-800">
                    👥 QUẢN LÝ NGƯỜI DÙNG
                  </div>
                ),
              },
            ],
          },
        ],
      },

      // 5. NOTARY JOURNAL FEATURE
      {
        path: "notary-journal",
        element: <JournalLayout />,
        children: [
          {
            index: true,
            element: <NotaryJournalDashboard />,
          },
          {
            path: "manager",
            element: <JournalManagerPage />,
          },
          {
            path: "registry",
            element: (
              <div className="p-20 text-center text-xl font-bold">
                Registry Page Placeholder
              </div>
            ),
          },
          {
            path: "detail",
            element: <JournalEntryDetail />,
          },
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
      // 6. CATCH-ALL ROUTE
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
