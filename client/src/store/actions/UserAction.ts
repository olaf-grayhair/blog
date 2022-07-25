import axios from "axios";
import { AppDispatch } from "../store";
import { IComment, IComments, IData, IOnePost, IPost, IUserLogin } from "../../types/types";

import { userError, userLogin, userPending } from "../reducers/UserSlice";
import { instance } from "../../components/instance";


export const fetchUserRegistration = (object: object) => {
    return async (dispatch: AppDispatch) => {
        console.log(object);
        
        try {
            dispatch(userPending())
            const response = await axios.post<IUserLogin>(`http://localhost:5000/auth/registration`, object)
            console.log(response.data);
            localStorage.setItem('token_blog', response.data.token)
            dispatch(userLogin(response.data))
        } catch (e) {
            console.log('get user error')
            dispatch(userError('e.message'))
        }
    }
}

export const fetchUserLogin = (object: object) => {
    return async (dispatch: AppDispatch) => {
        console.log(object);
        
        try {
            dispatch(userPending())
            const response = await axios.post<IUserLogin>(`http://localhost:5000/auth/login`, object)
            console.log(response.data);
            localStorage.setItem('token_blog', response.data.token)
            dispatch(userLogin(response.data))
        } catch (e) {
            console.log('get user error')
            dispatch(userError('e.message'))
        }
    }
}

export const fetchUserAuth = () => {
    return async (dispatch: AppDispatch) => {
        
        try {
            dispatch(userPending())
            const response = await instance.post<IUserLogin>(`auth/auth`)
            console.log(response.data);
            localStorage.setItem('token_blog', response.data.token)
            dispatch(userLogin(response.data))
        } catch (e) {
            console.log('get user error')
            dispatch(userError('e.message'))
        }
    }
}