// Example for Express.js
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT
});


db.connect(err => {
  if (err) throw err;
  console.log("Connected to Clever Cloud MySQL!");
});

app.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM sample_tbl");
    res.json(rows);
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    res.status(500).json({ error: "Failed to connect to MySQL" });
  }

});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
