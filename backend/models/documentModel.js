const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = require('../dbConnection/dbconnect');

autoIncrement.initialize(connection);

const documentSchema = new mongoose.Schema({
    
  title: String,
  number: Number,
  files: [String] // Assuming 'files' is an array of file names
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
