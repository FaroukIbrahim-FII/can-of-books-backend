'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(cors());

const PORT = process.env.PORT;

//MongoDB
const mongoose = require('mongoose');

// const main = require('./Schema')


let bookModel;
main().catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://localhost:27017/301-books');

    const bookSchema = new mongoose.Schema({
        bookTitle: String,
        bookDescription: String,
        bookStatus: String,
        bookEmail: String
    });

    bookModel = mongoose.model('book', bookSchema);

    //   seedData();
}

//seeding a data function 

async function seedData() {
    const HarryPotter1 = new bookModel({
        bookTitle: `Harry Potter and the Philosopher's Stone`,
        bookDescription: `Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling.`,
        bookStatus: 'available',
        ownerEmail: 'farouk9435@gmail.com'
    });

    const HarryPotter2 = new bookModel({
        bookTitle: `Harry Potter and the Chamber of Secrets`,
        bookDescription: `Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series.`,
        bookStatus: 'available',
        ownerEmail: 'farouk9435@gmail.com'
    });

    const HarryPotter3 = new bookModel({
        bookTitle: `Harry Potter and the Prisoner of Azkaban`,
        bookDescription: `Harry Potter and the Prisoner of Azkaban is a fantasy novel written by British author J. K. Rowling and is the third in the Harry Potter series. The book follows Harry Potter, a young wizard, in his third year at Hogwarts School of Witchcraft and Wizardry.`,
        bookStatus: 'available',
        ownerEmail: 'farouk9435@gmail.com'
    });


    await HarryPotter1.save();
    await HarryPotter2.save();
    await HarryPotter3.save();
}


//Routes
server.get('/', homeHandler);
server.get('/books', getBooksHandler);

//Functions Handlers
function homeHandler(req, res) {

    res.send('Home Page');
}

function getBooksHandler(req, res) {
    //send fav cats list (email)
    const email = req.query.email;
    bookModel.find({ ownerEmail: email }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
}

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})
