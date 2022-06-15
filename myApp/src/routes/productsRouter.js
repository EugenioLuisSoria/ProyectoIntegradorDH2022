const express= require ('express');
const router = express.Router();

const productsController = require('../controllers/productsController')
const multerUploadProduct = require('../middlewares/multerProducts');
const productCreateAndEditValidation = require('../middlewares/productCreateAndEditValidation');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/:type/categories', productsController.types)

router.get('/create', authMiddleware, productsController.create);
router.post('/', authMiddleware, multerUploadProduct.single("product_image"), productCreateAndEditValidation, productsController.store);

router.get('/search', productsController.productSearch)

router.get('/:id', productsController.detail);

router.get('/:id/edit', authMiddleware, productsController.edit)
router.put('/:id', authMiddleware, multerUploadProduct.single("product_image"), productCreateAndEditValidation, productsController.update)

router.delete('/:id', authMiddleware, productsController.delete)

module.exports = router;
