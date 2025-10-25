const mongoose = require('mongoose');

const currencyRateSchema = new mongoose.Schema({
  base: { type: String, required: true },
  target: { type: String, required: true },
  rate: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const CurrencyRate = mongoose.model('CurrencyRate', currencyRateSchema);

module.exports = CurrencyRate;
