import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import AccessControlAuthorizationPage from "../features/security-management/modules/access-control/pages/AccessControlAuthorizationPage";
import {
  SealDetailElectricPage,
  SealDetailPhysicalPage,
  SealRegistryPage,
} from "../features/security-management/modules/seals";
import { UsageHistoryPage } from "../features/security-management/modules/usage-history";

import LoginPage from "@/pages/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/seals" replace />} />

      {/* Public route */}
      <Route path="/account/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute allowedRoles={["user", "admin", "notary"]} />}>
        <Route path="/security" element={<AccessControlAuthorizationPage />} />
        <Route path="/seals" element={<SealRegistryPage />} />
        <Route path="/seals/e/:id" element={<SealDetailElectricPage />} />
        <Route path="/seals/p/:id" element={<SealDetailPhysicalPage />} />
        <Route path="/usage" element={<UsageHistoryPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/seals" replace />} />
    </Routes>
  );
}