import { http } from "../../utils/http";

const spendingService = {
     addSpending: async (dataSpending) => {
          try {
               const { data } = await http.post('/spending', dataSpending)
               return data;
          } catch (error) {
               console.log(error);
          }
     },
     getDataSpending: async (userId) => {
          try {
               const { data } = await http.get(`/spending/${userId}`)
               return data;
          } catch (error) {
               console.log(error);
          }
     },
     getDeltailSpending: async (id) => {
          try {
               const { data } = await http.get(`/spending/detail/${id}`)
               return data;
          } catch (error) {
               console.log(error);
          }
     },
     deleteSpending: async (id)=>{
          try {
               const {data} = await http.delete(`/spending/${id}`)
               return data;
          } catch (error) {
               console.log(error);
          }
      },
      editSpending: async (id,dataSpending)=>{
          try {
               const {data} = await http.put(`/spending/${id}`,dataSpending)
               return data;
          } catch (error) {
               console.log(error);
          }
      }
}

export default spendingService