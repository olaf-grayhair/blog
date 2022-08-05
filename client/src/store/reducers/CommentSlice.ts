import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IComment, IComments, IUser } from "../../types/types";
import {  fetcCommentCreate, fetchCommentDelete } from "../actions/CommentAction";

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
        //create comment
        [fetcCommentCreate.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetcCommentCreate.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = ''
            state.comments.push(action.payload)
        },
        [fetcCommentCreate.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        //delete comment
        [fetchCommentDelete.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchCommentDelete.fulfilled.type]: (state, action: PayloadAction<IComment>) => {
            state.error = ''
            state.isLoading = false
            state.comments = state.comments.filter(comment => comment._id !== action.payload._id);
        },
        [fetchCommentDelete.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default commentSlice.reducer
export const {setCommentId} = commentSlice.actions