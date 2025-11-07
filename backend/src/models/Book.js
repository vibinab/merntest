import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1, maxlength: 200 },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true, match: /^\d{13}$/ },
  category: { type: String, required: true },
  description: String,
  coverImage: String,
  publishedYear: Number,
  totalCopies: { type: Number, required: true, default: 1, min: 0 },
  availableCopies: { type: Number, required: true, default: 1, min: 0 },
  language: { type: String, default: "English" },
  pages: Number,
  publisher: String,
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
