const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema({
  member_id: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  borrow_date: Date,
  return_date: Date,
});

module.exports = mongoose.model("Borrowing", borrowingSchema);
