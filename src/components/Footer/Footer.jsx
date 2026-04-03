import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

const links = [
  { label: "About", href: "/" },
  { label: "GitHub", href: "https://github.com/Mahak0747/CARBON-TWIN" },
  { label: "Contact", href: "https://github.com/Mahak0747" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
        py: { xs: 6, sm: 8 },
        textAlign: "center",
      })}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={(theme) => ({
            fontWeight: 900,
            color: theme.palette.primary.main,
            mb: 1,
          })}
        >
          Kenzai
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 4 }}>
        </Typography>

        <Stack
          direction="row"
          spacing={4}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
          sx={{ mb: 4 }}
        >
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              underline="none"
              variant="caption"
              target="_blank"
              rel="noopener noreferrer"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                "&:hover": { color: theme.palette.primary.main },
              })}
            >
              {l.label}
            </Link>
          ))}
        </Stack>

        <Typography
          variant="caption"
          sx={(theme) => ({
            color: alpha(theme.palette.text.secondary, 0.7),
            letterSpacing: "0.25em",
          })}
        >
          © 2026 KenzAI — MADE WITH 💚 FOR THE EARTH
        </Typography>
      </Container>
    </Box>
  );
}

