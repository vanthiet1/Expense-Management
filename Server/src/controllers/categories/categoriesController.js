const Category = require('../../model/CategoriesModel')

const categoriesControllers = {
    getAllCategories: async (req, res) => {
        try {
            const AllCategories = await Category.find()
                .populate('subcategories', 'name userId budget spending')

            res.status(200).json(AllCategories)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    addCategories: async (req, res) => {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: "Vui lòng nhập tên danh mục" })
            }
            const Category = new Category({
                name
            })
            const saveCategory = await Category.save()
            res.status(200).json(saveCategory)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    editCategories: async (req, res) => {
        try {
            const { name } = req.body;
            const { id } = req.params;
            if (!name) {
                return res.status(400).json({ message: "Vui lòng nhập tên danh mục" })
            }
            if (!id) {
                return res.status(404).json({ message: "Không tìm thấy id" })
            }
            const Category = await Category.findByIdAndUpdate(
                id,
                { name },
                { new: true }
            )
            res.status(200).json({ success: true, message: 'Cập nhật sách thành công', Category });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteCategories: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({ message: "Không tìm thấy id" })
            }
            await Category.findByIdAndDelete(id)
            res.status(200).json({ success: true, message: 'Xóa Danh Mục Thành Công' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

}
module.exports = categoriesControllers;