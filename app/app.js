const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  host: process.env.DB_HOST,  
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    
    res.send({
      message: "Time",
      data: result.rows
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});