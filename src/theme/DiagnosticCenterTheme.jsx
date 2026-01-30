import { createTheme } from "@mui/material";

export const DiagnosticCenterTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: "#cce6f0",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#1bb2db",
    },
  },
  typography: {},
});
