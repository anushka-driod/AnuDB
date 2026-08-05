const express = require("express");
const pool = require("./database/db");
require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");
    res.send("🎉 Welcome to AnuDB! Database Connected Successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Connection Failed");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});