import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  // Giả lập trạng thái đăng nhập và role (BẠN SẼ THAY THẾ BẰNG REDUX/ZUSTAND TƯƠNG LẠI)
  const user = { 
    isAuthenticated: true, 
    role: 'user' // Bạn có thể sửa thành 'admin' hoặc 'notary' để kiểm tra kết quả
  };

  if (!user.isAuthenticated) {
    return <Navigate to="/account/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
