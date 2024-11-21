require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./src/middleware/errorHandler");

// Routers
const siswaRouter = require("./src/routes/siswa");
const guruRouter = require("./src/routes/guru");
const sekolahRouter = require("./src/routes/sekolah");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Route utama (root) untuk menunjukkan API berjalan
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is up and running!" });
});

// Routes
app.use("/siswa", siswaRouter);
app.use("/guru", guruRouter);
app.use("/sekolah", sekolahRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
