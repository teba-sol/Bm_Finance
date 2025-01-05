
const mongoose = require("mongoose");

// Create the Mongoose schema for transactions
const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Description is required"], // Add a custom error message
    trim: true, // Remove leading/trailing whitespaces
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    validate: {
      validator: (value) => value !== 0, // Prevent transactions with zero amount
      message: "Amount must be non-zero",
    },
  },
  date: {
    type: Date,
    required: [true, "Transaction date is required"],
    validate: {
      validator: (value) => !isNaN(new Date(value).getTime()), // Ensure the date is valid
      message: "Invalid date format",
    },
  },
});

// Specify the collection name explicitly
const Transaction = mongoose.model("Transaction", transactionSchema, "trans");

module.exports = Transaction;
