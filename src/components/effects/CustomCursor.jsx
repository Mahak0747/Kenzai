import { Box, GlobalStyles, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor({ enabled = true }) {
  const theme = useTheme();
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const shouldEnable = enabled && isFinePointer;

  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(0);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!shouldEnable) return;

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [shouldEnable]);

  useEffect(() => {
    if (!shouldEnable) return;
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const tick = () => {
      cursor.style.transform = `translate3d(${pos.x - 6}px, ${pos.y - 6}px, 0)`;

      const rx = ringPos.current.x + (pos.x - ringPos.current.x) * 0.12;
      const ry = ringPos.current.y + (pos.y - ringPos.current.y) * 0.12;
      ringPos.current = { x: rx, y: ry };
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pos, shouldEnable]);

  if (!shouldEnable) return null;

  return (
    <>
      <GlobalStyles
        styles={{
          body: { cursor: "none" },
          "a, button, [role='button'], input, textarea, select, label": { cursor: "none" },
        }}
      />
      <Box
        ref={cursorRef}
        aria-hidden
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: "50%",
          bgcolor: "primary.main",
          zIndex: 9999,
          pointerEvents: "none",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />
      <Box
        ref={ringRef}
        aria-hidden
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.9)}`,
          opacity: 0.55,
          zIndex: 9998,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </>
  );
}

