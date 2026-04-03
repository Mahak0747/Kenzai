import { Box, Container, Typography } from "@mui/material";

export default function SectionShell({
  id,
  indexLabel,
  title,
  subtitle,
  children,
  bgVariant = "none", 
}) {
  return (
    <Box
      component="section"
      id={id}
      sx={(theme) => ({
        py: { xs: 8, sm: 12 },
        ...(bgVariant === "panel"
          ? {
              bgcolor: "rgba(0,0,0,0.3)",
              borderTop: `1px solid ${theme.palette.divider}`,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }
          : null),
      })}
    >
      <Container maxWidth="lg">
        {indexLabel ? (
          <Typography variant="overline" sx={{ color: "primary.main", display: "block", mb: 2 }}>
            {indexLabel}
          </Typography>
        ) : null}
        {title ? (
          <Typography variant="h2" sx={{ lineHeight: 1.05, mb: subtitle ? 2 : 0 }}>
            {title}
          </Typography>
        ) : null}
        {subtitle ? (
          <Typography sx={{ color: "text.secondary", maxWidth: 680, mb: 6, lineHeight: 1.8 }}>
            {subtitle}
          </Typography>
        ) : null}
        {children}
      </Container>
    </Box>
  );
}

