import { useEffect, useState, useContext } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { IoTrash } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import categoriesService from "../../services/categories/categoriesService";
import { TabUiMainContent } from "../../hooks/useContext/MainTabContext";
import CreateCategories from "./CreateCategories";
import { AuthUserContext } from "../../hooks/useContext/AuthContext";
import CreateBudget from "./CreateBudget";
import subCategoriesService from "../../services/subCategories/subCategoriesService";
import { showToastError, showToastSuccess } from "../../config/toastConfig";
import EditCategories from "./EditCategories";
const Budget = () => {
    const [categories, setCategories] = useState([])
    const [detailSubcategories, setDetailCategories] = useState({})

    const { user } = useContext(AuthUserContext)
    const [showFormAddCategory, setShowFormAddCategory] = useState(false)
    const [showFormAddBudget, setShowFormBudget] = useState(false)
    const [showFormEdit, setShowFormEdit] = useState(false)
    const [IdSubCategories, setIdSubCategories] = useState(null)

    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const { handleShowContent } = useContext(TabUiMainContent)


    const getCategories = async () => {
        const dataCategories = await categoriesService.getCategories()
        const filterCategoris = dataCategories.map(category => ({
            ...category,
            subcategories: category.subcategories.filter(sub => sub.userId === user._id)
        }))
        setCategories(filterCategoris)
    }
    useEffect(() => {
        if(!user?._id){
            return showToastError("Đăng nhập để tạo ngân sách chi tiêu")
        }
        getCategories()
    }, [user])

    const getDetailSubCategories = async (id) => { 
        setSelectedSubCategory(id)
        const dataSubDetailCategories = await subCategoriesService.getDetailSubCategoriesById(id)
        setDetailCategories(dataSubDetailCategories);
    }

    const handleDetailBudget = () => {
        setShowFormBudget(true)
    }
    const handleDeleteSubCategories = async (id) => {
        //  if(!id || id === undefined){
        //     return
        //  }
        console.log(id);
        const resultDele = await subCategoriesService.deleteSubCategories(id)
        getCategories()
        showToastSuccess(resultDele.message)
    }
    const handleEditSubCategories = (id)=>{
        setShowFormEdit(true)
        setIdSubCategories(id)
    }
    return (
        <>
            <div className="relative ">
                {showFormAddBudget && (
                    <div className="absolute left-[20%] top-[0%] z-20">
                        <CreateBudget handleHideForm={setShowFormBudget} detailSubcategories={detailSubcategories} />
                    </div>
                )}
                {showFormAddCategory && (
                    <div className="absolute left-[20%] top-[5%] z-10">
                        <CreateCategories getCategories={getCategories} categories={categories} handleHideForm={setShowFormAddCategory} />
                    </div>
                )}
                {showFormEdit && (
                    <div className="absolute left-[20%] top-[5%] z-10">
                        <EditCategories getCategories={getCategories} categories={categories} handleHideForm={setShowFormEdit} IdSubCategories={IdSubCategories} />
                    </div>
                )}

                <div className="flex justify-between gap-5 bg-pink-500 w-full rounded-[5px] p-5" >
                    <div className="flex gap-2">
                        <div>
                            <span className="text-[20px] block font-bold text-[#fff]">Chọn 1 danh mục chi tiêu</span>
                            <span className="text-[15px] text-[#fff]">Bạn sẽ được thông báo khi chi tiêu <br /> danh mục đạt giới hạn tối đa</span>
                        </div>
                        <div>
                            <img className="w-[100px]" src="https://is.vnecdn.net/v992/33/13/01/4011333/assets/images/momo-doll.png" alt="" />
                        </div>
                    </div>
                    <div>
                        <button onClick={() => handleShowContent(1)} className="bg-[#fff] text-pink-500 rounded-[5px] p-2 w-[150px] font-bold">Quay lại</button>
                    </div>
                </div>
                <div className="overflow-auto h-[400px]">
                    {categories && categories.map((category) => (
                        <div key={category._id} className="bg-slate-200 my-2 p-3 rounded-[5px] items-center">
                            <span className="font-semibold">{category.name}</span>
                            {category?.subcategories?.map((ChildCategory) => (
                                <div className="flex w-full items-center gap-2" key={ChildCategory._id}>
                                    <div className="bg-[#fff] p-2 rounded-[5px] my-2 cursor-pointer flex justify-between items-center w-[100%]" onClick={() => getDetailSubCategories(ChildCategory._id)} >
                                        <span className="block" >{ChildCategory?.name}</span>
                                        <input
                                            type="radio"
                                            checked={selectedSubCategory === ChildCategory._id}
                                            onChange={() => setSelectedSubCategory(ChildCategory._id)}
                                        />
                                    </div>

                                    <div className=" flex justify-center gap-3" >
                                        <IoTrash onClick={() => handleDeleteSubCategories(ChildCategory._id)} className="text-[20px] text-[#CF3D84] cursor-pointer" />
                                        
                                        <AiFillEdit onClick={()=>handleEditSubCategories(ChildCategory._id)} className="text-[20px] text-[#CF3D84] cursor-pointer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="flex justify-center mt-4 items-center gap-2 cursor-pointer border-2 border-[#CF3D84] p-2 rounded-[5px]" onClick={() => setShowFormAddCategory(true)}>
                        <CiSquarePlus className="text-[25px] text-[#CF3D84]" />
                        <span className="text-[#CF3D84] font-semibold">Tạo danh mục</span>
                    </div>
                </div>
                <div className="absolute  bottom-[-70px] left-[0] w-full flex justify-center"  >
                    <button
                        onClick={() => handleDetailBudget()}
                        disabled={selectedSubCategory === null}
                        className={` w-full text-center  p-2 rounded-[5px] cursor-pointer duration-300 ${selectedSubCategory ? 'bg-[#CF3D84] text-[#fff]' : 'bg-slate-200 text-slate-500'}`}

                    >Tiếp tục</button>
                </div>
            </div >
        </>
    );
};

export default Budget;