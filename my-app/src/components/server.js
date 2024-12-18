// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Use CORS and Body Parser middleware
app.use(cors());
app.use(bodyParser.json());

// Hardcoded user data (you can replace this with a database in real-world use)
const users = [{ email: "admin@example.com", password: "admin123" }];

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({ message: "Email atau password salah." });
  }

  // Check if password matches
  if (user.password !== password) {
    return res.status(400).json({ message: "Email atau password salah." });
  }

  // Login successful, return a simple success message (no JWT)
  return res.status(200).json({ message: "Login berhasil!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
