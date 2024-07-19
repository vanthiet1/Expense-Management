import { createContext, useEffect, useState } from "react";
import AuthService from "../../services/auth/authService";
export const AuthUserContext = createContext()
const AuthContext = ({ children }) => {
    const [user, setUser] = useState([])
    const [token, setUserToken] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storeToken = JSON.parse(localStorage.getItem('token'))
                setUserToken(storeToken)
                if (!storeToken) {
                    return;
                }
                const UserData = await AuthService.GetUserData(storeToken ? storeToken : null);
                if (UserData) {
                    setUser(UserData);
                    return
                }
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchData();
    }, [])
    return (
        <div>
            <AuthUserContext.Provider value={{user,token}}>
                {children}
            </AuthUserContext.Provider>
        </div>
    );
};

export default AuthContext;