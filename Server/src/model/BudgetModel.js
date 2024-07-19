const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategories',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
});

const Budget = mongoose.model('Budget', BudgetSchema);
module.exports = Budget;
