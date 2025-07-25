// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static('src'));

app.post('/api/ask', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemma-1.1-2b:generateContent?key=" + process.env.GEMMA_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const json = await response.json();
    const reply = json.candidates[0].content.parts[0].text;
    res.json({ response: reply });
  } catch (error) {
    res.status(500).json({ error: 'Gagal merespons dari Gemma API' });
  }
});

app.listen(3000, () => console.log("Zorey AI running on http://localhost:3000"));
