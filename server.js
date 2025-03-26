const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, './public')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './src/index.html')));
app.get('/game.html', (req, res) => res.sendFile(path.join(__dirname, './src/game.html')));
app.get('/mechanics.html', (req, res) => res.sendFile(path.join(__dirname, './src/mechanics.html')));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
