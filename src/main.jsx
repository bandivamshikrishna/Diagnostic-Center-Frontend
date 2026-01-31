import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { DiagnosticCenterTheme } from "./theme/diagnosticCenterTheme.jsx";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import {store} from "./redux/store"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={DiagnosticCenterTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
);
