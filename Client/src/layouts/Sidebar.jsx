import ItemsTabList from "../components/ListItems/ListNavigation";
import { FaArrowLeft } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { TabUiContext } from "../hooks/useContext/TabContext";
import { useContext } from "react";
import { AuthUserContext } from "../hooks/useContext/AuthContext";
const Sidebar = () => {
    const { handleShowContent, contentShow } = useContext(TabUiContext)
    const {token} = useContext(AuthUserContext) 
    const handleLogout = ()=>{
         localStorage.removeItem('token')
         window.location.reload()
    }
    return (
        <>
            <div className=" h-dvh bg-[#F1F5F9] p-4 border-r-2 relative">
                <div className=" border-b-2 flex justify-between items-center pb-3">
                    <div className="flex items-center gap-2">
                        <img className="w-[50px] rounded-full" src="https://media.licdn.com/dms/image/C560BAQF8Kkc256sg1g/company-logo_200_200/0/1630655399134/momo_mservice_logo?e=2147483647&v=beta&t=9lmTRindA_du_ZphKENZIoQzeb5XnPFGeK3dFKCy_8I" alt="" />
                        <div>
                            <span className="text-[20px] block font-bold">Quản Lí</span>
                            <span className="text-[15px] font-medium">Chi Tiêu</span>
                        </div>
                    </div>
                    <div className=" rounded-full cursor-pointer">
                        <FaArrowLeft className="bg-[#fff] w-[30px] h-[30px] p-2 rounded-full" />
                    </div>
                </div>
                <div>
                    {ItemsTabList.map((tabList) => (
                        <>
                            <div className={`flex items-center gap-3 my-2 cursor-pointer rounded-[5px]  p-2 duration-300 hover:shadow ${contentShow === tabList.indexTab ? 'bg-[#CF3D84] text-[#fff]' : null}`} key={tabList.id} onClick={() => handleShowContent(tabList.indexTab)}>
                                <span>{tabList.icon}</span>
                                <span>{tabList.item}</span>
                            </div>
                        </>
                    ))}
                </div>
                {token && token !== undefined && <div className="absolute bottom-0 w-full left-0 p-2">
                    <div className="flex items-center gap-2 my-2 cursor-pointer hover:bg-slate-200 p-2 w-full duration-300 rounded-[5px]">
                        <IoSettingsOutline />
                        <span>Cài Đặt</span>
                    </div>
                    <div className="flex  items-center gap-2 my-2 cursor-pointer hover:bg-slate-200 p-2 w-full duration-300 rounded-[5px]">
                        <MdLogout />
                        <span onClick={()=>handleLogout()}>Đăng Xuất</span>
                    </div>
                </div>}
            

            </div>
        </>
    );
};

export default Sidebar;
