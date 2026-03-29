import axios from "axios";

function isMocksEnabled() {
  if (!import.meta.env.DEV) return false;
  return (
    String(import.meta.env.VITE_ENABLE_MOCKS ?? "true").toLowerCase() !==
    "false"
  );
}

export const apiClient = axios.create({
  // Keep same-origin in mock mode so MSW can intercept.
  baseURL: isMocksEnabled() ? "/api" : import.meta.env.VITE_API_URL || "/api",
});
