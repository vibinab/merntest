import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: String,
  address: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  membershipDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  maxBooksAllowed: { type: Number, default: 3 }
}, { timestamps: true });

userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(pw) {
  return bcrypt.compare(pw, this.password);
};

export default mongoose.model("User", userSchema);
