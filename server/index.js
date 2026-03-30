const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Carbon Twin API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.post("/calculate", (req, res) => {
  const { km, transport, electricity, food } = req.body;

  let transportEmission = 0;

  if (transport === "car") transportEmission = km * 0.2;
  else if (transport === "bike") transportEmission = km * 0.1;
  else if (transport === "bus") transportEmission = km * 0.05;

  const electricityEmission = electricity * 0.5;

  const foodEmission = food === "veg" ? 1.5 : 3;

  const totalCarbon =
    transportEmission + electricityEmission + foodEmission;

  res.json({
    totalCarbon,
    breakdown: {
      transportEmission,
      electricityEmission,
      foodEmission,
    },
  });
});