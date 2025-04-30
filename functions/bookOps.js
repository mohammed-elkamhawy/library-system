const Book = require("../models/Book");

// Create a new book
async function createBook(data) {
  const book = new Book(data);
  await book.save();
  console.log("Book created:", book);
}

// Get all books
async function getAllBooks() {
  const books = await Book.find();
  console.log("All books:", books);
}

// Update book
async function updateBook(id, data) {
  const updated = await Book.findByIdAndUpdate(id, data, { new: true });
  console.log("Book updated:", updated);
}

// Delete book
async function deleteBook(id) {
  await Book.findByIdAndDelete(id);
  console.log("Book deleted.");
}

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook
};
