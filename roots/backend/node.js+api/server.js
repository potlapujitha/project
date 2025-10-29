// server.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Mock AI Detection API
app.post("/api/detect", (req, res) => {
  const { image } = req.body;

  if (!image) return res.status(400).json({ message: "No image provided" });

  // Simulate AI detection (50% chance)
  const isPlant = Math.random() > 0.5;

  const result = isPlant
    ? "✅ It's a plant and looks healthy!"
    : "❌ Not a plant or unhealthy!";

  res.json({ result });
});

app.listen(PORT, () =>
  console.log(`🌿 Server running successfully at http://localhost:${PORT}`)
);
