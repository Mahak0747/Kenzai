import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import App from "./App";
import { createAppTheme } from "./theme/theme";
import { fontLinks } from "./theme/fonts";

const theme = createAppTheme();

function FontLoader() {
  return (
    <GlobalStyles
      styles={{
        "@import": fontLinks.map((href) => `url(${href})`).join(";"),
      }}
    />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FontLoader />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

