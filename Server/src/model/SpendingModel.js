const mongoose = require('mongoose')

const SpendingSchema = new mongoose.Schema({
    moneySpending: {
        type: Number,
        required: true,
    },
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
    dateSpending:{
        type:Date,
        required:true,
     },
     note:{
        type:String,
        required:true
     }


})
const Spending = mongoose.model('Spending', SpendingSchema);
module.exports = Spending