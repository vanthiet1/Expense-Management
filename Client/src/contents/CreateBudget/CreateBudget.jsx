import { useState, useContext, useEffect } from "react";
import { showToastSuccess } from "../../config/toastConfig";
import { AuthUserContext } from "../../hooks/useContext/AuthContext";
import subCategoriesService from "../../services/subCategories/subCategoriesService";
import budgetService from '../../services/budget/budgetService'
import { formatCurrency } from "../../config/formatCurrency";
const CreateBudget = (props) => {
  const [bubget, setBubget] = useState(0);
  const [bubgetCategories, setBubgetCategories] = useState(0);
  const [totalMoneySpending, setTotalMoneySpending] = useState(0)
  const [overdue,setOverdue] = useState(0)

  const { user } = useContext(AuthUserContext);
  const { handleHideForm, detailSubcategories } = props

  const handleCreateBudget = async () => {
    const data = {
      subCategoryId: detailSubcategories?._id,
      userId: user?._id,
      budget: bubget
    };
    if (!data.subCategoryId || !data.userId || !data.budget) {
      return;
    }
    try {
      const result = await budgetService.addBudget(data);
      handleHideForm(false);
      showToastSuccess(result.message)
      getBudgetByUserId()
      setBubget("")
    } catch (error) {
      console.error("Error creating subcategory:", error);
    }
  };
  const getBudgetByUserId = async () => {
    const dataBudget = await subCategoriesService.getDetailSubCategoriesById(detailSubcategories._id)
    setBubgetCategories(dataBudget?.budget.budget)
  }
  useEffect(() => {
    getBudgetByUserId()
  }, [])
  useEffect(() => {
    const total = detailSubcategories?.spending?.reduce((acc, curr) => acc + curr.moneySpending, 0);
    setTotalMoneySpending(total)
    if (total > bubgetCategories) {
      setOverdue(total - bubgetCategories);
  } else {
      setOverdue(0); 
  }
  }, [detailSubcategories,bubgetCategories]);



  return (
    <>
      <div className="bg-[rgb(228,228,228)] p-5 rounded-[5px]">
        <div className="py-3">
          <img
            className="w-[200px]"
            src="https://is.vnecdn.net/v992/33/13/01/4011333/assets/images/momo-doll.png"
            alt=""
          />
          <span className="text-[20px] block">Đặt hạn mức chi tiêu</span>
          <span className="text-[16px] block">Bạn sẽ được thông báo khi chi tiêu danh mục đạt tới giới hạn</span>

        </div>
        <div className="bg-[#fff] shadow w-[500px] p-3 rounded-[5px]">
          <div className="my-2">
            <span className="block">Danh mục</span>
            <span className="text-[20px] font-semibold block">{detailSubcategories?.name}</span>
            <span className="block">Ngân sách</span>
            <div className="flex items-center gap-4">
              <span className="text-[20px] font-semibold block">
                {bubgetCategories ? formatCurrency(bubgetCategories) : "Chưa có ngân sách"}
              </span>
              <span>
                {totalMoneySpending !== 0 && (
                  <>
                    {totalMoneySpending > bubgetCategories ? (<span className="text-red-500 text-[13px] font-bold">Vượt Quá { formatCurrency(overdue)}</span>) : null}
                  </>
                )}
              </span>
            </div>
          </div>
          <div>
            <label>Số tiền chi tiêu tối đa</label>
            <input
              onChange={(e) => setBubget(e.target.value)}
              type="number"
              placeholder="0đ"
              className="block my-2 w-full p-2 rounded-[5px] border-2 border-slate-300 relative"
            />
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={handleCreateBudget}
              disabled={bubget === 0}
              className={`${bubget
                ? "bg-[#CF3D84] text-[#fff]"
                : "bg-slate-200"
                } w-full rounded-[5px] p-2 text-[#b4b4b4] duration-300`}
            >
              {bubgetCategories === 0 ? "Tạo ngân sách" : "Sửa ngân sách"}
            </button>
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={() => handleHideForm(false)}
              className="bg-red-600 w-full rounded-[5px] p-2 text-[#fff]"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBudget;
