const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');
const multerUploadUser = require('../middlewares/multerUser');
const verificationRegister = require('../middlewares/verificationRegister');
const validateLogin = require('../middlewares/validateLogin')
const validateUserEdit = require('../middlewares/validateUserEdit')
const authMiddleware = require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')

router.get('/login', guestMiddleware, userController.loginForm);
router.post('/login', validateLogin, userController.loginProcess);

router.get('/register', guestMiddleware, userController.registerForm);
//debido a que Multer agrega campos al req.body:
// el orden de Multer y Verification debe ser asi: 1ero Multer, 2do Verification.
router.post('/register', multerUploadUser.single('avatar'), verificationRegister, userController.registerUpload);

router.get('/cart', authMiddleware, userController.getCart);

router.post('/:id',authMiddleware, userController.addToCart);

router.delete('/:id', userController.deleteFromCart);

router.get('/checkout', authMiddleware, userController.checkout);

router.get('/logout', authMiddleware, userController.logout);

router.get('/:userId/profile', userController.profile);

router.get('/:userId/edit', authMiddleware, userController.edit);
router.put('/:userId', multerUploadUser.single('avatar'), validateUserEdit, userController.update);

module.exports = router;


