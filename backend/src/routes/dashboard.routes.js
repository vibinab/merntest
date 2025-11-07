import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { stats, popularBooks, activeUsers } from "../controllers/dashboard.controller.js";
const r = Router();
r.get("/stats", auth(["admin"]), stats);
r.get("/popular-books", auth(["admin"]), popularBooks);
r.get("/active-users", auth(["admin"]), activeUsers);
export default r;
