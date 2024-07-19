const router = require('express').Router()
// const getUsers = require('../controllers/clerkController');
const AuthController = require('../controllers/auth/authController')
const authMiddleware = require('../middlewares/authMiddleware')



router.post('/users/register', AuthController.regsiter);
router.post('/users/login', AuthController.login);
router.get('/users',authMiddleware , AuthController.getUserInfo);
router.get('/users/all', AuthController.getAllUser);
router.delete('/users/:id', AuthController.deleteUser);







module.exports = router;
