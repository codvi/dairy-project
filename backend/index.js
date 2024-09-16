const express = require('express');
require('./conn/conn.js'); 
const cors = require('cors');
const __dirnam = path.resolve();
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
const expenseRouter = require('./routes/expenseRoutes.js');
const netEarningRoute = require('./routes/netEarning.js');
const aiRoute = require('./routes/aiRoute.js');
const notificationRoutes = require('./routes/notificationRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
app.use(farmerRoutes);  
app.use(porductRouter);
app.use(salesRouter); 
app.use(livestockRouter);
app.use(breedingRoutes);
app.use(healthRecordrouter);
app.use(expenseRouter);
app.use(netEarningRoute);
app.use(aiRoute)
app.use(notificationRoutes)
app.use('/admin',adminRoutes)
app.listen(3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
