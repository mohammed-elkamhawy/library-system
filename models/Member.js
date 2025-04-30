const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: String,
  age: Number,
  membership_type: String,
  join_year: Number,
});

module.exports = mongoose.model("Member", memberSchema);
