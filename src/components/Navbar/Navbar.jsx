import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/onboarding") {
      document.getElementById("onboarding")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      navigate("/onboarding");
    }
  };
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={(theme) => ({
        bgcolor: alpha(theme.palette.background.default, 0.82),
        backdropFilter: "blur(18px)",
        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
      })}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1.5, gap: 2 }}>
          <Typography
            variant="h6"
            sx={(theme) => ({
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: theme.palette.primary.main,
              textShadow: `0 0 26px ${alpha(theme.palette.primary.main, 0.45)}`,
              cursor: "pointer",
              userSelect: "none",
            })}
            onClick={() => navigate("/")}
          >
            Kenzai
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleClick}
            sx={{
              ml: { xs: "auto", md: 3 },
              borderRadius: 999,
            }}
          >
            START NOW
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

