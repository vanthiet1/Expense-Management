import { useContext } from "react";
import { AuthUserContext } from "../hooks/useContext/AuthContext";
const IsCheckUser = ({children}) => {
    const { user } = useContext(AuthUserContext)
    if (!user) {
        return null
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default IsCheckUser;