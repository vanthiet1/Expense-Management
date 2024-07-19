const mongoose = require('mongoose')

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategories'
    }],


})
const Category = mongoose.model('Categories', CategoriesSchema);
module.exports = Category