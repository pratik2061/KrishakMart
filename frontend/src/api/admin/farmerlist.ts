import { api } from "../authServices";

export const farmerListApi = async()=>{
    try {
        const res = await api.get('/admin/show/farmers')
        return res 
    } catch (error) {
        return error
    }
}