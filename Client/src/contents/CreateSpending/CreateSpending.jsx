import { useEffect, useState, useContext } from "react";
import subCategoriesService from "../../services/subCategories/subCategoriesService";
import { AuthUserContext } from "../../hooks/useContext/AuthContext";
import spendingService from "../../services/spending/spendingService";
import {  showToastSuccess } from "../../config/toastConfig";
const CreateSpending = (props) => {
    const { handleHideForm, getDataSpending } = props;
    const { user } = useContext(AuthUserContext);
    const [subCategories, setSubcategories] = useState([])
    const [moneySpending, setMoneySpending] = useState(0)
    const [subIdCategoryId, setSubIdCategoryId] = useState("");
    const [noteSpending, setNoteSpending] = useState("")
    const [dateSpending, setDateSpending] = useState('');
    const getAllSubCategories = async () => {
        const subCategories = await subCategoriesService.getSubCategoriesById(user?._id);
        setSubcategories(subCategories)
    }
    useEffect(() => {
        if (user?._id) {
            getAllSubCategories()
        }
    }, [])

    const handleAddSpending = async () => {
        if(!user?._id){
            return
        }
        const data = {
            userId: user?._id,
            moneySpending: moneySpending,
            subCategoryId: subIdCategoryId,
            dateSpending: dateSpending,
            note: noteSpending
        }
        if (!data.moneySpending || !data.subCategoryId || !data.dateSpending || !data.note) {
            return;
        }
        const result = await spendingService.addSpending(data)
        showToastSuccess(result.message)
        handleHideForm()
        getDataSpending()
    }

    return (
        <>
            <div className="bg-[rgb(228,228,228)] p-5 rounded-[5px]">
                <div className="py-3 flex items-center">
                    <img
                        className="w-[150px]"
                        src="https://is.vnecdn.net/v992/33/13/01/4011333/assets/images/momo-doll.png"
                        alt=""
                    />
                    <span className="text-[20px]">Tạo dao dịch </span>
                </div>
                <div className="bg-[#fff] shadow w-[500px] p-3 rounded-[5px]">
                    <div>
                        <label>Số tiền</label>
                        <input
                            onChange={(e) => setMoneySpending(e.target.value)}
                            type="number"
                            placeholder="Tạo mức giao dịch"
                            className="block my-2 w-full p-2 rounded-[5px] border-2 border-slate-300 relative"
                        />
                    </div>
                    <div>
                        <label htmlFor="">Thuộc danh mục</label>
                        <select
                            name=""
                            id=""
                            className="block w-full p-2 border-2 border-slate-300 rounded-[5px] my-2"
                            onChange={(e) => setSubIdCategoryId(e.target.value)}
                        >
                            <option value="">Chọn danh mục</option>
                            {subCategories.map((subCate) => (
                                <option value={subCate._id} key={subCate._id}>
                                    {subCate.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Ngày Tháng</label>
                        <input type="date"
                            className="block my-2 w-full p-2 rounded-[5px] border-2 border-slate-300 relative"
                            onChange={(e) => setDateSpending(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Ghi Chú</label>
                        <input type="text"
                            placeholder="Ghi chú cho giao dịch"
                            className="block my-2 w-full p-2 rounded-[5px] border-2 border-slate-300 relative"
                            onChange={(e) => setNoteSpending(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center mt-3">
                        <button
                            onClick={() => handleAddSpending()}
                            disabled={subIdCategoryId === ""}
                            className={`
                                   ${subIdCategoryId ? "bg-[#CF3D84] text-[#fff]"
                                    : "bg-slate-200"
                                } 
                                w-full rounded-[5px] p-2 text-[#b4b4b4] duration-300`}
                        >
                            Xác nhận
                        </button>
                    </div>
                    <div className="flex justify-center mt-3">
                        <button
                            onClick={() => handleHideForm(false)}
                            className="bg-[#CF3D84] w-full rounded-[5px] p-2 text-[#fff]"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateSpending;