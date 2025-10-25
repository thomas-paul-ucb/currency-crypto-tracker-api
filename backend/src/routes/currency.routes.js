const express = require('express');
const router = express.Router();
const { saveRate } = require('../controllers/currency.controller');

router.post('/rates', saveRate);

module.exports = router;
