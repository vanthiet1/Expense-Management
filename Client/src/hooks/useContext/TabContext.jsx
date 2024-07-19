import { createContext, useState } from "react";
export const TabUiContext = createContext()
const TabContext = ({children}) => {
     const [contentShow,setContentShow] = useState(1);
   
     const handleShowContent = (next)=>{
        setContentShow(next)
     }
    const data = {
        contentShow,
        handleShowContent
    }
    return (
        <div>
            <TabUiContext.Provider value={data}>
                {children}
            </TabUiContext.Provider>
        </div>
    );
};

export default TabContext;