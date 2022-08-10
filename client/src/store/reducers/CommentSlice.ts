import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IComment, IComments, IUser } from "../../types/types";
import {  fetcCommentCreate, fetchCommentDelete } from "../actions/Comment&&OnePostAction";

export interface OnePostState {
    isLoading: boolean;
    error: string;
    comments: IComment[];
    commentId: string;
}

const initialState: OnePostState = {
    comments: [],
    commentId: '',
    isLoading: false,
    error: '',
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setCommentId(state, action: PayloadAction<string>) {
            state.commentId = action.payload
        },
    },
    extraReducers: {
    }
})

export default commentSlice.reducer
export const {setCommentId} = commentSlice.actions