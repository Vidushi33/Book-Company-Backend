const mongoose = require('mongoose');

// Create Authors Schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

const AuthorModel = mongoose.model("authors" , AuthorSchema);

module.exports = AuthorModel;