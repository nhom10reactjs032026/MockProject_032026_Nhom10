import { Navigate, Route, Routes } from "react-router-dom";
import AccessControlAuthorizationPage from "../features/security-management/modules/access-control/pages/AccessControlAuthorizationPage";
import {
  SealDetailElectricPage,
  SealDetailPhysicalPage,
  SealRegistryPage,
} from "../features/security-management/modules/seals";
import { UsageHistoryPage } from "../features/security-management/modules/usage-history";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/seals" replace />} />
      <Route path="/security" element={<AccessControlAuthorizationPage />} />
      <Route path="/seals" element={<SealRegistryPage />} />
      <Route path="/seals/e/:id" element={<SealDetailElectricPage />} />
      <Route path="/seals/p/:id" element={<SealDetailPhysicalPage />} />

      <Route path="/usage" element={<UsageHistoryPage />} />

      <Route path="*" element={<Navigate to="/seals" replace />} />
      
    </Routes>
  );
}