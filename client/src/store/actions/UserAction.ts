import { IUser, IUserLogin } from "../../types/types";


import { instance } from "../../components/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserRegistration = createAsyncThunk(
    'user/registration',
     async (body: {email:string, password:string, firstName:string, surName:string}, thunkAPI) => {
        try{
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
     async (body: {email: string, password:string}, thunkAPI) => {
        try{         
            const response = await instance.post<IUserLogin>(`auth/login`, body)
            localStorage.setItem('token_blog', response.data.token)
            return response.data
        }catch(err: any) {
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

export const fetchUserSetting = createAsyncThunk(
    'user/setting',
     async (body: IUser, thunkAPI) => {
        try{
            const response = await instance.put<IUserLogin>(`auth/update`, body)
            return response.data
        }catch(err:any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const uploadAvatar = createAsyncThunk(
    'posts/upload_avatar',
    async (body: any, thunkAPI) => {
        try {
            const formData = new FormData()
            formData.append('image', body)

            const response = await instance.post<string>(`auth/upload_avatar`, formData)
            return response.data
        } catch (err:any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)
