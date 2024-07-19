import { useState, useEffect } from "react";
import spendingService from "../../services/spending/spendingService";
import { showToastSuccess } from "../../config/toastConfig";

const UpdateSpending = (props) => {
    const { idSpending, handleHideForm , subCategories , getDataSpending} = props;
    const [dataDetailSpending, setDataDetailSpending] = useState({
        moneySpending: 0,
        subCategoryId: "",
        dateSpending: "",
        note: ""
    });

    useEffect(() => {
        const getData = async () => {
            const detailData = await spendingService.getDeltailSpending(idSpending);
            const data = {
                moneySpending: detailData.moneySpending || "",
                subCategoryId: detailData?.subCategoryId?._id || "",
                dateSpending: detailData.dateSpending || "",
                note: detailData.note || ""
            };
            setDataDetailSpending(data);
        };
        getData();
    }, [idSpending]);

    const handleEditSpending = async () => {
        const data = {
            moneySpending: dataDetailSpending.moneySpending,
            subCategoryId: dataDetailSpending.subCategoryId,
            dateSpending: dataDetailSpending.dateSpending,
            note: dataDetailSpending.note
        };

        if (!data.moneySpending && !data.dateSpending && !data.subCategoryId && !data.note) {
            return;
        }

        try {
            const result = await spendingService.editSpending(idSpending, data);
            handleHideForm(false);
            showToastSuccess(result.message);
            getDataSpending()
        } catch (error) {
            console.error("Error creating subcategory:", error);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataDetailSpending(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div className="bg-[rgb(228,228,228)] p-5 rounded-[5px]">
                <div className="py-3 flex items-center">
                    <img
                        className="w-[150px]"
                        src="https://is.vnecdn.net/v992/33/13/01/4011333/assets/images/momo-doll.png"
                        alt=""
                    />
                    <span className="text-[20px]">Chỉnh Sửa Chi Tiêu</span>
                </div>
                <div className="bg-[#fff] shadow w-[500px] p-3 rounded-[5px]">
                    <div>
                        <label>Số tiền</label>
                        <input
                            name="moneySpending"
                            value={dataDetailSpending.moneySpending}
                            onChange={handleChange}
                            type="number"
                            placeholder="Tạo mức giao dịch"
                            className="block my-2 w-full p-2 rounded-[5px] border-2 border-slate-300 relative"
                        />
                    </div>
                    <div>
                        <label htmlFor="">Thuộc danh mục</label>
                        <select
                            name="subCategoryId"
                            value={dataDetailSpending.subCategoryId}
                            className="block w-full p-2 border-2 border-slate-300 rounded-[5px] my-2"
                            onChange={handleChange}
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
                        <input
                            name="dateSpending"
                            value={dataDetailSpending.dateSpending}
                            type="date"
                            className="block my-2 w-full p-2 rounded-[5px] border-2 border-slate-300 relative"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Ghi Chú</label>
                        <input
                            name="note"
                            value={dataDetailSpending.note}
                            type="text"
                            placeholder="Ghi chú cho giao dịch"
                            className="block my-2 w-full p-2 rounded-[5px] border-2 border-slate-300 relative"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-center mt-3">
                        <button
                            onClick={() => handleEditSpending()}
                               className="bg-[#CF3D84] w-full rounded-[5px] p-2 text-[#fff]"
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

export default UpdateSpending;
