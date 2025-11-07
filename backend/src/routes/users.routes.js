import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { me, updateMe, stats, listUsers, toggleActive } from "../controllers/users.controller.js";
const r = Router();
// r.get("/me", auth(), me);
// r.put("/me", auth(), updateMe);
r.get("/profile", auth(), me);
r.put("/profile", auth(), updateMe);

r.get("/:id/stats", auth(), stats);
r.get("/", auth(["admin"]), listUsers);
r.patch("/:id/toggle", auth(["admin"]), toggleActive);
export default r;
