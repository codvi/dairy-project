const express = require('express');
require('./conn/conn.js'); 
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json()); 
const farmerRoutes = require("./routes/farmer.js");
const porductRouter = require('./routes/productRoutes.js');
const salesRouter = require('./routes/salesRoute.js');
const livestockRouter = require('./routes/livestockRoutes.js');
const breedingRoutes = require('./routes/breedingRoutes.js');
const healthRecordrouter = require('./routes/healthRecordRoutes.js');

app.use(farmerRoutes);  
app.use(porductRouter);
app.use(salesRouter); 
app.use(livestockRouter)
app.use(breedingRoutes)
app.use(healthRecordrouter)
app.listen(3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
