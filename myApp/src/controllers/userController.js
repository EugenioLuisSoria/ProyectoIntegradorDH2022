const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const db = require("../database/models/index");
// Que es lo mismo que hacer require("../database/models") porque Javascript va a buscar siempre el archivo index

const userController = {
  //Muestro form de login
  loginForm: (req, res) => {
    return res.render("login");
  },
  //Logueo al usuario y lo pongo en sesión, también creo la cookie en caso de requerirse
  loginProcess: (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("login", { errors: errors.mapped(), old: req.body });
    }

    db.User.findOne({
      // attributes:['id', 'first_name', 'last_name', 'email', 'avatar'], //Campos que quiero traer de la tabla User, si pongo user_category se rompe la query
      where: {
        email: req.body.email,
      },
      include: [{ association: "user_category" }],
    })
      .then((userToLogin) => {
        let samePassword = bcrypt.compareSync(
          req.body.password,
          userToLogin.password
        );

        if (samePassword) {
          req.session.userLogged = {
            //creo la propiedad userLogged en el objeto global req.session y le doy la estructura que yo quiero,
            id: userToLogin.id, //porque no puedo sacar el password con delete userToLogin.password
            first_name: userToLogin.first_name,
            last_name: userToLogin.last_name,
            email: userToLogin.email,
            avatar: userToLogin.avatar,
            user_category: {
              type: userToLogin.user_category.type,
            },
          };
          //Cookie
          if (req.body.remember_me) {
            res.cookie("recordarEmail", req.session.userLogged.email, {
              maxAge: 120000,
            });
          }

          return res.redirect("/");
        }

        return res.render("login", {
          errors: {
            email: {
              msg: "Credenciales inválidas",
            },
          },
        });
      })

      .catch((e) => {
        // Si quiero puedo captar el error como parámetro en el callback del catch
        console.log(e);
        return res.render("login", {
          errors: {
            email: {
              msg: "Este email no está registrado",
            },
          },
        });
      });
  },

  // Muestra formulario de creacion de usuario
  registerForm: (req, res) => {
    return res.render("register");
  },
  //Guardo la info de usuario registrado
  registerUpload: async (req, res) => {
    let errors = validationResult(req);
    let userPass = req.body.password;
    let userPassVerification = req.body.password_verification;

    const user = await db.User.findOne({
      attributes: ["id", "first_name", "email"], //No agrego todos los att, para no sobrecargar la consulta con info
      where: {
        email: req.body.email,
      },
    });

    if (!errors.isEmpty()) {
      return res.render("register", { errors: errors.mapped(), old: req.body });
    }

    if (user != null) {
      //Si encuentra un usuario, interrumpe la lógica, si no lo encuentra (devuvelve null), sigue con las demas validaciones
      return res.render("register", {
        errors: {
          email: {
            msg: "Este email no está registrado",
          },
        },
      });
    }

    if (userPass !== userPassVerification) {
      return res.render("register", {
        old: req.body,
        errors: {
          password_verification: {
            msg: "Las contraseñas no coinciden",
          },
        },
      });
    }

    let passEncripted = bcrypt.hashSync(userPass, 10);
    let newUser = {
      ...req.body,
      password: passEncripted,
      avatar: req.file != undefined ? req.file.filename : "user-solid.svg", //Solo agrega esta propíedad en caso de que se cree agregue una imagen, sino
      user_category_id: 1, // pone una por default
    };
    delete newUser.password_verification; //Necesito borrar el password que se verifica, porque no está hasheado (el otro se pisa directamente)

    try {
      await db.User.create(newUser);
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
  //Muestro el producto con todos sus items
  getCart: (req, res) => {
    db.Item.findAll({
      include: [
        {
          model: db.User,
          as: "users",
          where: {
            id: req.session.userLogged.id,
          },
        },
        {
          model: db.Product,
          as: "product",
        },
      ],
    })
      //En "items" tengo todos los items relacionados al usuario logueado; con respecto a products ya viene
      // por la relación, ligado a un solo producto (Ver en ERD)
      .then((items) => {
        let total = 0;
        items.forEach((item) => {
          total += item.product.price;
        });
        let shipping = 700;
        // return res.send(items[0].product.picture)
        return res.render("productCart", { elements: items, total, shipping });
      });
  },
  //Añado un producto al carrito cuando toco el botón en la vista de productDetails
  addToCart: async (req, res) => {
    let productIdToCreate = req.params.id;
    const item = await db.Item.create(
      {
        product_id: productIdToCreate,
      },
      {
        include: [
          {
            association: "users",
            where: {
              id: req.session.userLogged.id,
            },
          },
        ],
      }
    );
    await item.save();
    console.log(item);
    item.setUsers([req.session.userLogged.id]);
    res.redirect("/");
  },
  //Destruyo la sesión y la cookie
  logout: (req, res) => {    
    res.clearCookie("recordarEmail");    
    req.session.destroy(() => {
      return res.redirect("/");
    });
  },

  /* Muestra el Perfil del Usuario */
  profile: (req, res) => {
    let idABuscar = req.params.userId;
    db.User.findByPk(idABuscar).then((user) => {
      //return res.send(user)
      //res.send(user)
      return res.render("userProfile", { user: user });
    });
  },
  //Elimina el producto seleccionado por id
  deleteFromCart: (req, res) => {
    let idABuscar = req.params.id;
    db.Item.destroy({ where: { product_id: idABuscar } })
      .then(() => {      
        res.redirect("/user/cart");
      });
  },
  checkout: (req, res) => {
    res.render("checkout");
  },

  /* Muestra el Formulario de Edición para el Usuario */
  edit: (req, res) => {
    let idABuscar = req.params.userId;
    db.User.findByPk(idABuscar).then((user) => {
      return res.render("userEdit", { user: user });
    });
  },

  /* Actualiza los datos del Usuario */
  update: async (req, res) => {
    
      let errors = validationResult(req);
      let userPass = req.body.password ? req.body.password : undefined;
      let userPassVerification = req.body.password_verification ? req.body.password_verification : undefined;      
      let passEncripted = undefined;

      if (!errors.isEmpty()) {       
        return res.render("userEdit", { user: req.session.userLogged, errors: errors.mapped() });
      }     
      if (userPass != undefined && userPassVerification != undefined && userPass !== userPassVerification) {        
        return res.render("userEdit", {
          user: req.session.userLogged,         
          errors: {
            password_verification: {
              msg: "Las contraseñas no coinciden",
            },
          },
        });
      } else if (userPass != undefined && userPassVerification && userPass == userPassVerification){
        passEncripted = bcrypt.hashSync(userPass, 10);
      }
      
      let userToEdit = {
        ...req.body,
        password: passEncripted,
        avatar: req.file != undefined ? req.file.filename : undefined, //Solo agrega esta propíedad en caso de que se cree agregue una imagen, sino no  
      };     
      delete userToEdit.password_verification; //Necesito borrar el password que se verifica, porque no está hasheado (el otro se pisa directamente)

      try {
        if(!req.cookies.recordarEmail) { //Si no existe la cookie, tengo que pasar esa info cambiada a sesion:         
          req.session.userLogged = {
            ...req.session.userLogged,
            first_name: userToEdit.first_name,
            last_name: userToEdit.last_name,            
            avatar: userToEdit.avatar,            
          }        
        }
        await db.User.update(userToEdit, {where: {id: req.params.userId}});
        return res.redirect(`/user/${req.params.userId}/profile`);

      } catch (error) {
        console.log(error);
      }    
  },
};

module.exports = userController;
