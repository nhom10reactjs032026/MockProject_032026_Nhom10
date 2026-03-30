import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

console.log("MAIN: start");

try {
  const el = document.getElementById("root");
  console.log("MAIN: root element =", el);

  if (!el) throw new Error('Missing <div id="root"></div> in index.html');

  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

  console.log("MAIN: render called");
} catch (e) {
  console.error("MAIN: crashed before render", e);
}