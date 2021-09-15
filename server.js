'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(cors());

const PORT = process.env.PORT;
server.use(express.json());
//MongoDB
const mongoose = require('mongoose');

let bookModel;
main().catch(err => console.log(err));

async function main() {
    // await mongoose.connect('mongodb://localhost:27017/301-books');
    await mongoose.connect(process.env.MONGO_URL);


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
        bookStatus: 'Available',
        ownerEmail: 'farouk9435@gmail.com'
    });

    const HarryPotter2 = new bookModel({
        bookTitle: `Harry Potter and the Chamber of Secrets`,
        bookDescription: `Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series.`,
        bookStatus: 'Available',
        ownerEmail: 'farouk9435@gmail.com'
    });

    const HarryPotter3 = new bookModel({
        bookTitle: `Harry Potter and the Prisoner of Azkaban`,
        bookDescription: `Harry Potter and the Prisoner of Azkaban is a fantasy novel written by British author J. K. Rowling and is the third in the Harry Potter series. The book follows Harry Potter, a young wizard, in his third year at Hogwarts School of Witchcraft and Wizardry.`,
        bookStatus: 'Available',
        ownerEmail: 'farouk9435@gmail.com'
    });


    await HarryPotter1.save();
    await HarryPotter2.save();
    await HarryPotter3.save();
}


//Routes
server.get('/', homeHandler);
server.get('/book', getBooksHandler);
server.post('/books', addBooks);
server.delete('/books/:id', deleteBook);
server.put('/updatebooks/:id', updatebookHandler);

//Functions Handlers
function homeHandler(req, res) {

    res.send('Home Page');
}

function getBooksHandler(req,res){
    //send fav cats list (email)
    const email = req.query.email;
    bookModel.find({ownerEmail:email},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    })
}




async function addBooks(req, res) {
    console.log(req.body);
    const bookTitle = req.body.bookTitle;
    const bookDescription = req.body.bookDescription;
    const bookStatus = req.body.bookStatus;
    const bookEmail = req.body.bookEmail;
    await bookModel.create({
        bookTitle: bookTitle,
        bookDescription: bookDescription,
        bookStatus: bookStatus,
        bookEmail: bookEmail
    });

    bookModel.find({ ownerEmail: bookEmail }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })

}



function deleteBook(req, res) {
    const bookId = req.params.id;
    const email = req.query.email;
    bookModel.deleteOne({ _id: bookId }, (err, result) => {

        bookModel.find({ ownerEmail: email }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        })

    })


}



function updatebookHandler(req, res) {
    const id = req.params.id;
    const { bookTitle, bookDescription, bookStatus, bookEmail } = req.body;

    bookModel.findByIdAndUpdate(id, { bookTitle, bookDescription, bookStatus, bookEmail }, (err, result) => {
        bookModel.find({ ownerEmail: bookEmail }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        })
    })
}


server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})