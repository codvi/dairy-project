const express = require('express');
const router = express.Router();
const { register, login, updateFarmer, deleteFarmer, getFarmer } = require('../middleware/farmer');
const verifyToken = require('../middleware/jwtVerify');

router.post('/register', register);
router.post('/login', login);
router.post('/updateFarmer', verifyToken, updateFarmer); 
router.post('/deleteFarmer', verifyToken, deleteFarmer);
router.get('/getFarmer', verifyToken, getFarmer);

module.exports = router;
