import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./utility/AppRouter";
import theme from "./theme/theme";
import "./styles/global.scss";

function ThemeVariables() {
  const theme = useTheme();

  return (
    <style>
      {`
        :root {
          --color-primary: ${theme.palette.primary.main};
          --color-secondary: ${theme.palette.secondary.main};
          --color-bg-default: ${theme.palette.background.default};
          --color-bg-paper: ${theme.palette.background.paper};
          --color-text-primary: ${theme.palette.text.primary};
          --color-text-secondary: ${theme.palette.text.secondary};
          --radius: ${theme.shape.borderRadius}px;
          --shadow-1: ${theme.shadows[1]};
          --shadow-2: ${theme.shadows[2]};
        }
      `}
    </style>
  );
}

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeVariables />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
