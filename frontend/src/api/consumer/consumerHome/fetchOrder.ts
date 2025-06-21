import { api } from "../../authServices"

export const fetchOrder = async()=>{
    try {
        const res = await api.get('/consumer/order')
        return res
    } catch (error) {
        return error
    }
}