const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../flappy_bird_infog/public/index.html')));
app.get('/game', (req, res) => res.sendFile(path.join(__dirname, '../flappy_bird_infog/public/game.html')));
app.get('/mechanics', (req, res) => res.sendFile(path.join(__dirname, '../flappy_bird_infog/public/mechanics.html')));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
