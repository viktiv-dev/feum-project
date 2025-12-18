const express = require('express');
const cors = require('cors');
const path = require("path"); 
const app = express();
const eventRoutes = require('./routes/eventRoutes');
const crewRoutes = require('./routes/crewRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const drinkRoutes = require('./routes/drinkRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes.js')
const barSaleRoutes = require('./routes/barSaleRoutes.js')
require('./config/database');

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/crew', crewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bar/products', productRoutes);
app.use('/api/bar/drinks', drinkRoutes);
app.use('/api/bar/inventories', inventoryRoutes);
app.use('/api/bar/sales', barSaleRoutes)

const PORT = process.env.PORT || 5000;
app.use("/images", express.static(path.join(__dirname, "../images")));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
