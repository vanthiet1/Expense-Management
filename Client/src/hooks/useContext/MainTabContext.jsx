import { useState } from "react";
import { createContext } from "react";
export const TabUiMainContent = createContext()
const MainTabContext = ({ children }) => {
    const [tabContentCreateBudget, setTabContentCreateBudget] = useState(1)
   
    const handleShowContent = (next) => {
        localStorage.setItem('tabContentBudget', JSON.stringify(next))
        const tabNumber = JSON.parse(localStorage.getItem('tabContentBudget'))
        setTabContentCreateBudget(tabNumber)
    }
    const data = {
        tabContentCreateBudget,
        handleShowContent
    }
    return (
        <div>
            <TabUiMainContent.Provider value={data}>
                {children}
            </TabUiMainContent.Provider>
        </div>
    );
};

export default MainTabContext;