import axios from "axios";
import { AppDispatch } from "../store";
import { IComment, IComments, IData, IOnePost, IPost, IUserLogin } from "../../types/types";


import { instance } from "../../components/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserRegistration = createAsyncThunk(
    'user/registration',
     async (body: any, thunkAPI) => {
        try{

            console.log(body);
            
            const response = await instance.post<IUserLogin>(`auth/registration`, body)
            localStorage.setItem('token_blog', response.data.token)
            return response.data
        }catch(err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchUserLogin = createAsyncThunk(
    'user/login',
     async (body: any, thunkAPI) => {
        try{

            console.log(body);
            
            const response = await instance.post<IUserLogin>(`auth/login`, body)
            localStorage.setItem('token_blog', response.data.token)
            return response.data
        }catch(err: any) {
            // console.log('user login error')
            console.log("--fromThunkAPI", typeof(err.response.data));
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchUserAuth = createAsyncThunk(
    'user/auth',
     async (_, thunkAPI) => {
        try{  
            const response = await instance.post<IUserLogin>(`auth/auth`)
            localStorage.setItem('token_blog', response.data.token)
            return response.data
        }catch(err:any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

// export const fetchUserAuth = () => {
//     return async (dispatch: AppDispatch) => {
        
//         try {
//             dispatch(userPending())
//             const response = await instance.post<IUserLogin>(`auth/auth`)
//             console.log(response.data);
//             localStorage.setItem('token_blog', response.data.token)
//             dispatch(userLogin(response.data))
//         } catch (e) {
//             console.log('get user error')
//             dispatch(userError('e.message'))
//         }
//     }
// }

export const fetchUserSetting = createAsyncThunk(
    'user/setting',
     async (body: any) => {
        try{

            console.log(body);
            
            const response = await instance.put<any>(`auth/update`, body)
            return response.data
        }catch(e) {
            console.log('upload error')
        }
    }
)

// function rejectWithValue(data: any): any {
//     throw new Error("Function not implemented.");
// }
