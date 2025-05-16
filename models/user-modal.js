const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: trusted,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isIssuedBook: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Book",
    },
    isIssuedData: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    subscriptionType: {
      type: String,
      required: true,
    },
    subscriptionDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
