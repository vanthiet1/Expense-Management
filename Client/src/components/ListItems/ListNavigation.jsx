import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { FaMoneyBillWheat } from "react-icons/fa6";
const ItemsTabList = [
    {
        icon:<FaHome className="text-[25px] text-slate-800"/>,
        item:"Trang Chính",
        indexTab:1
    },
    {
        icon:<IoIosCreate className="text-[25px] text-slate-800"/>,
        item:"Tạo Ngân Sách Chi Tiêu",
        indexTab:2
    },
    {
        icon:<FaMoneyBillWheat className="text-[25px] text-slate-800"/>,
        item:"Tạo Chi Tiêu",
        indexTab:3
    }
]
export default ItemsTabList