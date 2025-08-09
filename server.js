// Example for Express.js
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




app.get("/", (req, res) => {
  db.connect(err => {
    if (err) throw err;
    res.json({ message: "Connected to MySQL!" });
    console.log("Connected to Clever Cloud MySQL!");
  });
  
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
