let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
//   password: {
//     type: String,
//     required: false,
//   },
  roll_no: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    required: false,
  },
  session: {
    type: String,
    required: false,
  },
  d_o_b: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
});

let User = mongoose.model("Users", userSchema);

module.exports = User;
