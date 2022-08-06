import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUserInfo, IUserLogin } from "../../types/types";
import { fetchUserAuth, fetchUserLogin, fetchUserRegistration, fetchUserSetting } from "../actions/UserAction";

interface UserState {
    user: IUserInfo;
    isLoading: boolean,
    isAuth: boolean,
    menu: boolean,
    popup: boolean,
    popupPost: boolean,
    message: string,
    token: string;
    search: string;
}

const initialState: UserState = {
    user: {} as IUserInfo,
    isAuth: false,
    isLoading: false,
    menu: false,
    popup: false,
    popupPost: false,
    message: '',
    token: '',
    search: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // userPending(state) {
        //     state.isLoading = true
        // },
        // userLogin(state, action: PayloadAction<IUserLogin>) {
        //     state.isLoading = false;
        //     state.isAuth = true;
        //     state.message = ''
        //     state.user = action.payload.user;
        // },
        // userError(state, action: PayloadAction<string>) {
        //     state.isLoading = false
        //     state.message = action.payload
        // },
        showMenu(state, action: PayloadAction<boolean>) {
            state.menu = action.payload
        },
        setSearchItem(state, action: PayloadAction<string>) {
            state.search = action.payload
        },
        showPopup(state, action: PayloadAction<boolean>) {
            state.popup = action.payload
        },
        showPopupPost(state, action: PayloadAction<boolean>) {
            state.popupPost = action.payload
        },
        userLogout(state) {
            state.isAuth = false;
            state.user = {} as IUserInfo
            localStorage.removeItem('token_blog')
            state.message = ''
        },

    },
    extraReducers: {
        ///user registration
        [fetchUserRegistration.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchUserRegistration.fulfilled.type]: (state, action: PayloadAction<IUserLogin>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.message = action.payload.message
            state.user = action.payload.user;
        },
        [fetchUserRegistration.rejected.type]: (state, action: PayloadAction<IUserLogin>) => {
            state.isLoading = false
            state.message = action.payload.message
        },
        ///user login
        [fetchUserLogin.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchUserLogin.fulfilled.type]: (state, action: PayloadAction<IUserLogin>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.message = action.payload.message
            state.user = action.payload.user;
        },
        [fetchUserLogin.rejected.type]: (state, action: PayloadAction<IUserLogin>) => {
            // debugger
            state.isLoading = false
            state.message = action.payload.message
        },
        ///user auth
        [fetchUserAuth.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchUserAuth.fulfilled.type]: (state, action: PayloadAction<IUserLogin>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.message = action.payload.message
            state.user = action.payload.user;
        },
        [fetchUserAuth.rejected.type]: (state, action: PayloadAction<IUserLogin>) => {
            state.isLoading = false
            state.message = action.payload.message
        },
        ///update user setting
        [fetchUserSetting.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchUserSetting.fulfilled.type]: (state, action: PayloadAction<IUserLogin>) => {
            state.isLoading = false
            state.message = ''
            state.user = action.payload.user
        },
        [fetchUserSetting.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.message = action.payload
        },
    }
})

export default userSlice.reducer
export const { 
    // userPending, userLogin, userError, 
    showMenu, showPopup, showPopupPost, userLogout, setSearchItem } = userSlice.actions