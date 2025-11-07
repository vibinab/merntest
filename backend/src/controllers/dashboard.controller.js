import Book from "../models/Book.js";
import Borrow from "../models/Borrow.js";
import User from "../models/User.js";

export const stats = async (req, res, next) => {
  try {
    const [books, users, borrows] = await Promise.all([
      Book.countDocuments(),
      User.countDocuments(),
      Borrow.countDocuments()
    ]);
    res.json({ books, users, borrows });
  } catch (e) { next(e); }
};

export const popularBooks = async (req, res, next) => {
  try {
    const items = await Borrow.aggregate([
      { $group: { _id: "$book", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $lookup: { from: "books", localField: "_id", foreignField: "_id", as: "book" } },
      { $unwind: "$book" }
    ]);
    res.json(items);
  } catch (e) { next(e); }
};

export const activeUsers = async (req, res, next) => {
  try {
    const items = await Borrow.aggregate([
      { $match: { status: { $in: ["borrowed","overdue"] } } },
      { $group: { _id: "$user", active: { $sum: 1 } } },
      { $sort: { active: -1 } },
      { $limit: 10 },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      { $project: { "user.password": 0 } }
    ]);
    res.json(items);
  } catch (e) { next(e); }
};
