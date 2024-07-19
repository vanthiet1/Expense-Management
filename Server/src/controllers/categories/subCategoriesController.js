const Category = require('../../model/CategoriesModel')
const SubCategories = require('../../model/SubCategoriesModel')
const Budget = require('../../model/BudgetModel')
const subCategoriesControllers = {
    getAllSubCategories:async (req,res)=>{
        try {
            const subCategories = await SubCategories.find()
            res.status(200).json(subCategories)
        } catch (error) {
           res.status(500).json({message:error.message});
        }
       },
    getDeltailSubCategories:async (req,res)=>{
     try {
         const { id } = req.params;
         if(!id){
            return res.status(400).json({message:"Không tìm thấy id"})
         }
         const subCategoriesDetail = await SubCategories.findById(id)
         .populate('budget','budget')
         .populate('spending','moneySpending')
         res.status(200).json(subCategoriesDetail)
     } catch (error) {
        res.status(500).json({message:error.message});
     }
    },
    getSubCategoriesByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            if (!userId) {
                return res.status(400).json({ message: "Không tìm thấy user" });
            }

            const subCategoriesDetail = await SubCategories.find({ userId })
            .populate('budget','budget')
            .populate('spending','moneySpending')


            res.status(200).json(subCategoriesDetail);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    addSubCategories: async (req, res) => {
        const { name, parentCategoryId, userId } = req.body;
        try {
            const parentCategory = await Category.findById(parentCategoryId);
            if (!parentCategoryId) {
                return res.status(404).json({ message: 'Bạn chưa chọn danh mục' });
            }
            if (!parentCategory) {
                return res.status(404).json({ message: 'Danh mục cha không tồn tại' });
            }
            const subCategory = new SubCategories({
                name,
                parentCategory: parentCategoryId,
                userId: userId
            });
            await subCategory.save();
            parentCategory.subcategories.push(subCategory._id);
            await parentCategory.save();
            res.status(201).json({ message: "Thêm thành công", subCategory });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    editSubCategories: async (req, res) => {
        try {
            const { name } = req.body;
            const { id } = req.params;
            if (!name) {
                return res.status(400).json({ message: "Vui lòng nhập tên danh mục" })
            }
            if (!id) {
                return res.status(404).json({ message: "Không tìm thấy id" })
            }
            const Category = await SubCategories.findByIdAndUpdate(
                id,
                { name },
                { new: true }
            )
            res.status(200).json({ success: true, message: 'Cập nhật sách thành công', Category });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteSubCategories: async (req, res) => {
        try {
            const { id } = req.params;
            await Budget.deleteMany(
                { subCategoryId: id },
                { $pull: { subCategoryId: id } }
            );

            if (!id) {
                return res.status(404).json({ message: "Không tìm thấy id" })
            }
            await SubCategories.findByIdAndDelete(id)

            await Category.updateMany(
                { subcategories: id },
                { $pull: { subcategories: id } }
            );
            res.status(200).json({ success: true, message: 'Xóa Danh Mục Thành Công' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // 
 

}
module.exports = subCategoriesControllers;