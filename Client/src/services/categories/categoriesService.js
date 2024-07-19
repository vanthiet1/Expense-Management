import { http } from "../../utils/http";

const categoriesService = {
    getCategories:async ()=>{
        try {
            const {data} = await http.get('/categories')
             return data
        } catch (error) {
             console.log(error);
        }
    },
    addCategories:async ()=>{
        try {
            const {data} = await http.post('/categories')
            console.log(data);
             return data
        } catch (error) {
             console.log(error);
        }
    }
}
export default categoriesService