const express = require('express');
const router = express.Router();

const userApiController = require('../../controllers/api/userApiController.js');
const multerUploadUser = require('../../middlewares/multerUser');
const verificationRegister = require('../../middlewares/verificationRegister');
const validateLogin = require('../../middlewares/validateLogin')
const authMiddleware = require('../../middlewares/authMiddleware')
const guestMiddleware = require('../../middlewares/guestMiddleware')

router.get('/', userApiController.listUsers);
router.get('/:id', userApiController.showOneUser);

module.exports = router;


