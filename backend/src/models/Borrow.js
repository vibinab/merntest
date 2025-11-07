import mongoose from "mongoose";
const borrowSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  borrowDate: { type: Date, default: Date.now, required: true },
  dueDate: { type: Date, required: true },
  returnDate: Date,
  status: { type: String, enum: ["borrowed","returned","overdue"], default: "borrowed" },
  fine: { type: Number, default: 0 },
  notes: String
}, { timestamps: true });

export default mongoose.model("Borrow", borrowSchema);
