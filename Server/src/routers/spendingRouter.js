const express = require('express');
const router = express.Router();
const spendingController = require('../controllers/spendingController/spendingController');
router.post('/', spendingController.addSpending);
router.get('/:userId', spendingController.getSpendingByUserId);
router.get('/detail/:id', spendingController.getSpendingById);
router.delete('/:id', spendingController.deleteSpending);
router.put('/:id', spendingController.editSubCategories);




module.exports = router;
