const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "doyhiacif",
  api_key: "221424586279484",
  api_secret: "7zGbqoNSC4FkgeKWPQcwBPVxTCs",
});
module.exports = cloudinary;
