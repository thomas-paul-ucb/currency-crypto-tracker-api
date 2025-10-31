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
    const { symbol, name } = req.query;

    const filter = {};
    if (symbol) filter.symbol = new RegExp(symbol, 'i'); // case-insensitive
    if (name) filter.name = new RegExp(name, 'i');

    const cryptos = await Crypto.find(filter).sort({ timestamp: -1 });
    res.status(200).json(cryptos);
  } catch (error) {
    console.error('❌ Error fetching cryptos:', error);
    res.status(500).json({ message: 'Failed to fetch cryptos', error: error.message });
  }
};

const axios = require('axios');

const getLiveCrypto = async (req, res) => {
  const { symbol = 'bitcoin' } = req.query;

  try {
    // 1. Fetch live price from CoinGecko
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
      params: {
        ids: symbol.toLowerCase(),
        vs_currencies: 'usd'
      }
    });

    const price = response.data[symbol.toLowerCase()]?.usd;

    if (!price) {
      return res.status(404).json({ message: 'Crypto not found or invalid symbol' });
    }

    // 2. Save to MongoDB
    const saved = new Crypto({
      name: symbol.toUpperCase(),
      symbol: symbol.toLowerCase(),
      priceUsd: price
    });

    await saved.save();

    // 3. Respond with success message
    res.status(201).json({
      message: 'Fetched and saved successfully',
      data: {
        name: saved.name,
        symbol: saved.symbol,
        priceUsd: saved.priceUsd,
        timestamp: saved.timestamp
      }
    });

  } catch (error) {
    console.error('❌ Error in getLiveCrypto:', error.message);
    res.status(500).json({ message: 'Failed to fetch or save', error: error.message });
  }
};



module.exports = { saveCrypto, getCryptos, getLiveCrypto };
