import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IComment, ILike, IOnePost, IPost, ISave, IUser } from "../../types/types";
import { fetcCommentCreate, fetchCommentDelete, saveArticle } from "../actions/Comment&&OnePostAction";
import { fetchOnePost } from "../actions/Comment&&OnePostAction";

export interface OnePostState {
    isLoading: boolean;
    error: string;
    post: IPost;
    save: string;
    readingList: any[];
}

const initialState: OnePostState = {
    post: {} as IPost,
    isLoading: false,
    error: '',
    save: '',
    readingList: [],
}

const OnePostSlice = createSlice({
    name: 'onePost',
    initialState,
    reducers: {},
    extraReducers: {
        ///get one post
        [fetchOnePost.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchOnePost.fulfilled.type]: (state, action: PayloadAction<IOnePost>) => {
            state.isLoading = false;
            state.error = ''
            state.post = action.payload.post;

        },
        [fetchOnePost.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///add comment
        [fetcCommentCreate.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetcCommentCreate.fulfilled.type]: (state, action: PayloadAction<IComment>) => {
            state.isLoading = false
            state.error = ''
            state.post.comments.push(action.payload)
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
            state.post.comments = state.post.comments.filter(comment => comment._id !== action.payload._id);
        },
        [fetchCommentDelete.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///post save
        [saveArticle.pending.type]: (state) => {
            state.isLoading = true
        },
        [saveArticle.fulfilled.type]: (state, action: PayloadAction<ISave>) => {
            state.isLoading = false
            state.error = ''
            state.save = action.payload.result
            state.readingList = action.payload.readingList
            localStorage.setItem('post', state.save)
            localStorage.setItem('saved_posts', JSON.stringify(action.payload.readingList))
        },
        [saveArticle.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default OnePostSlice.reducer

