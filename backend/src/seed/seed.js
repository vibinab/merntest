import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Book from "../models/Book.js";
import Borrow from "../models/Borrow.js"; // 👈 add Borrow import

const books = Array.from({ length: 20 }).map((_, i) => ({
  title: `Sample Book ${i + 1}`,
  author: `Author ${i + 1}`,
  isbn: String(9780000000000 + i),
  category: ["Fiction", "Non-fiction", "Science", "History"][i % 4],
  description: "Demo book",
  totalCopies: 5,
  availableCopies: 5,
}));

const run = async () => {
  try {
    await connectDB();

    // Clean old data
    await Promise.all([
      User.deleteMany({}),
      Book.deleteMany({}),
      Borrow.deleteMany({}),
    ]);

    // Create users
    const admin = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "Admin@123",
      role: "admin",
    });

    const user1 = await User.create({
      name: "Alice",
      email: "alice@example.com",
      password: "Alice@123",
      role: "user",
    });

    const user2 = await User.create({
      name: "Bob",
      email: "bob@example.com",
      password: "Bob@123",
      role: "user",
    });

    // Insert books
    const insertedBooks = await Book.insertMany(books);

    // Create a few sample borrow records
    const now = new Date();
    const addDays = (date, days) =>
      new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

    const borrows = [
      {
        book: insertedBooks[0]._id,
        user: user1._id,
        borrowDate: now,
        dueDate: addDays(now, 14),
        status: "borrowed",
      },
      {
        book: insertedBooks[1]._id,
        user: user2._id,
        borrowDate: addDays(now, -20),
        dueDate: addDays(now, -6),
        returnDate: addDays(now, -5),
        status: "returned",
        fine: 5,
      },
      {
        book: insertedBooks[2]._id,
        user: user1._id,
        borrowDate: addDays(now, -10),
        dueDate: addDays(now, 4),
        status: "borrowed",
      },
    ];

    await Borrow.insertMany(borrows);

    // Update available copies of borrowed books
    for (let b of [0, 1, 2]) {
      insertedBooks[b].availableCopies -= 1;
      await insertedBooks[b].save();
    }

    console.log("✅ Seed completed successfully!");
    console.log("Admin login: admin@example.com / Admin@123");
    console.log("Users:", [user1.email, user2.email]);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

run();
