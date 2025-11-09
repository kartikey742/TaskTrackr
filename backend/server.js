const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbconnect");
const authRoutes = require("./routes/auth.js");
const taskRoutes = require("./routes/Task.js");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

connectDB();
app.get("/", (req, res) => res.send("API running"));

app.listen(5000, () => console.log("Server running on port 5000"));
