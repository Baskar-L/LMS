import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import {AuthProvider,} from "./context/AuthContext";
import {LayoutProvider,} from "./context/LayoutContext";
import { ToastProvider,} from "./context/ToastContext";


import "@shopify/polaris/build/esm/styles.css";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <ToastProvider>
        <LayoutProvider>
          <App />
        </LayoutProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);