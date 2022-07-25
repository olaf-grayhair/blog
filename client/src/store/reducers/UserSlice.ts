import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { IUserInfo, IUserLogin } from "../../types/types";

interface UserState {
    user: IUserInfo;
    isLoading: boolean,
    isAuth: boolean,
    menu: boolean,
    error: string,
    token: string;
}

const initialState: UserState = {
    user: {} as IUserInfo,
    isAuth: false,
    isLoading: false,
    menu: false,
    error: '',
    token: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userPending(state) {
            state.isLoading = true
        },
        userLogin(state, action: PayloadAction<IUserLogin>) {
            state.isLoading = false;
            state.isAuth = true;
            state.error = ''
            state.user = action.payload.user;
        },
        userError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        showMenu(state, action: PayloadAction<boolean>) {
            state.menu = action.payload
        },
        userLogout(state) {
            state.isAuth = false;
            localStorage.removeItem('token_blog')
            state.error = ''
        },
        
    }
})

export default userSlice.reducer
export const {userPending, userLogin, userError, showMenu, userLogout} = userSlice.actions