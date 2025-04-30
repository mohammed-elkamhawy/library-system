const Borrowing = require("../models/Borrowing");
const Member = require("../models/Member");
const Book = require("../models/Book");

// Borrow a book
async function borrowBook(data) {
  const borrowing = new Borrowing(data);
  await borrowing.save();
  console.log("Book borrowed:", borrowing);
}

// Return a book
async function returnBook(id, returnDate) {
  const updated = await Borrowing.findByIdAndUpdate(id, { return_date: returnDate }, { new: true });
  console.log("Return date updated:", updated);
}

// Members who borrowed a specific book
async function membersByBookTitle(title) {
  const result = await Borrowing.aggregate([
    {
      $lookup: {
        from: "books", localField: "book_id", foreignField: "_id", as: "book"
      }
    },
    { $unwind: "$book" },
    { $match: { "book.title": title } },
    {
      $lookup: {
        from: "members", localField: "member_id", foreignField: "_id", as: "member"
      }
    },
    { $unwind: "$member" },
    { $project: { _id: 0, name: "$member.name" } }
  ]);
  console.log(`Members who borrowed "${title}":`, result);
}

// Books borrowed by more than 2 members
async function booksBorrowedByMany() {
  const result = await Borrowing.aggregate([
    { $group: { _id: "$book_id", members: { $addToSet: "$member_id" } } },
    { $project: { memberCount: { $size: "$members" } } },
    { $match: { memberCount: { $gt: 2 } } }
  ]);
  console.log("Books borrowed by more than 2 members:", result);
}

// All books borrowed by a member
async function booksByMember(memberId) {
  const result = await Borrowing.find({ member_id: memberId }).populate("book_id", "title author");
  console.log("Books borrowed by member:", result);
}

// Aggregation: Total books per member
async function totalBooksPerMember() {
  const result = await Borrowing.aggregate([
    { $group: { _id: "$member_id", total: { $sum: 1 } } }
  ]);
  console.log("Total books per member:", result);
}

// Aggregation: Average borrows per membership type
async function avgBorrowPerMembership() {
  const result = await Borrowing.aggregate([
    {
      $lookup: {
        from: "members", localField: "member_id", foreignField: "_id", as: "member"
      }
    },
    { $unwind: "$member" },
    {
      $group: {
        _id: "$member.membership_type",
        avgBorrow: { $avg: 1 }
      }
    }
  ]);
  console.log("Average borrow per membership type:", result);
}

module.exports = {
  borrowBook,
  returnBook,
  membersByBookTitle,
  booksBorrowedByMany,
  booksByMember,
  totalBooksPerMember,
  avgBorrowPerMembership
};
