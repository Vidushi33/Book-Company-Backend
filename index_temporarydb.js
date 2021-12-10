const db = require("./database");
const express = require("express");

const app = express();
app.use(express.json());


// opening of page
app.get("/" , (req, res) => {
    return res.json({"Welcome" : `to the backend software for the book company`});
});


// FOR BOOKS

// for all books
app.get("/books" ,(req, res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);
});

// for specific book according to isbn
app.get("/book-isbn/:isbn" , (req, res) => {
    // console.log(req.params/;
    const isbn = req.params.isbn;
    // console.log(isbn);
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);

    if(getSpecificBook.length === 0){
        return res.json({"error" : `No book found for the ISBN of ${isbn}`});
    }

    return res.json(getSpecificBook[0]);
})

// for specific books according to category
app.get("/book-category/:category" , (req, res) => {
    // console.log(req.params);
    const category = req.params.category;
    // console.log(category);
    const getSpecificBooks = db.books.filter((book) => book.category.includes(category));
    // console.log(getSpecificBooks);
    // console.log(getSpecificBooks.length);
    
    if(getSpecificBooks.length === 0){
        return res.json({"error" : `No book is found for the category of ${category}`});
    }

    return res.json(getSpecificBooks);
})


// FOR AUTHORS

// for all authors
app.get("/authors", (req, res) => {
    const getAllAuthors = db.authors;
    return res.json(getAllAuthors);
});

// for specific author according to id
app.get("/author-id/:id", (req, res) => {
    // console.log(req.params);
    var id = req.params.id;
    id = Number(id);
    // console.log(id);
    const getSpecificAuthor = db.authors.filter((author) => author.id ===id);
    // console.log(getSpecificAuthor);
    // console.log(getSpecificAuthor.length);
    if (getSpecificAuthor.length ===0){
        return res.json({"error" : `No author found with the id of ${id}`});
    }
    return res.json(getSpecificAuthor);
})

// for specific author by name
app.get("/author-name/:name", (req, res) => {
    // console.log(req.params);
    var name = req.params.name;
    // console.log(name);
    const getSpecificAuthorByName = db.authors.filter((author) => author.name ===name);
    // console.log(getSpecificAuthorByName);
    // console.log(getSpecificAuthorByName.length);
    if (getSpecificAuthorByName.length ===0){
        return res.json({"error" : `No author found with the id of ${id}`});
    }
    return res.json(getSpecificAuthorByName);
})


// for specific authors using isbn
app.get("/author-isbn/:isbn", (req, res) => {
    // console.log(req.params);
    const isbn = req.params.isbn;
    // console.log(isbn);
    const getSpecificAuthors = db.authors.filter((author) => author.books.includes(isbn));
    // console.log(getSpecificAuthors);
    // console.log(getSpecificAuthors.length);
    if (getSpecificAuthors.length ===0){
        return res.json({"error" : `No author found with the isbn of ${isbn}`});
    }
    return res.json(getSpecificAuthors);
})

// FOR PUBLICATIONS

// for all publications
app.get("/publications", (req, res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications);
});

// for specific publication using isbn
app.get("/publication-isbn/:isbn", (req, res) => {
    // console.log(req.params);
    const isbn = req.params.isbn;
    // console.log(isbn);
    const getSpecificPublications = db.publications.filter((publication) => publication.books.includes(isbn));
    // console.log(getSpecificPublications);
    // console.log(getSpecificPublications.length);
    if (getSpecificPublications.length ===0){
        return res.json({"error" : `No author found with the isbn of ${isbn}`});
    }
    return res.json(getSpecificPublications);
})

// for specific publication using name
app.get("/publication-name/:name", (req, res) => {
    // console.log(req.params);
    var name = req.params.name;
    // console.log(name);
    const getSpecificPublicationByName = db.publications.filter((publication) => publication.name ===name);
    // console.log(getSpecificPublicationByName);
    // console.log(getSpecificPublicationByName.length);
    if (getSpecificPublicationByName.length ===0){
        return res.json({"error" : `No author found with the id of ${id}`});
    }
    return res.json(getSpecificPublicationByName);
})




// POST APIs
// to post a new book
app.post("/book", (req, res) => {
    // console.log(req.body);
    db.books.push(req.body);
    return res.json(db.books);
})

// to post a new author
app.post("/author", (req, res) => {
    // console.log(req.body);
    db.authors.push(req.body);
    return res.json(db.authors);
})

// to post a new publication
app.post("/publication", (req, res) => {
    // console.log(req.body);
    db.publications.push(req.body);
    return res.json(db.publications);
})


// PUT API's
// to update book using ISBN
app.put("/book-update/:isbn", (req,res) => {
    // console.log(req.body);
    // console.log(req.params);
    const isbn = req.params.isbn;
    db.books.forEach((book) => {
        if(book.ISBN ===isbn){
            // console.log({...book , ...req.body});
            return {...book , ...req.body};
        }
        return book;
    })
    return res.json(db.books);
})

// to update author using id
app.put("/author-update/:id" , (req, res) =>{
    // console.log(req.body);
    // console.log(req.params);
    let id = req.params.id;
    id = Number(id);
    db.authors.forEach((author) => {
        if(author.id === id){
            // console.log({...author, ...req.body});
            return {...author , ...req.body};
        }
        return author;
    })
    return res.json(db.authors);
})

// to update publication using id
app.put("/publication-update/:id" , (req, res) =>{
    // console.log(req.body);
    // console.log(req.params);
    let id = req.params.id;
    id = Number(id);
    db.publications.forEach((publication) => {
        if(publication.id === id){
            // console.log({...publication, ...req.body});
            return {...publication , ...req.body};
        }
        return publication;
    })
    return res.json(db.publications);
})


// DELETE API's
// to delete book using isbn
app.delete("/book-delete/:isbn" , (req, res) => {
    // console.log(req.params);
    const isbn = req.params.isbn;
    const filterredBooks = db.books.filter((book) => book.ISBN !== isbn);
    // console.log(filterredBooks);
    db.books = filterredBooks;
    return res.json(db.books);
})

// to delete author using id
app.delete("/author-delete/:id" , (req, res) => {
    // console.log(req.params);
    var id = req.params.id;
    id = Number(id)
    const filterredAuthors = db.authors.filter((author) => author.id !== id);
    // console.log(filterredAuthors);
    db.authors = filterredAuthors;
    return res.json(db.authors);
})

// to delete publication using id
app.delete("/publication-delete/:id" , (req, res) => {
    // console.log(req.params);
    var id = req.params.id;
    id = Number(id)
    const filterredPublications = db.publications.filter((publication) => publication.id !== id);
    // console.log(filterredPubliactions);
    db.publications = filterredPublications;
    return res.json(db.publications);
})


// to delete an author from a book
app.delete("/book-author-delete/:isbn/:id" , (req, res) => {
    // console.log(req.params);
    let {isbn, id} = req.params;
    id = Number(id);
    db.books.forEach((book) => {
        if(book.ISBN === isbn){
            if(!book.authors.includes(id)){
                return;
            }
            book.authors = book.authors.filter((author) => author!==id);
            return book;
        }
        return book;
    })
    return res.json(db.books);
})

// to delete a book from author
app.delete("/author-book-delete/:id/:isbn" , (req, res) => {
    console.log(req.params);
    let {id, isbn} = req.params;
    id = Number(id);
    db.authors.forEach((author) => {
        if(author.id === id){
            if(!author.books.includes(isbn)){
                return;
            }
            author.books = author.books.filter((book) => book!== isbn);
            return author;
        }
        return author;
    })
    return res.json(db.authors);
})

app.listen(3000 , () => {
    console.log("My Express App is Running");
})
