import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  // 1. PUBLIC ROUTES (Mọi người đều truy cập được)
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/account/login",
    element: <LoginPage />,
  },
  
  // 2. USER ROUTES (Dành cho người dùng đã đăng nhập)
  {
    element: <ProtectedRoute allowedRoles={['user', 'admin', 'notary']} />,
    children: [
      {
        path: "/profile",
        element: <div className="p-20 text-center font-bold">👤 THÔNG TIN CÁ NHÂN (USER/ADMIN/NOTARY)</div>,
      },
      {
        path: "/history",
        element: <div className="p-20 text-center font-bold">📝 LỊCH SỬ GIAO DỊCH</div>,
      },
    ],
  },

  // 3. NOTARY ROUTES (Dành cho công chứng viên)
  {
    element: <ProtectedRoute allowedRoles={['notary', 'admin']} />,
    children: [
      {
        path: "/notary/dashboard",
        element: <div className="p-20 text-center font-bold text-blue-600">📜 BẢNG ĐIỀU KHIỂN CÔNG CHỨNG VIÊN</div>,
      },
      {
        path: "/notary/verify",
        element: <div className="p-20 text-center font-bold text-blue-600">✅ XÁC THỰC HỒ SƠ</div>,
      },
    ],
  },

  // 4. ADMIN ROUTES (Dành riêng cho Quản trị viên)
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        path: "/admin/dashboard",
        element: <div className="p-20 text-center font-bold text-red-600">🛠️ QUẢN TRỊ VIÊN - DASHBOARD</div>,
      },
      {
        path: "/admin/users",
        element: <div className="p-20 text-center font-bold text-red-600">👥 QUẢN LÝ NGƯỜI DÙNG</div>,
      },
    ],
  },
]);