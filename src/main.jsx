import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { DiagnosticCenterTheme } from "./theme/DiagnosticCenterTheme.jsx";

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
