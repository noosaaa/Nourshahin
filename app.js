const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

// استيراد مسارات المصادقة والمستخدمين
const userRouter = require("./routes/User");
const authRouter = require("./routes/auth");

const bankRoutes = require("./routes/Bank");
const atmRoutes = require("./routes/Atm");

const app = express();
const DB_URL = "mongodb+srv://nour:Nos2292002***@node.f5zgw.mongodb.net/Atmradar?retryWrites=true&w=majority&appName=node";

// الاتصال بـ MongoDB
mongoose.connect(DB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// إعداد مسارات API
app.use("/api/banks", bankRoutes);
app.use("/api/atms", atmRoutes);
app.use("/api/users", userRouter);  // ✅ إضافة API المستخدمين
app.use("/api/login", authRouter);  // ✅ إضافة API المصادقة

// تشغيل الخادم
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
