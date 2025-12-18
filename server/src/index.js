const express = require('express');
const cors = require('cors');
const path = require("path"); 
const app = express();
const eventRoutes = require('./routes/eventRoutes');
const crewRoutes = require('./routes/crewRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
require('./config/database');

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/crew', crewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bar/product', productRoutes)

const PORT = process.env.PORT || 5000;
app.use("/images", express.static(path.join(__dirname, "../images")));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
