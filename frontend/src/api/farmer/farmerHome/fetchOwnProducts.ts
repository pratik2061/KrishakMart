import { api } from "../../authServices"


export const fetchOwnProducts = async()=>{
    try {
        const res = api.get('/farmer/product')
        return res
    } catch (error) {
        return error
    }
}