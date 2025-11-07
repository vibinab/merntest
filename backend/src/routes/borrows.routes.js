import { Router } from "express";
import { auth } from "../middleware/auth.js";
import * as ctrl from "../controllers/borrows.controller.js";
const r = Router();
r.post("/", auth(), ctrl.createBorrow);
r.get("/", auth(), ctrl.listBorrows);
r.get("/overdue", auth(["admin"]), ctrl.listOverdue);
r.patch("/:id/return", auth(), ctrl.returnBorrow);
export default r;
