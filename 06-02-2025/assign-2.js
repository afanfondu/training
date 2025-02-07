// Assignment 2: Working with Objects
// Task: Create an object bookLibrary to manage a collection of books.
// The object should have the following properties and methods:
// books: An array of book objects (each book has title, author, and yearPublished).
// addBook(book): Adds a new book to the collection.
// getBooksByAuthor(author): Returns all books by a given author.
// removeBook(title): Removes a book by title.
// Add a method getAllBooks to return a list of all book titles.

const bookLibrary = {
  books: [],

  addBook(book) {
    this.books.push(book);
  },
  getBooksByAuthor(author) {
    return this.books.filter((book) => book.author === author);
  },
  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  },
  getAllBooks() {
    return this.books.map((book) => book.title);
  },
};

bookLibrary.addBook({ title: "Book1", author: "Author1", yearPublished: 2020 });
bookLibrary.addBook({ title: "Book2", author: "Author2", yearPublished: 2021 });
bookLibrary.addBook({ title: "Book3", author: "Author1", yearPublished: 2022 });

console.log(bookLibrary.getBooksByAuthor("Author1"));
// [
//   { title: 'Book1', author: 'Author1', yearPublished: 2020 },
//   { title: 'Book3', author: 'Author1', yearPublished: 2022 }
// ]

console.log(bookLibrary.getAllBooks());
// [ 'Book1', 'Book2', 'Book3' ]

bookLibrary.removeBook("Book1");
console.log(bookLibrary.getAllBooks());
// [ 'Book2', 'Book3' ]
