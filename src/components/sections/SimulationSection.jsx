import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useMemo, useState } from "react";
import SectionShell from "./SectionShell";

const savings = { 1: 0.8, 2: 0.6, 3: 0.5, 4: 0.4 };

const togglesList = [
  { id: 1, icon: "🚲", label: "SWITCH TO CYCLING / METRO" },
  { id: 2, icon: "🥗", label: "GO PLANT-BASED 3x/WEEK" },
  { id: 3, icon: "☀️", label: "SWITCH TO SOLAR/RENEWABLES" },
  { id: 4, icon: "✈️", label: "REDUCE FLIGHTS TO 1/YEAR" },
];

function SimToggle({ active, icon, label, onClick }) {
  return (
    <Paper
      component="button"
      type="button"
      onClick={onClick}
      elevation={0}
      sx={(theme) => ({
        textAlign: "left",
        width: "100%",
        cursor: "pointer",
        p: 2,
        borderRadius: 2.5,
        bgcolor: alpha(theme.palette.primary.main, active ? 0.1 : 0.06),
        borderColor: alpha(theme.palette.primary.main, active ? 0.4 : 0.15),
        display: "flex",
        gap: 1.5,
        alignItems: "center",
        color: "text.primary",
        "&:hover": {
          borderColor: "primary.main",
          bgcolor: alpha(theme.palette.primary.main, 0.1),
        },
      })}
    >
      <Box component="span" sx={{ fontSize: 18 }}>
        {icon}
      </Box>
      <Typography variant="caption" sx={{ flex: 1 }}>
        {label}
      </Typography>
      <Box
        sx={(theme) => ({
          width: 18,
          height: 18,
          borderRadius: 1,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.45)}`,
          placeItems: "center",
          color: "primary.main",
          fontSize: 12,
          flexShrink: 0,
        })}
      >
        {active ? "✓" : ""}
      </Box>
    </Paper>
  );
}

export default function SimulationSection({ userData }) {
  const {
    transport = 0,
    diet = 0,
    elec = 0,
    flight = 0,
  } = userData || {};
  const base = useMemo(() => {
    return (
      transport * 0.05 +
      diet * 0.3 +
      elec * 0.01 +
      flight * 0.5
    );
  }, [transport, diet, elec, flight]);

  const [toggles, setToggles] = useState({ 1: true, 2: false, 3: false, 4: false });

  const totalSave = useMemo(
    () => Object.keys(toggles).reduce((sum, k) => (toggles[k] ? sum + savings[k] : sum), 0),
    [toggles],
  );
  const future = useMemo(
    () => Math.max(1.2, base - totalSave),
    [base, totalSave]
  );
  const trees = useMemo(() => Math.round(totalSave * 46), [totalSave]);
  const pct = useMemo(() => {
    if (base === 0) return 0;
    return Math.round((totalSave / base) * 100);
  }, [totalSave, base]);

  return (
    <SectionShell
      id="simulation"
      title={
        <>
          See Your
          <br />
          Future Earth
        </>
      }
      subtitle="Toggle your lifestyle choices and watch your impact change in real-time. What if you switched to a cycle? Went plant-based?"
    >
      <Paper
        elevation={0}
        sx={(theme) => ({
          overflow: "hidden",
          borderColor: alpha(theme.palette.primary.main, 0.14),
        })}
      >
        <Box sx={{display: "flex",width: "100%", flexDirection: "column"}}>
          <Box sx={{display: "flex",width: "100%",flexDirection: { xs: "column", md: "row" },}}>
              <Box
                sx={(theme) => ({
                  p: { xs: 3, sm: 4 },
                  bgcolor: alpha("#FF3C3C", 0.06),
                  borderRight: { md: `1px solid ${alpha(theme.palette.primary.main, 0.14)}` },
                  flex:1
                })}
              >
                <Typography
                  variant="overline"
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 0.6,
                    borderRadius: 999,
                    bgcolor: alpha("#FF3C3C", 0.16),
                    color: "#FF6060",
                    border: `1px solid ${alpha("#FF3C3C", 0.25)}`,
                    mb: 3,
                  }}
                >
                  ◀ CURRENT LIFESTYLE
                </Typography>

                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    color: "#FF6060",
                    textShadow: `0 0 28px ${alpha("#FF3C3C", 0.35)}`,
                    mb: 1,
                  }}
                >
                  {base.toFixed(1)}t
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 3 }}>
                  CO₂ per year — your current path
                </Typography>

                <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                  🚗 Car commute: {transport} km/day
                  <br />
                  🍔 Meat {diet}x/week
                  <br />
                  💡 {elec} kWh/month
                  <br />
                  ✈️ {flight} flights/year
                </Typography>
              </Box>
          

            
              <Box sx={(theme) => ({ p: { xs: 3, sm: 4 }, bgcolor: alpha(theme.palette.primary.main, 0.04),flex:1 })}>
                <Typography
                  variant="overline"
                  sx={(theme) => ({
                    display: "inline-block",
                    px: 1.5,
                    py: 0.6,
                    borderRadius: 999,
                    bgcolor: alpha(theme.palette.primary.main, 0.12),
                    color: "primary.main",
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                    mb: 3,
                  })}
                >
                  FUTURE YOU ▶
                </Typography>

                <Typography
                  variant="h2"
                  sx={(theme) => ({
                    fontWeight: 900,
                    color: "primary.main",
                    textShadow: `0 0 28px ${alpha(theme.palette.primary.main, 0.35)}`,
                    mb: 1,
                  })}
                >
                  {future.toFixed(1)}t
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 3 }}>
                  CO₂ if you make these changes
                </Typography>

                <Stack spacing={1.5} sx={{ mt: 2 }}>
                  {togglesList.map((t) => (
                    <SimToggle
                      key={t.id}
                      active={toggles[t.id]}
                      icon={t.icon}
                      label={t.label}
                      onClick={() => setToggles((s) => ({ ...s, [t.id]: !s[t.id] }))}
                    />
                  ))}
                </Stack>
              </Box>
          </Box>

            <Box
              sx={(theme) => ({
                p: { xs: 2.5, sm: 3.25 },
                bgcolor: alpha(theme.palette.primary.main, 0.06),
                borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                display: "flex",
                gap: 2,
                alignItems: "center",
              })}
            >
              <Box sx={{ fontSize: 22 }}>🌳</Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "primary.main" }}>
                  -{totalSave.toFixed(1)}t CO₂/year
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Equivalent to planting {trees} trees • You reduced {pct}% 🌱
                </Typography>
              </Box>
            </Box>
          </Box>
      </Paper>
    </SectionShell>
  );
}