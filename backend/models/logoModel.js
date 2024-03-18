
const mongoose = require('mongoose')

const logoSchema = mongoose.Schema({
  logo: { type: {} },
});

const LogoModel = mongoose.model("logo", logoSchema);

module.exports = { LogoModel };
