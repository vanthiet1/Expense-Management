import { useContext } from "react";
import AnalysisBudget from "../contents/AnalysisBudget";
import MainCreateBudget from "../contents/MainCreateBudget";
import { TabUiContext } from "../hooks/useContext/TabContext";
import Spending from "../contents/CreateSpending/Spending";
const Content = () => {
    const { contentShow } = useContext(TabUiContext)

    return (
        <div className="p-3">
            {contentShow === 1 && (<AnalysisBudget />)}
            {contentShow === 2 && (<MainCreateBudget />)}
            {contentShow === 3 && (<Spending />)}
        </div>
    );
};

export default Content;