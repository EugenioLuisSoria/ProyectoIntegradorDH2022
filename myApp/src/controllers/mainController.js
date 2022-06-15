const path = require("path");
const db = require("../database/models/index");

const mainController = {
  home: (req, res) => {
    let rnd1 = Math.round(Math.random() * 10);
    while (rnd1 == 0 || rnd1 > 4) {
      rnd1 = Math.round((Math.random() * 10));
    }
    db.Product.findAll({
      order: [["discount", "DESC"]],
      limit: 4,
      where: {
        product_category_id: rnd1,
      },
    }).then((products) => {
      //res.send(products);
      res.render("index", { products: products });
    });
  },
};

module.exports = mainController;
