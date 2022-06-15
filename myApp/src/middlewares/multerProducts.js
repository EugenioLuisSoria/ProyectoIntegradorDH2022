const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join('public/images/productos'));
    },

  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '-'+ Date.now())
    let imageName = `productImg-${Date.now()}${path.extname(file.originalname)}`;
    
    cb(null, imageName);
  },
});

const uploadProduct = multer({storage});

module.exports = uploadProduct;
