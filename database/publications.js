const mongoose = require('mongoose');

// Create Publications Schema
const PublicationSchema = mongoose.Schema({
      id: Number,
      name: String,
      books: [String]
});

const PublicationModel = mongoose.model("publications" , PublicationSchema);

module.exports = PublicationModel;