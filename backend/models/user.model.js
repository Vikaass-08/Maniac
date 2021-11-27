const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 1024, // length for password after hashing
  },
  name: {
    type: String,
    default: null,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  age: {
    type: Number,
    default: null,
    trim: true,
  },
  phone: {
    type: String,
    default: null,
    trim: true,
    minlength: 5,
    maxlength: 15,
  },
  image: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
