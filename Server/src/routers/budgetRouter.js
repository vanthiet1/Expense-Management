const router = require('express').Router()
const BubgetController = require('../controllers/budgetController/budgetController')




router.post('/', BubgetController.addBudgetCategories);
router.get('/:id', BubgetController.getBudgetById);
router.get('/:userId', BubgetController.getBudgetByUserId);





module.exports = router;
