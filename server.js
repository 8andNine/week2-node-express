const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: JSON parsing
app.use(express.json());

// Custom logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Serve static HTML at /
app.use(express.static(path.join(__dirname, "public")));

// GET /
app.get("/api", (req, res) => {
  res.send("My Week 2 API!");
});

// POST /user
app.post("/user", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required",
    });
  }

  res.json({
    message: `Hello, ${name}!`,
  });
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: `User ${id} profile`,
  });
});

// Global error handler 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});