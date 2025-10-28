const express = require('express');
const router = express.Router();
const { saveCrypto, getCryptos } = require('../controllers/crypto.controller');

router.post('/crypto', saveCrypto);
router.get('/crypto', getCryptos);

module.exports = router;
