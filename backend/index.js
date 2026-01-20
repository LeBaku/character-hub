require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const characterRoutes = require('./routes/characters');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/characters', characterRoutes);

app.listen(PORT, () => {
    console.log(`Serv running on port ${PORT}`);
});