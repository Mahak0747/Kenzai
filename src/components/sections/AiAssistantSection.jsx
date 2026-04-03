import { Box, Button, Chip, Paper, Stack, TextField, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useMemo, useRef, useState } from "react";
import SectionShell from "./SectionShell";

const quickAsks = [
  "How can I improve?",
  "What's my biggest impact?",
  "Green diet tips",
  "Renewable energy options",
];

const canned = {
  "how can i improve":
    "Your biggest win: switch to metro or cycle for your daily commute. That alone cuts 0.8t/year 🚲. Next, try plant-based meals 3x/week — saves another 0.6t!",
  "what's my biggest impact":
    "Transport is your highest-impact area. Switching to public transit (or reducing daily car kms) is the fastest way to drop your score. 🚌",
  "green diet tips":
    'Try "Meatless Monday + Wednesday". Lentils, paneer, tofu are great protein sources with far lower carbon intensity than red meat. Even small changes add up! 🥗',
  "renewable energy options":
    "If rooftop solar is available, it’s one of the best long-term levers. Also check if your utility offers a green tariff or renewable add-on. ☀️",
};

function pickReply(text) {
  const lower = text.toLowerCase();
  const key = Object.keys(canned).find((k) => lower.includes(k));
  if (key) return canned[key];
  return "Great question. Based on your profile, I’d start with transport first — it’s usually the biggest lever. Then tackle diet and home energy for steady, compounding savings over the year.";
}

function MessageBubble({ role, text }) {
  const isBot = role === "bot";
  return (
    <Box sx={{ alignSelf: isBot ? "flex-start" : "flex-end", maxWidth: { xs: "100%", sm: "75%" } }}>
      <Typography
        variant="overline"
        sx={{
          display: "block",
          mb: 0.5,
          color: isBot ? "primary.main" : "text.secondary",
          textAlign: isBot ? "left" : "right",
        }}
      >
        {isBot ? "KenzAI" : "YOU"}
      </Typography>
      <Paper
        elevation={0}
        sx={(theme) => ({
          p: 2,
          borderRadius: 2.5,
          bgcolor: alpha(theme.palette.primary.main, isBot ? 0.07 : 0.12),
          borderColor: alpha(theme.palette.primary.main, isBot ? 0.15 : 0.25),
          borderLeft: isBot ? `3px solid ${theme.palette.primary.main}` : "none",
        })}
      >
        <Typography variant="caption" sx={{ color: "text.primary", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
          {text}
        </Typography>
      </Paper>
    </Box>
  );
}

export default function AiAssistantSection() {
  const initial = useMemo(
    () => [
      {
        role: "bot",
        text: "Namaste! 🌍 I'm your KenzAI. I've analyzed your carbon profile. Your biggest opportunity is transport — switching to metro could save ~0.8t CO₂/year. What would you like to explore?",
      },
    ],
    [],
  );

  const [messages, setMessages] = useState(initial);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");

    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: pickReply(trimmed) }]);
      window.setTimeout(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      }, 0);
    }, 650);
  };

  return (
    <SectionShell
      id="ai"
      bgVariant="panel"
      title={
        <>
          Ask
          <br />
          KenzAI 🤖
        </>
      }
      subtitle="Your personal AI guide. Ask anything about your footprint, habits, or how to make a bigger impact."
    >
      <Paper
        elevation={0}
        sx={(theme) => ({
          overflow: "hidden",
          bgcolor: alpha(theme.palette.primary.main, 0.03),
        })}
      >
        <Box
          sx={(theme) => ({
            px: { xs: 2.5, sm: 3.5 },
            py: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.07),
            borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          })}
        >
          <Box
            sx={(theme) => ({
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: theme.palette.primary.main,
              boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.6)}`,
            })}
          />
          <Typography variant="caption" sx={{ color: "primary.main" }}>
            KenzAI AI — ONLINE
          </Typography>
        </Box>

        <Stack
          ref={listRef}
          spacing={2.25}
          sx={{
            px: { xs: 2.5, sm: 3.5 },
            py: 3,
            minHeight: 280,
            maxHeight: 380,
            overflowY: "auto",
          }}
        >
          {messages.map((m, idx) => (
            <MessageBubble key={idx} role={m.role} text={m.text} />
          ))}
        </Stack>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ px: { xs: 2.5, sm: 3.5 }, pb: 2 }}>
          {quickAsks.map((q) => (
            <Chip
              key={q}
              label={q}
              variant="outlined"
              onClick={() => send(q)}
              sx={(theme) => ({
                borderRadius: 999,
                borderColor: alpha(theme.palette.primary.main, 0.22),
                color: theme.palette.text.secondary,
                bgcolor: "transparent",
                fontFamily: theme.typography.caption.fontFamily,
                letterSpacing: "0.06em",
                "&:hover": { borderColor: theme.palette.primary.main, color: theme.palette.primary.main },
              })}
            />
          ))}
        </Stack>

        <Box
          sx={(theme) => ({
            px: { xs: 2.5, sm: 3.5 },
            py: 2.25,
            borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
            display: "flex",
            gap: 1.5,
            alignItems: "center",
          })}
        >
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send(input);
            }}
            placeholder="Ask KenzAI anything..."
            fullWidth
            size="small"
            InputProps={{
              sx: (theme) => ({
                fontFamily: theme.typography.caption.fontFamily,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }),
            }}
          />
          <Button variant="contained" color="primary" onClick={() => send(input)} sx={{whiteSpace:"nowrap"}}>
            SEND →
          </Button>
        </Box>
      </Paper>
    </SectionShell>
  );
}

