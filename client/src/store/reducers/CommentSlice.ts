import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { IComment, IComments, IUser } from "../../types/types";
import { fetcPostComments, fetcCommentCreate } from "../actions/CommentAction";

export interface OnePostState {
    isLoading: boolean;
    error: string;
    comments: IComment[];
    // users: IUser[];
}

const initialState: OnePostState = {
    comments: [],
    // users: [],
    isLoading: false,
    error: '',
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    // reducers: {
    //     getCommnentspending(state) {
    //         state.isLoading = true
    //     },
    //     getCommnents(state, action:PayloadAction<IComments>) {
    //         state.isLoading = false;
    //         state.error = ''
    //         state.comments = action.payload.comments;
    //     },
    //     getCommnentsError(state, action: PayloadAction<string>) {
    //         state.isLoading = false
    //         state.error = action.payload
    //     },
    // },
    extraReducers: {
        [fetcCommentCreate.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetcCommentCreate.fulfilled.type]: (state, action:PayloadAction<any>) => {
            state.isLoading = false
            state.error = ''
            state.comments.push(action.payload)
        },
        [fetcCommentCreate.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///load comments
        [fetcPostComments.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetcPostComments.fulfilled.type]: (state, action:PayloadAction<IComments>) => {
            state.isLoading = false
            state.error = ''
            state.comments = action.payload.comments;
        },
        [fetcPostComments.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default commentSlice.reducer
// export const {getCommnentspending, getCommnents, getCommnentsError} = commentSlice.actions