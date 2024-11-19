const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUSsyEEbYOOvMMpyWWXOiGigGERnowDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNjE5NDFlYTItNGZkYi00NWE1LWIxMWQtZTM1YzhjNDYx
MmYyIFByb2plY3QgQ0EwHhcNMjQxMTA2MDIwNjE0WhcNMzQxMTA0MDIwNjE0WjA6
MTgwNgYDVQQDDC82MTk0MWVhMi00ZmRiLTQ1YTUtYjExZC1lMzVjOGM0NjEyZjIg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAM1732cu
KDleOX+latkQKIq0t4FMKAz3QV+Wd25NoTcJqW53oWNLzaU4EGO+9gRMVQ4HK9mU
eDflaVyiZtKYZmjkQ/UjzQ7nm5qMXaK8biAjeBALfa5TKIGDyh1GWnbos0B8Mg3Z
3bE8K8AYdfXW+K0sX5yw/KthVcHnVWfwDgxA/5MiCzwQSNaMiI+qeKj2dOeYGd0m
7D8C3oTuVIyUk4xXrz/3dv7OlDewY948Z60eKdEUBtXcB9f1C674iOHsUnGT3zcL
MHzEgOrjPnjfEhqk7RPUt3p6G514iq8xyFzKMHd+JiEypq18n9y453BI4pA6MnHZ
m4+36hRwK+7fyFW3O0b+DgXp0nUwNiTEPZ9YZ9XcyV2iDnyVbET1iOiGAUmM/TD9
fq9Aquduhg0ndq6gAUz31dz760RUF5hG7pL+R850+pME0AJ/8Zxigzv2pnRpbW9T
9B2ipBc8l1TslOS6Uj8eEkjcGk+yrlmuE/cOi8cFpgunTAav4mLSHOJGiQIDAQAB
oz8wPTAdBgNVHQ4EFgQUe1vbBBv9NpPjD09VVlJLASm5axgwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBADku9Co02N3IVntZ
dX2X/gZMM/Ec1KWTCRt9Wmk/dYJNcuMpEou2cSNpXUPDCu1+Y73ld/ME1Ygqhbxb
cagnFZw56xg6lmeD6PzrembqFbVZ85pL7guSnErJVgrkH8ou/jj4RnuT2ZA9X6PD
j+ZOLOboUubsmXSsBeGbYbNKR/Ob6bLyonpJhFV18rjmuQ6NC1boSFRiu+tgzPMV
MGVzt3uNIWGwekAb+BjfUMrqhguFwQAkyHYINFnIIwdfIgXKhfviP3doNoPcqQfS
UFMacFqFIqzJTA+z0P/QhgDAy9/Qn/PchJ+tH3rNFf03rNpnl4gV6z33IeTFsVO5
L+EihZos72ET3DlDP8oBvj5UD1HGeop/m+SMQgOd6r+jvkOlRnZFUPneruRHMIPC
XJKt+UcyV9Zv4tG5buLV04VpU4HD5BAqHlA/QnXg0huB1tx2Z+MvG5ByewNtzYp/
Lw68Q8lN6/kYZPSU68B3CcCoWfqKodobH2Pbe93je6obV8VC0A==
-----END CERTIFICATE-----`   // Atur ini sesuai dengan kebijakan keamanan Anda
  },
});
pool.connect()
  .then(() => console.log('Connected to PostgreSQL database!'))
  .catch(err => console.error('Connection error', err.stack));

// API Endpoints
app.get("/siswa", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jumlah_siswa");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/guru", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jumlah_guru");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/sekolah", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jumlah_sekolah");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});
// 404 Route
app.use((req, res) => {
  res.status(404).json({ error: "404 not found" });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/siswa`);
});
