// server/src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { getEvents, createEvent } = require('./controllers/EventController');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize DB & start server
async function init() {
  try {
    await sequelize.authenticate();
    console.log('Database connected ✅');

    await sequelize.sync({ alter: false }); // don't change existing table
    console.log('Models synced ✅');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Database connection error ❌', err);
  }
}
init();

// Routes
app.get('/api/events', getEvents);
app.post('/api/events', createEvent);
