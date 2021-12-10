// const db = require("./database");
require('dotenv').config()
const express = require("express");
// const { MongoClient } = require('mongodb');

const BookModel = require("./database/books.js");
const AuthorModel = require("./database/authors.js");
const PublicationModel = require("./database/publications.js");

const app = express();
app.use(express.json());

// Import The MONGOOSE Module and Establishing MongoDB Connection
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB , { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("CONNECTION ESTABLISHED"));


// const uri = "mongodb+srv://Vidushi_Malik:vidushi1221@cluster0.flxrw.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const bcollection = client.db("book-company").collection("books").findOne(cccccc);
//   bcollection.then((data) => console.log(data)).catch((err) => console.log(err));
  
// });

// opening of page
app.get("/" , (req, res) => {
    return res.json({"Welcome" : `to the backend software for the book company`});
});


// FOR BOOKS

// for all books
app.get("/books" , async(req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

// for specific book according to isbn
app.get("/book-isbn/:isbn" , async(req, res) => {
    // console.log(req.params);
    const isbn = req.params.isbn;
    // console.log(isbn);
    const getSpecificBook = await BookModel.findOne({ISBN : isbn});
    // console.log(getSpecificBook);
    

    if(getSpecificBook === null){
        return res.json({"error" : `No book found for the ISBN of ${isbn}`});
    }

    return res.json(getSpecificBook);
})

// for specific books according to category
app.get("/book-category/:category" , async(req, res) => {
    // console.log(req.params);
    const category = req.params.category;
    // console.log(category);
    const getSpecificBooks = await BookModel.find({category : category});
    // console.log(getSpecificBooks);
    // console.log(getSpecificBooks.length);
    
    if(getSpecificBooks.length === 0){
        return res.json({"error" : `No book is found for the category of ${category}`});
    }

    return res.json(getSpecificBooks);
})


// FOR AUTHORS

// for all authors
app.get("/authors", async(req, res) => {
    const getAllAuthors = await AuthorModel.find();
    // console.log(getAllAuthors);
    return res.json(getAllAuthors);
});

// for specific author according to id
app.get("/author-id/:id", async(req, res) => {
    // console.log(req.params);
    var id = req.params.id;
    id = Number(id);
    // console.log(id);
    const getSpecificAuthor = await AuthorModel.findOne({id : id});
    // console.log(getSpecificAuthor);
    // console.log(getSpecificAuthor.length);
    if (getSpecificAuthor ===null){
        return res.json({"error" : `No author found with the id of ${id}`});
    }
    return res.json(getSpecificAuthor);
})

// for specific author by name
app.get("/author-name/:name", async(req, res) => {
    // console.log(req.params);
    var name = req.params.name;
    // console.log(name);
    const getSpecificAuthorByName = await AuthorModel.find({name : name});
    // console.log(getSpecificAuthorByName);
    // console.log(getSpecificAuthorByName.length);
    if (getSpecificAuthorByName.length ===0){
        return res.json({"error" : `No author found with the name of ${name}`});
    }
    return res.json(getSpecificAuthorByName);
})


// for specific authors using isbn
app.get("/author-isbn/:isbn", async (req, res) => {
    // console.log(req.params);
    const isbn = req.params.isbn;
    // console.log(isbn);
    const getSpecificAuthors = await AuthorModel.find({books : isbn});
    // console.log(getSpecificAuthors);
    // console.log(getSpecificAuthors.length);
    if (getSpecificAuthors.length ===0){
        return res.json({"error" : `No author found with the isbn of ${isbn}`});
    }
    return res.json(getSpecificAuthors);
})

// FOR PUBLICATIONS

// for all publications
app.get("/publications", async(req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});

// for specific publication using isbn
app.get("/publication-isbn/:isbn", async(req, res) => {
    // console.log(req.params);
    const isbn = req.params.isbn;
    // console.log(isbn);
    const getSpecificPublications = await PublicationModel.findOne({ books : isbn});
    // console.log(getSpecificPublications);
    // console.log(getSpecificPublications.length);
    if (getSpecificPublications ===null){
        return res.json({"error" : `No author found with the isbn of ${isbn}`});
    }
    return res.json(getSpecificPublications);
})

// for specific publication using name
app.get("/publication-name/:name", async(req, res) => {
    // console.log(req.params);
    var name = req.params.name;
    // console.log(name);
    const getSpecificPublicationByName = await PublicationModel.find({name: name});
    // console.log(getSpecificPublicationByName);
    // console.log(getSpecificPublicationByName.length);
    if (getSpecificPublicationByName.length ===0){
        return res.json({"error" : `No author found with the name of ${name}`});
    }
    return res.json(getSpecificPublicationByName);
})

// for specific publication according to id
app.get("/publication-id/:id", async(req, res) => {
    // console.log(req.params);
    var id = req.params.id;
    id = Number(id);
    // console.log(id);
    const getSpecificPublication = await PublicationModel.findOne({id : id});
    // console.log(getSpecificAuthor);
    // console.log(getSpecificAuthor.length);
    if (getSpecificPublication ===null){
        return res.json({"error" : `No author found with the id of ${id}`});
    }
    return res.json(getSpecificPublication);
})




// POST APIs
// to post a new book
app.post("/book", async(req, res) => {
    // console.log(req.body);
    const addNewBook = await BookModel.create(req.body);
    return res.json({
        bookAdded : addNewBook,
        message : "Book was Added!!"
    });
})

// to post a new author
app.post("/author", async(req, res) => {
    // console.log(req.body);
    const addNewAuthor = await AuthorModel.create(req.body);
    return res.json({
        authorAdded: addNewAuthor,
        message : "Author was Added!!!"
    });
})

// to post a new publication
app.post("/publication", async(req, res) => {
    // console.log(req.body);
    const addNewPublication = await PublicationModel.create(req.body);
    return res.json({
        publicationAdded : addNewPublication,
        message : "Publication was Added!!!"
    });
})


// PUT API's
// to update book using ISBN
app.put("/book-update/:isbn", async(req,res) => {
    // console.log(req.body);
    // console.log(req.params);
    const isbn = req.params.isbn;
    const updateBook = await BookModel.findOneAndUpdate({ISBN : isbn} , req.body , {new : true});
    return res.json({
        bookUpdated : updateBook, 
        message : "Book is Updated!!"
    });
})

// to update author using id
app.put("/author-update/:id" , async(req, res) =>{
    // console.log(req.body);
    // console.log(req.params);
    let id = req.params.id;
    id = Number(id);
    const updateAuthor = await AuthorModel.findOneAndUpdate({id : id}, req.body , {new:true});
    return res.json({
        authorUpdated : updateAuthor,
        message : "Author was Updated!!"
    });
})

// to update publication using id
app.put("/publication-update/:id" , async(req, res) =>{
    // console.log(req.body);
    // console.log(req.params);
    let id = req.params.id;
    id = Number(id);
    const updatePublication = await PublicationModel.findOneAndUpdate({id:id} , req.body , {new:true});
    return res.json({
        publicationUpdated : updatePublication,
        message : "Publication was updated!!!"
    });
})


// DELETE API's
// to delete book using isbn
app.delete("/book-delete/:isbn" , async(req, res) => {
    // console.log(req.params);
    const isbn = req.params.isbn;
    const deleteBook = await BookModel.deleteOne({ISBN : isbn});
    return res.json({
        bookDeleted : deleteBook,
        message : "Book was Deleted!!"
    });
})

// to delete author using id
app.delete("/author-delete/:id" , async(req, res) => {
    // console.log(req.params);
    var id = req.params.id;
    id = Number(id)
    const deleteAuthor = await AuthorModel.deleteOne({id : id});
    return res.json({
        bookDeleted : deleteAuthor,
        message : "Author was Deleted!!"
    });
})

// to delete publication using id
app.delete("/publication-delete/:id" , async(req, res) => {
    // console.log(req.params);
    var id = req.params.id;
    id = Number(id)
    const deletePublication = await PublicationModel.deleteOne({id : id});
    return res.json({
        publicationDelete : deletePublication,
        message : "Publication was deleted!!!"
    });
})


// to delete an author from a book
app.delete("/book-author-delete/:isbn/:id" , async(req, res) => {
    // console.log(req.params);
    let {isbn, id} = req.params;
    let getSpecificBook = await BookModel.findOne({ISBN : isbn});

    if(getSpecificBook === null)
    {
        return res.json({"error" : `No author found with the ISBN of ${isbn}`}); 
    }
    else
    {
        getSpecificBook.authors.remove(id);
        const updateBook = await BookModel.findOneAndUpdate({ISBN : isbn} , getSpecificBook , {new: true});
        return res.json({
            bookUpdated : updateBook,
            message : "Author was deleted from the Book"
        });
    }
})

// to delete a book from author
app.delete("/author-book-delete/:id/:isbn" , async(req, res) => {
    // console.log(req.params);
    let {id, isbn} = req.params;
    id = Number(id);
    let getSpecificAuthor = await AuthorModel.findOne({id : id});

    if(getSpecificAuthor === null)
    {
        return res.json({"error" : `No author found with the id of ${id}`});    
    }
    else
    {
        getSpecificAuthor.books.remove(isbn);
        const updateAuthor = await AuthorModel.findOneAndUpdate({id : id} , getSpecificAuthor , {new: true});
        return res.json({
            authorUpdated : updateAuthor,
            message : "Book was deleted from Author"
        });
    }
})

app.listen(3000 , () => {
    console.log("My Express App is Running");
})
