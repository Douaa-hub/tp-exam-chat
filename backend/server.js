const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Root route (باش ما يطلعش Cannot GET /)
app.get("/", (req, res) => {
  res.send("API is running");
});

// In-memory messages storage
let messages = [];

// Get all messages
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// Add a new message
app.post("/api/messages", (req, res) => {
  const { author, content } = req.body;

  if (!author || !content) {
    return res.status(400).json({ error: "Author and content are required" });
  }

  const message = {
    author,
    content,
    time: new Date().toISOString(),
  };

  messages.push(message);
  res.status(201).json(message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
