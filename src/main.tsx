import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AppProvider } from "./providers/AppProvider";
import "./index.css";

async function enableMocks() {
  // Enabled by default in dev. Set VITE_ENABLE_MOCKS=false to disable.
  if (!import.meta.env.DEV) return;
  if (
    String(import.meta.env.VITE_ENABLE_MOCKS ?? "true").toLowerCase() ===
    "false"
  )
    return;

  const { worker } = await import("./mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}

enableMocks().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </StrictMode>,
  );
});
