import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { ErrorState } from "@/components/common/errors/ErrorState";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/account/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-50 relative z-9999">
        <ErrorState
          title="403 - Forbidden"
          message="You do not have permission to access the requested resource."
          className="max-w-lg shadow-sm"
        />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
