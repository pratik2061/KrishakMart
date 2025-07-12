import { api } from "../../authServices";

export const farmerLoginAuth = async (email: string, password: string) => {
  try {
    const res = await api.post("auth/farmer/login", { email, password });
    return res;
  } catch (error) {
    return error;
  }
};

export const farmerLogoutAuth = async () =>{
    try {
        const res = await api.post('auth/farmer/logout')
        return res
    } catch (error) {
        return error
    }
}
