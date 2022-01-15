# Book-Company-Backend

This is a Book Company Backend project.
In this project we can read, add, update and delete any book as per the requirement.

To open this in VS Code(write the following commands in terminal)-:
  
  Step1 - Clone the repository 
          
	  Command -> git clone repo_link
  
  Step2 - Change the directory
          
	  Command -> cd Book-Company-Backend
 
 Now you can access the code

To see the working of project, access the deployed API link -> 
   
   Link1 - https://book-company-backend.herokuapp.com/
        (This will check the deployement of backend)
       
   Link2 -   Get API(For books)
   
   	   [To get the data of all the books](https://book-company-backend.herokuapp.com/books)
           
	   [Get book by isbn 12345Three](https://book-company-backend.herokuapp.com/book-isbn/12345Three)
           
	   [Get book by category programming](https://book-company-backend.herokuapp.com/book-category/programming)
           
   Link3 -   Get API(For Authors)
   
           [To get the data of all the authors](https://book-company-backend.herokuapp.com/authors)
           
	   [To get the data of author by id 1](https://book-company-backend.herokuapp.com/author-id/1)
           
	   [To get the data of author by name shyam](https://book-company-backend.herokuapp.com/author-name/shyam)
           
	   [To get the data of author by isbn 12345Two](https://book-company-backend.herokuapp.com/author-isbn/12345Two)
           
   Link4 -   Get API(For Publications)
   	
	   [To get the data of all the publications](https://book-company-backend.herokuapp.com/publications)
           
	   [To get the data of publication by isbn 12345Two](https://book-company-backend.herokuapp.com/publication-isbn/12345Two)
           
	   [To get the data of publication by name Rahul Publications](https://book-company-backend.herokuapp.com/publication-name/Rahul Publications)
           
	   [To get the data of publication by id 3](https://book-company-backend.herokuapp.com/publication-id/3)
        
         
   Link5 - Post API (To add a new book, author or publication)
           
	   https://book-company-backend.herokuapp.com/book
           
	   https://book-company-backend.herokuapp.com/author
           
	   https://book-company-backend.herokuapp.com/publication
           
   Link6 - Put API (To update an existing record)
           
	   https://book-company-backend.herokuapp.com/book-update/:isbn
           
	   https://book-company-backend.herokuapp.com/author-update/:id
           
	   https://book-company-backend.herokuapp.com/publication-update/:id
           
   Link7 - Delete API (To delete an existing record) 
           
	   https://book-company-backend.herokuapp.com/book-delete/:isbn
           
	   https://book-company-backend.herokuapp.com/author-delete/:id
           
	   https://book-company-backend.herokuapp.com/publication-delete/:id
           
	   https://book-company-backend.herokuapp.com/book-author-delete/:isbn/:id
           
	   https://book-company-backend.herokuapp.com/author-book-delete/:id/:isbn
         
   Note - To access all the links you can use postman or Thunder client(extention of VS code)
        - To access the Post , Put and Delete API , you need to give the req body.

        **Books req body** 
        {
         ISBN: String,
         title: String,
         authors: [Number],
         language: String,
         pubDate: String,
         numOfPage: Number,
         category: [String],
         publication: Number,
        }
           
        **Authors req body** 
        {
                 id: Number,
                name: String,
                books: [String],
        }

        **Publications req body** 
        {
                  id: Number,
                  name: String,
                  books: [String]
        }
