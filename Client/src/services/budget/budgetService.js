import { http } from "../../utils/http";

const budgetService = {
    getBudgetByUserId:async (userId)=>{
        try {
            const {data} = await http.get(`/budget/${userId}`)
             return data
        } catch (error) {
             console.log(error);
        }
    },
    getBudgetById:async (id)=>{
        try {
            const {data} = await http.get(`/budget/${id}`)
             return data
        } catch (error) {
             console.log(error);
        }
    },
    addBudget:async (dataBudget)=>{
        try {
            const {data} = await http.post('/budget',dataBudget)
            console.log(data);
             return data
        } catch (error) {
             console.log(error);
        }
    }
}
export default budgetService