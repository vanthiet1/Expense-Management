import { useState, useContext } from "react";
import subCategoriesService from "../../services/subCategories/subCategoriesService";
import { AuthUserContext } from "../../hooks/useContext/AuthContext";

const CreateCategories = (props) => {
  const { handleHideForm, categories , getCategories } = props;
  const [nameCategory, setNameCategory] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const { user } = useContext(AuthUserContext);

  const handleCreateCategory = async () => {
    const data = {
      userId: user?._id,
      name: nameCategory,
      parentCategoryId: parentCategoryId,
    };

    if (!data.name || !data.parentCategoryId) {
      return;
    }

    try {
      await subCategoriesService.addSubCategories(data);
      getCategories()
      handleHideForm(false);
      setNameCategory("");
      setParentCategoryId("");
    } catch (error) {
      console.error("Error creating subcategory:", error);
    }
  };

  return (
    <>
      <div className="bg-[rgb(228,228,228)] p-5 rounded-[5px]">
        <div className="py-3 flex items-center">
          <img
            className="w-[200px]"
            src="https://is.vnecdn.net/v992/33/13/01/4011333/assets/images/momo-doll.png"
            alt=""
          />
          <span className="text-[20px]">Tạo danh mục</span>
        </div>
        <div className="bg-[#fff] shadow w-[500px] p-3 rounded-[5px]">
          <div>
            <label>Tên danh mục</label>
            <input
              onChange={(e) => setNameCategory(e.target.value)}
              type="text"
              placeholder="Tạo tên danh mục"
              className="block my-2 w-full p-2 rounded-[5px] border-2 border-slate-300 relative"
            />
          </div>
          <div>
            <label htmlFor="">Thuộc danh mục</label>
            <select
              name=""
              id=""
              className="block w-full p-2 border-2 border-slate-300 rounded-[5px] my-2"
              onChange={(e) => setParentCategoryId(e.target.value)}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={handleCreateCategory}
              disabled={!nameCategory || !parentCategoryId}
              className={`${
                nameCategory && parentCategoryId
                  ? "bg-[#CF3D84] text-[#fff]"
                  : "bg-slate-200"
              } w-full rounded-[5px] p-2 text-[#b4b4b4] duration-300`}
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

export default CreateCategories;
