const path = require("path");
const db = require("../database/models/index")
const Sequelize = require("sequelize");
const Op = db.Sequelize.Op;

const productsController = {

  //Muestra todos los productos segun categoria
  types: (req, res) => {

    let categoryName = req.params.type;
    db.Product.findAll({
      include: [{association: 'product_category',
      where: {
        type: categoryName
      }}],

    })
      .then( (productsByCategory) => {
        // return res.json(productsByCategory)
        return res.render('productTypeList', {products: productsByCategory, category: categoryName})
      })         
  },

  //Muestra el detalle de un producto
  detail: (req, res) => {
    let idABuscar = req.params.id;
    db.Product.findByPk(idABuscar, {include: ["product_category"] })
      .then( producto => {     
          return res.render("productDetails", { element: producto });
      })     
  },
  // Muestra formulario de creacion de productos
  create: (req, res) => {    
    if(req.session.userLogged.user_category.type != 1){ //Si NO es admin, lo saco
      console.log("No tenes los privilegios necesarios para editar un producto")
      return res.redirect('/')    
    }
    db.Product_category.findAll()
      .then((categories) => {
        return res.render("productCreate", {categories});
      })
  },
  //Guarda la informacion por POST
  store: (req, res) => {
    if(req.session.userLogged.user_category.type != 1){ //Si NO es admin, lo saco
      console.log("No tenes los privilegios necesarios para editar un producto")
      return res.redirect('/')    
    }
    let body = req.body;
    if(!req.file){
      return res.send("Ingresar foto")
    }
    else {
      let fileName = req.file.filename
    
      db.Product.create({
        name: body.product_name,
        description: body.product_description,
        stock: body.product_stock,
        weight: body.product_weight,
        color: body.product_color,
        size: body.product_size,
        price: body.product_price,
        discount: body.product_discount,
        picture: fileName,
        product_category_id: body.product_category,      
      
      })  .then( () => res.redirect("/") );    
}
  },
  //Muestra form de edición para el producto seleccionado por id
  edit: (req, res) => {
    if(req.session.userLogged.user_category.type != 1){ //Si NO es admin, lo saco
      console.log("No tenes los privilegios necesarios para editar un producto")
      return res.redirect('/')    
    }
    let idABuscar = req.params.id;
    const promise1 = db.Product_category.findAll();
    const promise2 = db.Product.findByPk(idABuscar, {include: ["product_category"] })
    Promise.all([promise1, promise2]) 
      .then( ([categories, product]) => {       
        return res.render("productEdit", {element: product, categories: categories})         
      })              
  },
  //Actualiza la informacion del producto a traves de PUT
  update: (req, res) => {
    // return res.send(req.file)
    if(req.session.userLogged.user_category.type != 1){ //Si NO es admin, lo saco
      console.log("No tenes los privilegios necesarios para editar un producto")
      return res.redirect('/')    
    }    
    let fileName = req.file ? req.file.filename : undefined;
    let idABuscar = req.params.id;
    let body = req.body;    

    db.Product.update({
      name: body.product_name,
      description: body.product_description,
      stock: body.product_stock,
      weight: body.product_weight,
      color: body.product_color,
      size: body.product_size,
      price: body.product_price,
      discount: body.product_discount,
      picture: fileName,           //Si la prop picture es undefined, directamente no pisa la imagen subida a la DB y queda la que estaba originalmente 
      product_category_id: body.product_category, 
      
    }, {
      where: { id: idABuscar }
    }).then( () => res.redirect("/products/" + idABuscar) );           
  },

  //Elimina el producto seleccionado por id
  delete: (req, res) => {
    if(req.session.userLogged.user_category.type != 1){ //Si NO es admin, lo saco
      alert("No tenes los privilegios necesarios para editar un producto")
      return res.redirect('/')    
    }
    
    let idABuscar = req.params.id;
    db.Product.destroy({where: { id: idABuscar }})
      .then( () => {
        db.Item.destroy({where: {product_id: idABuscar}})
          .then( () => res.redirect("/"))      
      })
  },

  //Barra de búsqueda
  productSearch: (req, res) => {
    console.log("Entre al metodo de busqueda");

    let searchString = req.query.keywords
    // return res.send(searchString)
    db.Product.findAll({
      where: {
        name: {
          [Op.like]: `%${searchString}%`,
        }
      }
    })
      .then ( (products) => {
        //return res.send(products)        
        return res.render('search', {products})
      })
  }
};
module.exports = productsController;