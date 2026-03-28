import { createBrowserRouter, Outlet } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ErrorPage } from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import { AdminLayout } from "../components/layout/AdminLayout";
import { NotaryManagementPage, NotaryDetailsPage } from "@/features/notary-profile-management";

import { PlanSchedulingPage } from "../features/scheduling/pages/PlanSchedulingPage";
// Notary Journal Feature
import {
  NotaryJournalDashboard,
  JournalEntryDetail,
  JournalManagerPage,
} from "../features/notarial-journal";
import { DashboardLayout as JournalLayout } from "../components/layout/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/planning",
    element: <PlanSchedulingPage />,
  },
  {
    path: "/account/login",
    element: <LoginPage />,
  },

  // 2. USER ROUTES (Dành cho người dùng đã đăng nhập)
  {
    element: <ProtectedRoute allowedRoles={["user", "admin", "notary"]} />,
    children: [
      {
        path: "/profile",
        element: (
          <div className="p-20 text-center font-bold">
            👤 THÔNG TIN CÁ NHÂN (USER/ADMIN/NOTARY)
          </div>
        ),
      },
      {
        path: "/history",
        element: (
          <div className="p-20 text-center font-bold">📝 LỊCH SỬ GIAO DỊCH</div>
        ),
      },
    ],
  },

  // 3. NOTARY ROUTES (Dành cho công chứng viên)
  {
    element: <ProtectedRoute allowedRoles={["notary", "admin"]} />,
    children: [
      {
        path: "/notary/dashboard",
        element: (
          <div className="p-20 text-center font-bold text-blue-600">
            📜 BẢNG ĐIỀU KHIỂN CÔNG CHỨNG VIÊN
          </div>
        ),
      },
      {
        path: "/notary/verify",
        element: (
          <div className="p-20 text-center font-bold text-blue-600">
            ✅ XÁC THỰC HỒ SƠ
          </div>
        ),
      },
    ],
  },

  // 4. ADMIN ROUTES (Dành riêng cho Quản trị viên)
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <div className="p-20 text-center font-bold text-red-600">
            🛠️ QUẢN TRỊ VIÊN - DASHBOARD
          </div>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <div className="p-20 text-center font-bold text-red-600">
            👥 QUẢN LÝ NGƯỜI DÙNG
          </div>
        ),
      },
    ],
  },

  // 5. NOTARY JOURNAL FEATURE
  {
    path: "/notary-journal",
    element: <Outlet />,
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
            element: <JournalLayout />,
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
