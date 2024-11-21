const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM jumlah_guru");
    res.json(result.rows);
  } catch (error) {
    next(error); // Oper error ke middleware
  }
});

module.exports = router;
