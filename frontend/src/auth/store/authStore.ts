import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../slice/Auth-slice'

export const authStore = configureStore({
    reducer:{
        auth:authReducer
    }
})


export type RootState = ReturnType<typeof authStore.getState>;
export type AppDispatch = typeof authStore.dispatch;