import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        pt: { xs: 12, sm: 14 },
        pb: { xs: 8, sm: 10 },
        position: "relative",
        overflow: "hidden",
      })}
    >
      <Box
        aria-hidden
        sx={(theme) => ({
          position: "absolute",
          inset: 0,
          opacity: 0.9,
          backgroundImage: `
            linear-gradient(${alpha(theme.palette.primary.main, 0.05)} 1px, transparent 1px),
            linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.05)} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000 40%, transparent 100%)",
          pointerEvents: "none",
        })}
      />
      <Box
        aria-hidden
        sx={(theme) => ({
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: "50%",
          filter: "blur(90px)",
          background: alpha(theme.palette.primary.main, 0.08),
          top: -120,
          left: -120,
          pointerEvents: "none",
        })}
      />
      <Box
        aria-hidden
        sx={(theme) => ({
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          filter: "blur(90px)",
          background: alpha(theme.palette.primary.main, 0.06),
          bottom: -90,
          right: -90,
          pointerEvents: "none",
        })}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              position: "relative",
              width: "fit-content",
              mx: "auto",
              mb: 2,
            }}
          >
            <Box
              sx={(theme) => ({
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: 160, sm: 200, md: 260 },
                height: { xs: 160, sm: 200, md: 260 },
                borderRadius: "50%",
                background: alpha(theme.palette.primary.main, 0.25),
                filter: "blur(60px)",
                zIndex: 0,
              })}
            />
            <Box
              component="img"
              src="/1.jpeg"
              alt="Carbon Twin"
              sx={{
                position: "relative",
                zIndex: 1,
                width: { xs: 120, sm: 160, md: 200 },
                display: "block",
                borderRadius: 2,
              }}
            />
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 44, sm: 72, md: 96 },
              mb: 1.5,
            }}
          >
            Meet Your
            <br />
            <Box component="span" sx={{ color: "primary.main" }}>
              Carbon Twin
            </Box>
          </Typography>

          <Typography sx={{ color: "text.secondary", maxWidth: 720, mx: "auto", lineHeight: 1.8, mb: 5 }}>
            Understand your impact on the planet.{" "}
            <Box component="span" sx={{ color: "text.primary" }}>
              Simulate your future.
            </Box>{" "}
            Make choices that matter — for you and for the Earth.
          </Typography>

          <Box textAlign="center">
            <Button variant="contained" color="primary" size="large" onClick={() => navigate("/onboarding")}>
              ▶ START YOUR JOURNEY
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

