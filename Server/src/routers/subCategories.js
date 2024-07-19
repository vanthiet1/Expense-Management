const router = require('express').Router()
const SubCategoriesControllers = require('../controllers/categories/subCategoriesController')
router.get('/:id', SubCategoriesControllers.getDeltailSubCategories);
router.get('/', SubCategoriesControllers.getAllSubCategories);
router.get('/user/:userId', SubCategoriesControllers.getSubCategoriesByUserId);
router.post('/add', SubCategoriesControllers.addSubCategories);
router.put('/:id', SubCategoriesControllers.editSubCategories);
router.delete('/:id', SubCategoriesControllers.deleteSubCategories);




module.exports = router;
