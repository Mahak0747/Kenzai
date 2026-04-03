import { Box, Button, Paper, Slider, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionShell from "./SectionShell";

const defaults = {
  transport: 25,
  diet: 4,
  elec: 300,
  flight: 2,
};

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function computeScore({ transport, diet, elec, flight }) {
  const t = transport;
  const d = diet;
  const e = elec;
  const f = flight;
  return Math.round(20 + (t / 100) * 30 + (d / 7) * 20 + ((e - 50) / 750) * 20 + (f / 20) * 10);
}

function scoreMeta(score) {
  if (score < 40) return { emoji: "🌿", desc: "// Eco Champion — amazing!" };
  if (score < 60) return { emoji: "🌍", desc: "// Eco Intermediate — room to grow" };
  if (score < 80) return { emoji: "⚠️", desc: "// High Impact — take action" };
  if (score < 100) return { emoji: "🔴", desc: "// Critical — let's fix this" };
  return { emoji: "🟥", desc: "// Danger zone" };
}

function ProgressBar({ value }) {
  return (
    <Box
      sx={(theme) => ({
        height: 6,
        borderRadius: 999,
        overflow: "hidden",
        bgcolor: alpha(theme.palette.primary.main, 0.1),
      })}
    >
      <Box
        sx={(theme) => ({
          height: "100%",
          width: `${value}%`,
          bgcolor: "primary.main",
          boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.6)}`,
          transition: "width 400ms ease",
        })}
      />
    </Box>
  );
}

function SliderRow({ icon, label, value, min, max, step, unit, onChange }) {
  return (
    <Box>
      <Typography variant="overline" sx={{ color: "text.secondary", display: "flex", gap: 1, alignItems: "center" }}>
        <Box component="span" sx={{ fontSize: 16 }}>
          {icon}
        </Box>
        {label}
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(_, v) => onChange(v)}
          sx={(theme) => ({
            color: theme.palette.primary.main,
            "& .MuiSlider-rail": { opacity: 1, bgcolor: alpha(theme.palette.primary.main, 0.15) },
            "& .MuiSlider-thumb": {
              boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.55)}`,
            },
          })}
        />
        <Typography variant="caption" sx={{ color: "primary.main", minWidth: 70, textAlign: "right" }}>
          {value} {unit}
        </Typography>
      </Stack>
    </Box>
  );
}

export default function OnboardingSection({ setUserData }) {
  const [values, setValues] = useState(defaults);
  useEffect(() => {
    setUserData((prev) => ({ ...prev, ...values }));
  }, [values, setUserData]);

  const score = useMemo(() => computeScore(values), [values]);
  const meta = useMemo(() => scoreMeta(score), [score]);

  const progress = useMemo(() => {
    const changed = Object.keys(defaults).filter((k) => values[k] !== defaults[k]).length;
    return clamp(changed * 25 + 10, 0, 100);
  }, [values]);

  return (
    <SectionShell
      id="onboarding"
      title={
        <>
          Build Your Carbon Twin
        </>
      }
      subtitle="Answer a few quick questions. We'll model your real-world carbon footprint and create your personal digital twin."
    >
      <Box
        sx={{
          px: { xs: 2, md: 8 },
          width: "100%",
          display: "flex",
          justifyContent: "space-between",  
          alignItems: "flex-start",
          gap: 6,                    
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >

        <Box
          sx={{
            width: { xs: "100%", md: "60%" },  
          }}
        >
          <Stack spacing={3}>
            <Box>
              <ProgressBar value={progress} />
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 1 }}>
                BUILDING YOUR TWIN... {progress}%
              </Typography>
            </Box>

            <SliderRow
              icon="🚗"
              label="DAILY TRANSPORT (KM)"
              value={values.transport}
              min={0}
              max={100}
              step={1}
              unit="km"
              onChange={(transport) => setValues((s) => ({ ...s, transport }))}
            />
            <SliderRow
              icon="🍔"
              label="MEAT CONSUMPTION (DAYS/WEEK)"
              value={values.diet}
              min={0}
              max={7}
              step={1}
              unit="days"
              onChange={(diet) => setValues((s) => ({ ...s, diet }))}
            />
            <SliderRow
              icon="💡"
              label="ELECTRICITY USAGE (kWh/month)"
              value={values.elec}
              min={50}
              max={800}
              step={10}
              unit="kWh"
              onChange={(elec) => setValues((s) => ({ ...s, elec }))}
            />
            <SliderRow
              icon="✈️"
              label="FLIGHTS PER YEAR"
              value={values.flight}
              min={0}
              max={20}
              step={1}
              unit="flights"
              onChange={(flight) => setValues((s) => ({ ...s, flight }))}
            />

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                setUserData((prev) => ({
                  ...prev,
                  ...values,
                  created: true,
                }));

                setTimeout(() => {
                  document.getElementById("dashboard")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 100);
              }}
              sx={{ alignSelf: "flex-start" }}
            >
              ⚡ CREATE MY TWIN
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "35%" },   
          }}
        >
          <Paper
            elevation={0}
            sx={(theme) => ({
              height: "100%",
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              position: "relative",
              overflow: "hidden",
            })}
          >
            <Box
              aria-hidden
              sx={(theme) => ({
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                pointerEvents: "none",
              })}
            />

            <Stack spacing={1.25} alignItems="center" sx={{ position: "relative", textAlign: "center" }}>
              <Box
                sx={(theme) => ({
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 48,
                  bgcolor: alpha(theme.palette.primary.main, 0.06),
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.28)}`,
                  boxShadow: `0 0 40px ${alpha(theme.palette.primary.main, 0.14)}`,
                })}
              >
                {meta.emoji}
              </Box>

              <Typography variant="overline" sx={{ color: "text.secondary", mt: 1.5 }}>
                YOUR CARBON SCORE
              </Typography>
              <Typography
                variant="h2"
                sx={(theme) => ({
                  color: "primary.main",
                  textShadow: `0 0 30px ${alpha(theme.palette.primary.main, 0.35)}`,
                  fontWeight: 900,
                })}
              >
                {score}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {meta.desc}
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </SectionShell>
  );
}

