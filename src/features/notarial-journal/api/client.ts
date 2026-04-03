import axios from "axios";

function isMocksEnabled() {
  if (!import.meta.env.DEV) return false;
  return (
    String(import.meta.env.VITE_ENABLE_MOCKS ?? "true").toLowerCase() !==
    "false"
  );
}

function getBaseUrl() {
  // When mocks are enabled we must stay same-origin so MSW can intercept reliably.
  if (isMocksEnabled()) return "/api/notarial-journal";

  const root = import.meta.env.VITE_API_URL as string | undefined;
  if (root && root.trim().length > 0) {
    return `${root.replace(/\/$/, "")}/notarial-journal`;
  }
  return "/api/notarial-journal";
}

export const notarialJournalApiClient = axios.create({
  baseURL: getBaseUrl(),
});
