import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// 🔹 Carbon Score API
app.post("/api/calculate", (req, res) => {
  const { transport, diet, elec, flight } = req.body;

  const score = Math.round(
    20 +
    (transport / 100) * 30 +
    (diet / 7) * 20 +
    ((elec - 50) / 750) * 20 +
    (flight / 20) * 10
  );

  const emissions =
    transport * 0.05 +
    diet * 0.3 +
    elec * 0.01 +
    flight * 0.5;

  res.json({
    score,
    emissions: emissions.toFixed(1),
  });
});

// 🔹 Simulation API
app.get("/", (req, res) => {
  res.send("Kenzai backend is live 🚀");
});
app.post("/api/simulate", (req, res) => {
  const { transport, diet, elec, flight, toggles } = req.body;

  const base =
    transport * 0.05 +
    diet * 0.3 +
    elec * 0.01 +
    flight * 0.5;

  const savings = { 1: 0.8, 2: 0.6, 3: 0.5, 4: 0.4 };

  let totalSave = 0;
  Object.keys(toggles).forEach((k) => {
    if (toggles[k]) totalSave += savings[k];
  });

  const future = Math.max(1.2, base - totalSave);

  res.json({
    base: base.toFixed(1),
    future: future.toFixed(1),
    saved: totalSave.toFixed(1),
  });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));