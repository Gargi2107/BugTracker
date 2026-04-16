const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/projects", require("./routes/projectRoutes.js"));
app.use("/api/tickets", require("./routes/ticketRoutes.js"));
app.use("/api/comments", require("./routes/commentRoutes.js"));

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));