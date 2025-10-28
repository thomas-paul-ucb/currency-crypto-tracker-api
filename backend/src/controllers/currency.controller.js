const CurrencyRate = require('../models/currencyRate.model');

const saveRate = async (req, res) => {
  try {
    const { base, target, rate } = req.body;

    console.log('📥 Incoming request:', req.body);

    const newRate = new CurrencyRate({ base, target, rate });
    await newRate.save();

    res.status(201).json({ message: 'Rate saved successfully', data: newRate });
  } catch (error) {
    console.error('❌ Error saving rate:', error);  // Add this
    res.status(500).json({ message: 'Failed to save rate', error: error.message }); // More specific
  }
};

module.exports = { saveRate };

const getRates = async (req, res) => {
  try {
    const { base, target } = req.query;

    const filter = {};
    if (base) filter.base = base.toUpperCase();
    if (target) filter.target = target.toUpperCase();

    const rates = await CurrencyRate.find(filter).sort({ timestamp: -1 });
    res.status(200).json(rates);
  } catch (error) {
    console.error('❌ Error fetching rates:', error);
    res.status(500).json({ message: 'Failed to fetch rates', error: error.message });
  }
};

module.exports = { saveRate, getRates };

