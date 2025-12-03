import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import grammarRoute from "./routes/grammarRoute.js";

/*dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);

app.listen(process.env.PORT, () => console.log(`🚀 Server running on ${process.env.PORT}`));
*/

dotenv.config();
connectDB();

const app = express();
//const adminRoutes = require("./routes/admin");
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/grammar", grammarRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
