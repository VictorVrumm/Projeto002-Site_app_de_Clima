require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

const API_KEY = process.env.API_Key;

app.use(cors());

app.get("/api/key", (req, res) => {
  res.json({ apiKey: API_KEY });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
