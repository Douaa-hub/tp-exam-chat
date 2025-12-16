const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());

/**
 * Stockage en mémoire
 */
let messages = [];

/**
 * GET /api/messages
 * Retourne tous les messages
 */
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

/**
 * POST /api/messages
 * Ajoute un message
 * Body JSON : { author, content }
 */
app.post('/api/messages', (req, res) => {
  const { author, content } = req.body;

  if (!author || !content) {
    return res.status(400).json({ error: 'author and content are required' });
  }

  const newMessage = {
    author,
    content,
    time: new Date().toISOString()
  };

  messages.push(newMessage);

  res.status(201).json(newMessage);
});

/**
 * Démarrage du serveur
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
