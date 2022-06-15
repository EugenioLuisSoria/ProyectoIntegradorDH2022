const { table } = require("console");
const path = require("path");
const db = require("../../database/models/index")

const productsApiController = {

  list: async (req, res) => {    
    const products = await db.Product.findAll({
      include: [
        {
          association: 'product_category'
        },
      //   {
      //     association: 'items',
      //     include: {association: 'users'}
      //   }
      ]
    });

    const [laptops, smartphones, tablets, accesories] = await Promise.all([
      db.Product.findAll({
        include: [
          {
            association: 'product_category',
            where: {
              type: 'laptops'
            }
          },
        ]
      }),

      db.Product.findAll({
        include: [
          {
            association: 'product_category',
            where: {
              type: 'smartphones'
            }
          },
        ]
      }),

      db.Product.findAll({
        include: [
          {
            association: 'product_category',
            where: {
              type: 'tablets'
            }
          },
        ]
      }),

      db.Product.findAll({
        include: [
          {
            association: 'product_category',
            where: {
              type: 'accesories'
            }
          },
        ]
      })  
    ]);
   
    const newProductsArray = products.map( (product) => {
      return {
          id: product.id,
          name: product.name,
          description: product.description,          
          category: product.product_category.type,          
          detail: '/api/products/' + product.id
      }
    });
    
    /* En este formado lo tengo que entregar después, para eso, incluyo este objeto ya formateado */
    /* de newProductsArray dentro de la clave products con destructuring */
    /* Lo que faltaría es analizar como contar por categoria los productos */
    return res.json({
      count: newProductsArray.length,
      countByCategory: {
        laptopsCount: laptops.length,
        smartphonesCount: smartphones.length,
        tabletsCount: tablets.length,
        accesoriesCount: accesories.length
      },
      products: [...newProductsArray]        
      
    });
  },

  detail: async (req, res) => {    
    let productToFind = req.params.id;
    const product = await db.Product.findByPk(productToFind, {
      include: [
        {association: 'product_category'},
        {
          association: 'items',
          include: [{association: 'users'}]
        }
      ]
    });
    return res.json({
      id: product.id,
      name: product.name,
      description: product.description,        
      stock: product.stock,  
      weight: product.weight,  
      color: product.color,  
      size: product.size,
      price: product.price,
      discount: product.discount,
      picture: product.picture,
      category: product.product_category.type,      
      // items: product.items.users,      Falta refinar esta parte que sería el array con todas las relaciones 1 a muchos que hay
      detail: '/api/products/' + product.id
    });
  },

};

module.exports = productsApiController;
