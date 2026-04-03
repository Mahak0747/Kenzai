import { createTheme, alpha } from "@mui/material/styles";

const accent = "#CCFE06"; // from your homepage

export function createAppTheme(mode = "dark") {
  return createTheme({
    palette: {
      mode,
      background: {
        default: "#050A05",
        paper: "#000000",
      },
      primary: {
        main: accent,
        contrastText: "#000000",
      },
      text: {
        primary: "#E8FFE8",
        secondary: alpha("#E8FFE8", 0.62),
      },
      divider: alpha(accent, 0.14),
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: ["Syne", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"].join(","),
      h1: { fontWeight: 800, letterSpacing: "-0.04em" },
      h2: { fontWeight: 800, letterSpacing: "-0.03em" },
      h3: { fontWeight: 800, letterSpacing: "-0.02em" },
      button: {
        fontFamily: ["Space Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"].join(","),
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "none",
      },
      caption: {
        fontFamily: ["Space Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"].join(","),
      },
      overline: {
        fontFamily: ["Space Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"].join(","),
        letterSpacing: "0.25em",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#050A05",
            color: "#E8FFE8",
            overflowX: "hidden",
          },
          a: { color: "inherit" },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: "none",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingLeft: 20,
            paddingRight: 20,
          },
          containedPrimary: ({ theme }) => ({
            boxShadow: "none",
            "&:hover": {
              boxShadow: `0 0 28px ${alpha(theme.palette.primary.main, 0.35)}`,
              backgroundColor: "#FFFFFF",
            },
          }),
          outlinedPrimary: ({ theme }) => ({
            borderColor: alpha(theme.palette.primary.main, 0.4),
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
          }),
        },
      },
    },
  });
}

