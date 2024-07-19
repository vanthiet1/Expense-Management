import { http } from "../../utils/http";
import { showToastError, showToastSuccess } from "../../config/toastConfig";
const subCategoriesService = {
    getAllSubCategories: async () => {
        try {
            const { data } = await http.get(`/subcategories`)
            return data
        } catch (error) {
            console.log(error);
        }
    },
    getDetailSubCategoriesById: async (id) => {
        try {
            const { data } = await http.get(`/subcategories/${id}`)
            return data
        } catch (error) {
            console.log(error);
        }
    },
    getSubCategoriesById: async (userId) => {
        try {
            const { data } = await http.get(`/subcategories/user/${userId}`)
            return data
        } catch (error) {
            console.log(error);
        }
    },
    addSubCategories: async (dataCategories) => {
        try {
            const { data } = await http.post('/subcategories/add', dataCategories)
            showToastSuccess(data.message);
            return data
        } catch (error) {
            showToastError(error.response.data.message);
        }
    },
    editSubCategories: async (id,dataUpdate) => {
        try {
            const { data } = await http.put(`/subcategories/${id}`, dataUpdate)
            showToastSuccess(data.message);
            return data
        } catch (error) {
            showToastError(error.response.data.message);
        }
    },
    deleteSubCategories: async (id) => {
        try {
          const {data} = await http.delete(`/subcategories/${id}`)
          return data
        } catch (error) {
            console.log(error);
        }
    }
}
export default subCategoriesService