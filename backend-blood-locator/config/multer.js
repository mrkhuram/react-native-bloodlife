var multer = require("multer");
var path = require("path");

var customConfig = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, "uploads");
  },
  filename: function (req, file, next) {
    next(null, file.originalname);
  },
});

var upload = multer({ storage: customConfig });

module.exports = upload;
