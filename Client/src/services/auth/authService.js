import { http } from "../../utils/http";
import { showToastError } from "../../config/toastConfig";
const AuthService = {
       Register: async (dataRegister)=>{
         try {
            const {data} = await http.post('/users/register',dataRegister)
            return data
         } catch (error) {
          showToastError(error.response.data.message);
         }
       },
       Login: async (userDataLogin) => {
        try {
            const response = await http.post(`users/login`, userDataLogin);
            return response.data.token;
        } catch (error) {
          showToastError(error.response.data.message);
        }
    },
      GetUserData: async (token) => {
        try {
            const response = await http.get(`users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error retrieving user data:", error);
            throw new Error("Đã xảy ra lỗi khi lấy dữ liệu người dùng");
        }
    },
    getAllUser:async ()=>{
        try {
            const {data} = await http.get('/users/all');
            return data
        } catch (error) {
             console.log(error);
        }
    },
    deleteUser: async (id)=>{
        try {
            const {data} = await http.delete(`/users/${id}`)
            return data
        } catch (error) {
             console.log(error);
        }
    }
    
}

export default AuthService