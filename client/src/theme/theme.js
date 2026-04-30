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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--mui-divider-color": "rgba(255, 255, 255, 0.12)",
          "--color-bg-default": "#121212",
          "--color-bg-paper": "#1e1e1e",
          "--color-primary-main": "#90caf9",
          "--radius": "8px",
          "--shadow-1": "0px 1px 3px rgba(0,0,0,0.3)",
          "--shadow-2": "0px 4px 6px rgba(0,0,0,0.35)",
        },
      },
    },
  },
});

export default theme;
