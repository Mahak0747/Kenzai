import { Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function MetricCard({ label, value, subtext, children, sx }) {
  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        p: { xs: 2.5, sm: 3.25 },
        bgcolor: alpha(theme.palette.primary.main, 0.03),
        borderColor: alpha(theme.palette.primary.main, 0.12),
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        ...sx,
      })}
    >
      <Typography variant="overline" sx={{ color: "text.secondary", display: "block", mb: 1 }}>
        {label}
      </Typography>
      {value ? (
        <Typography variant="h3" sx={{ color: "primary.main", fontWeight: 900, lineHeight: 1.1 }}>
          {value}
        </Typography>
      ) : null}
      {subtext ? (
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.75 }}>
          {subtext}
        </Typography>
      ) : null}
      {children}
    </Paper>
  );
}

