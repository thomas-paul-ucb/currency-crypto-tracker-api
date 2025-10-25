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
