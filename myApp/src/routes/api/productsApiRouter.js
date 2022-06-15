const express= require ('express');
const router = express.Router();

const productsApiController = require('../../controllers/api/productsApiController')
const multerUploadProduct = require('../../middlewares/multerProducts');
const productCreateAndEditValidation = require('../../middlewares/productCreateAndEditValidation');

router.get('/', productsApiController.list)
router.get('/:id', productsApiController.detail);


module.exports = router;
