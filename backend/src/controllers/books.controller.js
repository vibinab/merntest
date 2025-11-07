import Book from "../models/Book.js";

export const createBook = async (req, res, next) => {
  try {
    const book = await Book.create({ ...req.body, addedBy: req.user?.id });
    res.status(201).json(book);
  } catch (e) { next(e); }
};

export const getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, language, available, sort = "-createdAt", q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (language) filter.language = language;
    if (available === "true") filter.availableCopies = { $gt: 0 };
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { isbn: { $regex: q, $options: "i" } }
      ];
    }
    const skip = (Number(page)-1) * Number(limit);
    const [items, total] = await Promise.all([
      Book.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Book.countDocuments(filter)
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total/Number(limit)) });
  } catch (e) { next(e); }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (e) { next(e); }
};

export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (e) { next(e); }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Deleted" });
  } catch (e) { next(e); }
};

export const searchBooks = async (req, res, next) => {
  try {
    const { q } = req.query;
    const filter = q ? {
      $or: [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { isbn: { $regex: q, $options: "i" } }
      ]
    } : {};
    const items = await Book.find(filter).limit(50);
    res.json(items);
  } catch (e) { next(e); }
};

export const updateStock = async (req, res, next) => {
  try {
    const { delta } = req.body; // +1 or -1
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    const nextAvailable = book.availableCopies + Number(delta || 0);
    if (nextAvailable < 0 || nextAvailable > book.totalCopies) {
      return res.status(400).json({ message: "Invalid stock change" });
    }
    book.availableCopies = nextAvailable;
    await book.save();
    res.json(book);
  } catch (e) { next(e); }
};
