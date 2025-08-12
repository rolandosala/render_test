// Example for Express.js
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

/* app.use(cors({
  origin: "https://your-frontend.vercel.app", // replace with your actual Vercel URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
})); */
app.use(express.json());
app.use(cors());
const db = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

app.get("/fetchdata", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM sample_tbl");
    res.json(rows);
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    res.status(500).json({ error: "Failed to connect to MySQL" });
  }

});
app.post('/createdata', async (req, res) => {
  try {
    const { firstname, lastname, birthdate } = req.body;
    console.log("Received data:", { firstname, lastname, birthdate });
    const [result] = await db.query("INSERT INTO sample_tbl (firstname, lastname, data) VALUES (?, ?, ?)", [firstname, lastname, birthdate]);
    res.status(201).json({
      id: result.insertId
    })
  } catch (error) {
    console.error("Error inserting data into MySQL:", error);
    res.status(500).json({ error: "Failed to insert data into MySQL" });
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
