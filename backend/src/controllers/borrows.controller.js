import Borrow from "../models/Borrow.js";
import Book from "../models/Book.js";
import User from "../models/User.js";
import { calcFine } from "../utils/calcFine.js";

const addDays = (date, days) => new Date(date.getTime() + days*24*60*60*1000);

export const createBorrow = async (req, res, next) => {
  try {
    const { bookId, userId } = req.body;
    const user = await User.findById(userId || req.user.id);
    if (!user || !user.isActive) return res.status(400).json({ message: "Inactive or missing user" });
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.availableCopies <= 0) return res.status(400).json({ message: "No copies available" });
    // user borrow limits
    const activeCount = await Borrow.countDocuments({ user: user._id, status: { $in: ["borrowed","overdue"] } });
    if (activeCount >= user.maxBooksAllowed) return res.status(400).json({ message: "Borrow limit reached" });
    // already borrowed same book?
    const already = await Borrow.findOne({ user: user._id, book: book._id, status: { $in: ["borrowed","overdue"] } });
    if (already) return res.status(400).json({ message: "You already borrowed this book" });

    const now = new Date();
    const borrow = await Borrow.create({
      user: user._id,
      book: book._id,
      borrowDate: now,
      dueDate: addDays(now, 14)
    });
    book.availableCopies -= 1;
    await book.save();
    res.status(201).json(borrow);
  } catch (e) { next(e); }
};

export const returnBorrow = async (req, res, next) => {
  try {
    const borrow = await Borrow.findById(req.params.id).populate("book");
    if (!borrow) return res.status(404).json({ message: "Borrow record not found" });
    if (borrow.status === "returned") return res.status(400).json({ message: "Already returned" });
    const now = new Date();
    const fine = calcFine(borrow.dueDate, now);
    borrow.returnDate = now;
    borrow.fine = fine;
    borrow.status = fine > 0 ? "returned" : "returned";
    await borrow.save();
    // increment stock
    const book = await Book.findById(borrow.book._id);
    book.availableCopies = Math.min(book.totalCopies, book.availableCopies + 1);
    await book.save();
    res.json(borrow);
  } catch (e) { next(e); }
};

export const listBorrows = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.role !== "admin") {
      filter.user = req.user.id;
    } else if (req.query.user) {
      filter.user = req.query.user;
    }
    if (req.query.status) filter.status = req.query.status;
    const items = await Borrow.find(filter).populate("book user").sort("-createdAt");
    res.json(items);
  } catch (e) { next(e); }
};

export const listOverdue = async (req, res, next) => {
  try {
    const now = new Date();
    const items = await Borrow.find({
      status: { $in: ["borrowed","overdue"] },
      dueDate: { $lt: now }
    }).populate("book user").sort("dueDate");
    res.json(items);
  } catch (e) { next(e); }
};
