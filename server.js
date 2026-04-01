const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Demo data
const users = [
  { id: 1, role: "client", name: "Arjun Mehta", email: "client@example.com" },
  { id: 2, role: "photographer", name: "Riya Kapoor", email: "photo@example.com", rating: 4.8 },
  { id: 3, role: "editor", name: "Karan Singh", email: "editor@example.com", rating: 4.6 }
];

const posts = [
  { id: 1, author: "Riya Kapoor", caption: "Wedding shoot highlight!", likes: 120 },
  { id: 2, author: "Karan Singh", caption: "Edited portrait sample", likes: 85 }
];

// Routes
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.get("/api/users", (req, res) => res.json(users));
app.get("/api/posts", (req, res) => res.json(posts));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
