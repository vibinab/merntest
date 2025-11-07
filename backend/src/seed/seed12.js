import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Book from "../models/Book.js";

const books = Array.from({length: 20}).map((_,i)=> ({
  title: `Sample Book ${i+1}`,
  author: `Author ${i+1}`,
  isbn: String(9780000000000 + i),
  category: ["Fiction","Non-fiction","Science","History"][i%4],
  description: "Demo book",
  totalCopies: 5,
  availableCopies: 5
}));

const run = async () => {
  await connectDB();
  await Promise.all([User.deleteMany({}), Book.deleteMany({})]);
  const admin = await User.create({ name: "Admin", email: "admin@example.com", password: "Admin@123", role: "admin" });
  const user = await User.create({ name: "Alice", email: "alice@example.com", password: "Alice@123", role: "user" });
  await Book.insertMany(books);
  console.log("Seeded:", { admin: admin.email, user: user.email });
  process.exit(0);
};
run();
