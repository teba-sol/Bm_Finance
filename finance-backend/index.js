const express = require("express");
const mongoose = require("mongoose");
const { UserModel } = require("./User_model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET || "default_secret_key";

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const uri =
  "mongodb+srv://teba-mern:kALwuL0ntUKsXZQs@mycluster.w2t9z.mongodb.net/transactions?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  email: { type: String, required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema, "trans");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(403).json({ error: "Forbidden" });
  }
};

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new UserModel({ name, email, password });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .json({
        message: "Registration successful",
        token,
        balance: newUser.balance,
        name: newUser.name,
      });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password not matching" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({
        message: "Login successful",
        token,
        balance: user.balance,
        name: user.name,
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/deposit", authenticateToken, async (req, res) => {
  try {
    const { description, amount } = req.body;
    const email = req.user.email;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid amount." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.balance += amount;
    await user.save();
    const transaction = new Transaction({
      description: description || "Deposited",
      amount,
      date: new Date(),
      email,
    });

    await transaction.save();

    res.status(200).json({
      message: "Deposit successful",
      balance: user.balance,
    });
  } catch (error) {
    console.error("Error during deposit:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/current-balance", authenticateToken, async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ balance: user.balance });
  } catch (error) {
    console.error("Error fetching current balance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/transactions", authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const paginatedTransactions = await Transaction.find({
      email: req.user.email,
    })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    const allTransactions = await Transaction.find({ email: req.user.email });

    const totalIncome = allTransactions
      .filter((txn) => txn.amount > 0)
      .reduce((acc, txn) => acc + txn.amount, 0);

    const totalExpenses = allTransactions
      .filter((txn) => txn.amount < 0)
      .reduce((acc, txn) => acc + Math.abs(txn.amount), 0);

    if (!paginatedTransactions.length) {
      return res.status(404).json({
        message: "No transactions found",
        totalIncome,
        totalExpenses,
      });
    }

    res.status(200).json({
      transactions: paginatedTransactions,
      totalIncome,
      totalExpenses,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/user", authenticateToken, async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ name: user.name });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/withdraw", authenticateToken, async (req, res) => {
  try {
    const { description, amount } = req.body;
    const email = req.user.email;

    if (!description || !amount || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Withdrawal amount must be greater than 0." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= amount;
    await user.save();

    const transaction = new Transaction({
      description,
      amount: -amount,
      date: new Date(),
      email,
    });

    await transaction.save();

    res.status(200).json({
      message: "Withdrawal successful",
      balance: user.balance,
    });
  } catch (error) {
    console.error("Error during withdrawal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
