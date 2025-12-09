const express = require('express');
const app = express();
const eventRoutes = require('./routes/eventRoutes');
const crewRoutes = require('./routes/crewRoutes')
require('./config/database');

app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/crew', crewRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
