let express = require("express");
let router = express();
let User = require("../models/SignUp");
let bcrypt = require("bcrypt");
let passport = require("../config/passportConfig");
let Upload = require("../config/multer");

// router.post("/add_user", Upload.any(""), (req, res) => {
//   let data = Object.assign({}, req.body);
//   let { firstname, lastname, email, password, d_o_b, gender } = data;
//   if (!firstname || !lastname || !email || !password || !d_o_b || !gender) {
//     return res.status(400).json({ msg: "please enter all fields" });
//   }

//   let img = res.files[0].originalname;

//   User.findOne({ email }).then((user) => {
//     if (user) {
//       return res.status(400).json({ msg: "user already exist " });
//     }
//     const newUser = new User({
//       firstname,
//       lastname,
//       email,
//       password,
//       d_o_b,
//       gender,
//       img,
//     });

//     if (password) {
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(password, salt, (err, hash) => {
//           newUser.password = hash;
//           newUser.save((err, user) => {
//             if (!err) {
//               res.json({ sucess: true, user });
//             }
//             if (err) {
//               res.json(err.message);
//             }
//           });
//         });
//       });
//     }
//   });
// });
router.post("/add_user", Upload.any(""), (req, res) => {
  let data = Object.assign({}, req.body);
  let { firstname, lastname, email, d_o_b, gender } = data;
  if (!firstname || !lastname || !email || !d_o_b || !gender) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  let img = req.files[0].originalname;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "user already exist " });
    }
    const newUser = new User({
      firstname,
      lastname,
      email,
      d_o_b,
      gender,
      img,
    });
    newUser
      .save()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(400).json({ errMsg: "Please fill all the fields." });
      });
  });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  //simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }
  //Check for existence
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "user does not exist " });
    }
    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
      if (isMatch) {
        res.json(user);
      }
    });
  });
});

module.exports = router;
