import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import app from "./app.js";

await connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
