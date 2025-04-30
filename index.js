const readline = require("readline");
const connectDB = require("./db");
const memberOps = require("./functions/memberOps");
const bookOps = require("./functions/bookOps");
const borrowOps = require("./functions/borrowOps");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function showMenu() {
  console.log(`
=== 📚 Library Management System 📚 ===

1. Create Member
2. List All Members
3. Create Book
4. List All Books
5. Borrow a Book
6. Return a Book
7. Show Borrowers of a Book
8. Show Books Borrowed by a Member
9. Total Books Borrowed per Member
10. Average Borrowing by Membership Type
11. Delete Member and Their Borrowings
12. Exit
`);
}

async function run() {
  await connectDB();

  while (true) {
    await showMenu();

    await new Promise((resolve) => {
      rl.question("Choose an option [1-12]: ", async (choice) => {
        switch (choice) {
          case "1":
            console.log("Example => Ali Ahmed,29,Gold,2021");
            rl.question("Enter name, age, membership_type, join_year: ", async (input) => {
              const [name, age, membership_type, join_year] = input.split(",");
              await memberOps.createMember({ name, age: Number(age), membership_type, join_year: Number(join_year) });
              resolve();
            });
            break;

          case "2":
            await memberOps.getAllMembers();
            resolve();
            break;

          case "3":
            console.log("Example => Modern Egypt,Tarek Osman,History,2010");
            rl.question("Enter title, author, genre, year_published: ", async (input) => {
              const [title, author, genre, year_published] = input.split(",");
              await bookOps.createBook({ title, author, genre, year_published: Number(year_published) });
              resolve();
            });
            break;

          case "4":
            await bookOps.getAllBooks();
            resolve();
            break;

          case "5":
            console.log("Example => member_id,book_id");
            rl.question("Enter member_id,book_id: ", async (input) => {
              const [member_id, book_id] = input.split(",");
              await borrowOps.borrowBook({ member_id, book_id, borrow_date: new Date(), return_date: null });
              resolve();
            });
            break;

          case "6":
            console.log("Example => borrowing_id");
            rl.question("Enter borrowing_id to update return date: ", async (borrowing_id) => {
              await borrowOps.returnBook(borrowing_id, new Date());
              resolve();
            });
            break;

          case "7":
            console.log('Example => Modern Egypt');
            rl.question("Enter book title: ", async (title) => {
              await borrowOps.membersByBookTitle(title);
              resolve();
            });
            break;

          case "8":
            console.log("Example => member_id");
            rl.question("Enter member_id: ", async (id) => {
              await borrowOps.booksByMember(id);
              resolve();
            });
            break;

          case "9":
            await borrowOps.totalBooksPerMember();
            resolve();
            break;

          case "10":
            await borrowOps.avgBorrowPerMembership();
            resolve();
            break;

          case "11":
            console.log("Example => member_id");
            rl.question("Enter member_id to delete: ", async (id) => {
              await memberOps.deleteMember(id);
              resolve();
            });
            break;

          case "12":
            rl.close();
            console.log("👋 Goodbye!");
            process.exit();

          default:
            console.log("❌ Invalid choice. Please enter a number between 1 and 12.");
            resolve();
        }
      });
    });
  }
}

run();
