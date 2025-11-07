import User from "../models/User.js";
import Borrow from "../models/Borrow.js";

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) { next(e); }
};

export const updateMe = async (req, res, next) => {
  try {
    const updatable = ["name","phone","address"];
    const data = {};
    updatable.forEach(k => { if (req.body[k] !== undefined) data[k] = req.body[k]; });
    const user = await User.findByIdAndUpdate(req.user.id, data, { new: true }).select("-password");
    res.json(user);
  } catch (e) { next(e); }
};

export const stats = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user.id;
    const total = await Borrow.countDocuments({ user: userId });
    const active = await Borrow.countDocuments({ user: userId, status: { $in: ["borrowed","overdue"] } });
    const returned = await Borrow.countDocuments({ user: userId, status: "returned" });
    res.json({ total, active, returned });
  } catch (e) { next(e); }
};

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort("-createdAt");
    res.json(users);
  } catch (e) { next(e); }
};

export const toggleActive = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.isActive = !user.isActive;
    await user.save();
    res.json(user);
  } catch (e) { next(e); }
};
