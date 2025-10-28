const express = require('express');
const router = express.Router();
const { saveRate, getRates } = require('../controllers/currency.controller');

router.post('/rates', saveRate);
router.get('/rates', getRates);

module.exports = router;
