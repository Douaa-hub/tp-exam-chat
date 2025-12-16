const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Root route (HTML page باش ما يطلعش Error في Classroom)
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Mini Chat Backend</title>
      </head>
      <body>
        <h2>Mini Chat Backend</h2>
        <p>API is running.</p>
      </body>
    </html>
  `);
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
