import { useContext } from "react";
import Chart from "./Analysis/Chart";
import { AuthUserContext } from "../hooks/useContext/AuthContext";
const AnalysisBudget = () => {
    const { user } = useContext(AuthUserContext)
    console.log(user);
    return (
        <>
            {user.length === 0 ? (
                <>
                <img className="rounded-[10px]" src="https://homepage.momocdn.net/blogscontents/momo-upload-api-231229093948-638394395889774784.jpg" alt="" />
            </>
            ) : (
                <>
                    <Chart />
                </>)}
        </>
    );
};

export default AnalysisBudget;