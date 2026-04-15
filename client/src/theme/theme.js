import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0,0,0,0.3)",
    "0px 4px 6px rgba(0,0,0,0.35)",
    // add more as needed
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--mui-divider-color": "rgba(255, 255, 255, 0.12)",
        },
      },
    },
  },
});

export default theme;
