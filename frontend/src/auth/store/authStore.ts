import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../slice/Auth-slice'
import farmerAuthReducer from '../slice/FarmerAuth-slice'

export const authStore = configureStore({
    reducer:{
        auth:authReducer,
        farmerAuth : farmerAuthReducer
    }
})


export type RootState = ReturnType<typeof authStore.getState>;
export type AppDispatch = typeof authStore.dispatch;