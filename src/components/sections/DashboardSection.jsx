import { Box, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import MetricCard from "../cards/MetricCard";
import SectionShell from "./SectionShell";
import { computeScore } from "./OnboardingSection";

function BarRow({ icon, label, pct }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Typography variant="caption" sx={{ color: "text.secondary", width: 110, display: "flex", gap: 0.75, alignItems: "center" }}>
        <Box component="span" sx={{ fontSize: 14 }}>
          {icon}
        </Box>
        {label}
      </Typography>
      <Box
        sx={(theme) => ({
          flex: 1,
          height: 8,
          borderRadius: 999,
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          overflow: "hidden",
        })}
      >
        <Box
          sx={(theme) => ({
            height: "100%",
            width: `${pct}%`,
            bgcolor: "primary.main",
            borderRadius: 999,
            boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.55)}`,
          })}
        />
      </Box>
      <Typography variant="caption" sx={{ color: "primary.main", width: 42, textAlign: "right" }}>
        {pct}%
      </Typography>
    </Stack>
  );
}

export default function DashboardSection({ userData }) {
  const {
    transport = 0,
    diet = 0,
    elec = 0,
    flight = 0,
  } = userData || {};
  const score = computeScore({
    transport,
    diet,
    elec,
    flight,
  });
  const emissions = (
    transport * 0.05 +
    diet * 0.3 +
    elec * 0.01 +
    flight * 0.5
  ).toFixed(1);
  const ranking = emissions < 2 ? "Top 10%" :
                  emissions < 4 ? "Top 30%" :
                  emissions < 6 ? "Top 60%" : "Top 90%";
  const total = transport + diet + elec + flight;

  const breakdown =
    total === 0
      ? { transport: 0, diet: 0, elec: 0, flight: 0 }
      : {
          transport: Math.round((transport / total) * 100),
          diet: Math.round((diet / total) * 100),
          elec: Math.round((elec / total) * 100),
          flight: Math.round((flight / total) * 100),
        };
  return (
    <SectionShell
      id="dashboard"
      bgVariant="panel"
      title={
        <>
          Your Impact
          <br />
          At a Glance
        </>
      }
    >
      <Box sx={{ mt: 1, display: "flex",width: "100%", flexDirection: "column", gap: 2.5 }}>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          width: "100%",
          gap: 2.5,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box sx={{flex:1}}>
          <MetricCard label="TOTAL CARBON SCORE" value={score} subtext="out of 100 🌿 (lower = better)" />
        </Box>
        <Box sx={{flex:1}}>
          <MetricCard label="ANNUAL CO₂ EMISSIONS" value={emissions} subtext="tonnes/year (India avg: 1.9t)" />
        </Box>
        <Box sx={{flex:1}}>
          <MetricCard label="GLOBAL RANKING" value={ranking} subtext="of Kenzai users 🏆" />
        </Box>
      </Box>

        <Box item xs={12}>
          <MetricCard label="BREAKDOWN BY CATEGORY" sx={{ height: "100%" }}>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              <BarRow icon="🚗" label="Transport" pct={breakdown.transport} />
              <BarRow icon="🍔" label="Food" pct={breakdown.diet} />
              <BarRow icon="💡" label="Energy" pct={breakdown.elec} />
              <BarRow icon="✈️" label="Flights" pct={breakdown.flight} />
            </Stack>
          </MetricCard>
        </Box>

      <Box sx={{ mt: 1, display: "flex",width: "100%", gap: 2.5 }}>
        <Box sx={{flex:1}}>
          <MetricCard label="YOUR BADGES" sx={{ height: "100%" }}>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
              {["🌱 ECO BEGINNER", "🚲 TRANSPORT SAVER", "💧 LOW WATER USE", "🔥 7-DAY STREAK"].map((b) => (
                <Chip
                  key={b}
                  label={b}
                  variant="outlined"
                  sx={(theme) => ({
                    borderRadius: 999,
                    borderColor: alpha(theme.palette.primary.main, 0.28),
                    color: "primary.main",
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                    fontFamily: theme.typography.caption.fontFamily,
                    letterSpacing: "0.06em",
                  })}
                />
              ))}
            </Stack>
          </MetricCard>
        </Box>

        {/* <Box sx={{flex:1}}>
          <MetricCard label="LEADERBOARD">
            <Stack spacing={1} sx={{ mt: 2 }}>
              {[
                { rank: "01", name: "Arjun M.", score: "94 🌿" },
                { rank: "02", name: "Priya S.", score: "91 🌿" },
                { rank: "12", name: "You ⭐", score: "62 🌿", you: true },
                { rank: "13", name: "Rahul K.", score: "58 🌿" },
              ].map((r) => (
                <Stack
                  key={`${r.rank}-${r.name}`}
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={(theme) => ({
                    py: 1,
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                    "&:last-of-type": { borderBottom: "none" },
                  })}
                >
                  <Typography variant="caption" sx={{ color: "text.secondary", width: 32 }}>
                    {r.rank}
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 650, flex: 1, color: r.you ? "primary.main" : "text.primary" }}>
                    {r.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "primary.main" }}>
                    {r.score}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </MetricCard>
        </Box> */}
      </Box>
      </Box>
    </SectionShell>
  );
}

