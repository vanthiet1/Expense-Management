const router = require('express').Router()
const CategoriesController = require('../controllers/categories/categoriesController')

router.get('/', CategoriesController.getAllCategories);
router.post('/add', CategoriesController.addCategories);
router.put('/:id', CategoriesController.editCategories);
router.delete('/:id', CategoriesController.deleteCategories);




module.exports = router;
