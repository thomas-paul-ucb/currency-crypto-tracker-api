const express = require('express');
const router = express.Router();
const { saveCrypto, getCryptos, getLiveCrypto } = require('../controllers/crypto.controller');

router.post('/crypto', saveCrypto);
router.get('/crypto', getCryptos);
router.get('/crypto/live', getLiveCrypto);

module.exports = router;
