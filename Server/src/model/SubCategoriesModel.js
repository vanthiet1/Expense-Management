const mongoose = require('mongoose')

const SubCategorySchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget'
    },
    spending: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spending',
    }],

}, { timestamps: true })
const SubCategories = mongoose.model('SubCategories', SubCategorySchema);
module.exports = SubCategories