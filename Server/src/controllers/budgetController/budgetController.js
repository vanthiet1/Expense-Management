const Budget = require('../../model/BudgetModel');
const SubCategories = require('../../model/SubCategoriesModel')
const bubgetController = {
    addBudgetCategories: async (req, res) => {
        const { userId, subCategoryId, budget } = req.body;
        try {
            let existingBudget = await Budget.findOne({ userId, subCategoryId });
            if (existingBudget) {
                existingBudget.budget = budget;
                await existingBudget.save();
                res.status(200).json({ message: "Ngân sách đã được cập nhật", existingBudget });
            } else {

                const newBudget = new Budget({
                    userId,
                    subCategoryId,
                    budget
                });
                await newBudget.save();
                const subCategory = await SubCategories.findById(subCategoryId);
                if (!subCategory) {
                    return res.status(404).json({ message: "Danh mục con không tồn tại" });
                }
                subCategory.budget = newBudget._id;
                await subCategory.save();
                res.status(201).json({ message: "Thêm Ngân Sách Thành Công", newBudget });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getBudgetById: async (req, res) => {
        const { id } = req.params;
        try {
            const budgets = await Budget.findById(id)
            res.status(200).json(budgets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getBudgetByUserId: async (req, res) => {
        const { userId } = req.params;
        try {
            const budgets = await Budget.find({ userId }).populate('subCategoryId');
            res.status(200).json(budgets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}
module.exports = bubgetController