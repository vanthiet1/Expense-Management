const Spending = require('../../model/SpendingModel');
const SubCategories = require('../../model/SubCategoriesModel')

const spendingController = {
    addSpending: async (req,res) => {
        try {
            const {moneySpending ,subCategoryId , dateSpending , note , userId} = req.body;
            const sub = await SubCategories.findById(subCategoryId);
            if (!sub) {
              return res.status(404).json({ success: false, message: 'Không tìm thấy dự án' });
            }
            const newSpending = new Spending ({
                userId,
                moneySpending,
                subCategoryId,
                dateSpending,
                note
             })
             await newSpending.save();
              sub.spending.push(newSpending._id);
              await sub.save(); 
             res.status(201).json({ success: true, message: 'Chi Tiêu Được Thêm Thành Công', newSpending });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getSpendingByUserId:async (req,res)=>{
        try {
            const { userId } = req.params;
            if (!userId) {
                return res.status(400).json({ message: "Không tìm thấy user" });
            }
            const spendingDetail = await Spending.find({ userId })
            .populate('subCategoryId','name')
            res.status(200).json(spendingDetail);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getSpendingById:async (req,res)=>{
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "Không tìm thấy user" });
            }
            const spendingDetail = await Spending.findById(id)
            .populate('subCategoryId','name')
            res.status(200).json(spendingDetail);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteSpending:async (req,res) =>{
        try {
             const {id} = req.params;
             const spedingDele = await Spending.findByIdAndDelete(id);
             if (!spedingDele) {
                 return res.status(404).json({ message: 'Spending not found' });
             }
             await SubCategories.updateMany(
                { spending: id },
                { $pull: { spending: id } }
            );
             res.status(200).json({ success: true, message: 'Xóa Thành Công' });
        } catch (error) {
             res.status(500).json({message: error.message});
        }
     },
     editSubCategories: async (req, res) => {
        try {
            const { moneySpending , dateSpending , subCategoryId , note } = req.body;
            const { id } = req.params;
            if (! moneySpending && !dateSpending && !subCategoryId && !note) {
                return res.status(400).json({ message: "Vui lòng nhập đầy đủ" })
            }
            if (!id) {
                return res.status(404).json({ message: "Không tìm thấy id" })
            }
            const existingSpending = await Spending.findById(id);
            if (!existingSpending) {
                return res.status(404).json({ message: "Không tìm thấy giao dịch" });
            }
            const oldSubCategoryId = existingSpending.subCategoryId;

            const newSpendingUpdate = await Spending.findByIdAndUpdate(
                id,
                { moneySpending , dateSpending , subCategoryId , note },
                { new: true }
            )
            if (subCategoryId && oldSubCategoryId.toString() !== subCategoryId.toString()) {
                await SubCategories.findByIdAndUpdate(oldSubCategoryId, {
                    $pull: { spending: id }
                });
    
                await SubCategories.findByIdAndUpdate(subCategoryId, {
                    $push: { spending: id }
                });
            }
            res.status(200).json({ success: true, message: 'Cập nhật sách thành công', newSpendingUpdate });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}
module.exports = spendingController