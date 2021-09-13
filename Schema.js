const { model } = require("mongoose");

const mongoose = require('mongoose');


let bookModel;

async function main() {
    await mongoose.connect('mongodb://localhost:27017/301-books');

    const bookSchema = new mongoose.Schema({
        bookTitle: String,
        bookDescription: String,
        bookStatus: String,
        bookEmail: String
    });

    bookModel = mongoose.model('book', bookSchema);

      seedData();
}

module.exports = main;