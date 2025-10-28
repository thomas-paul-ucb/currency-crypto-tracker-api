const Crypto = require('../models/crypto.model');

const saveCrypto = async (req, res) => {
  try {
    const { name, symbol, priceUsd } = req.body;

    const newCrypto = new Crypto({ name, symbol, priceUsd });
    await newCrypto.save();

    res.status(201).json({ message: 'Crypto saved', data: newCrypto });
  } catch (error) {
    console.error('❌ Error saving crypto:', error);
    res.status(500).json({ message: 'Failed to save crypto', error: error.message });
  }
};

const getCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ timestamp: -1 });
    res.status(200).json(cryptos);
  } catch (error) {
    console.error('❌ Error fetching cryptos:', error);
    res.status(500).json({ message: 'Failed to fetch cryptos', error: error.message });
  }
};

module.exports = { saveCrypto, getCryptos };
