import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { IComment, IComments, IUser } from "../../types/types";

export interface OnePostState {
    isLoading: boolean;
    error: string;
    comments: IComment[];
    users: IUser[];
}

const initialState: OnePostState = {
    comments: [],
    users: [],
    isLoading: false,
    error: '',
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        getCommnentspending(state) {
            state.isLoading = true
        },
        getCommnents(state, action:PayloadAction<IComments>) {
            state.isLoading = false;
            state.error = ''
            state.comments = action.payload.comments;
            state.users = action.payload.users;
        },
        getCommnentsError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default commentSlice.reducer
export const {getCommnentspending, getCommnents, getCommnentsError} = commentSlice.actions