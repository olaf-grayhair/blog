import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { ICreatePost, IData, ILike, IPost } from "../../types/types";
import { createPost, fetchDeletePost, fetchLike, fetchPosts, uploaFile } from "../actions/PostAction";

interface PostState extends IData{
    // posts: IPost[];
    // postsLength: number ;
    isLoading: boolean;
    error: string;
    post: object | IPost[];
    imageUrl: string;
    like: string;
}

const initialState: PostState = {
    posts: [],
    post: [],
    like: '',
    postsLength: 0,
    isLoading: false,
    error: '',
    imageUrl: '',
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        ///get all posts
        [fetchPosts.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchPosts.fulfilled.type]: (state, action: PayloadAction<IData>) => {
            state.isLoading = false;
            state.error = ''
            state.posts = action.payload.posts;
            state.postsLength = action.payload.postsLength;
        },
        [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///upload poster
        [uploaFile.pending.type]: (state) => {
            state.isLoading = true
        },
        [uploaFile.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = ''
            state.imageUrl = action.payload
        },
        [uploaFile.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///create post
        [createPost.pending.type]: (state) => {
            state.isLoading = true
        },
        [createPost.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = ''
            state.posts.push(action.payload);
        },
        [createPost.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///post like
        [fetchLike.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchLike.fulfilled.type]: (state, action: PayloadAction<ILike>) => {
            state.isLoading = false
            state.error = ''
            state.like = action.payload.result 
        },
        [fetchLike.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///delete post
        [fetchDeletePost.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchDeletePost.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
            state.isLoading = false
            state.error = ''
            state.posts = state.posts.filter(post => post._id !== action.payload._id);
        },
        [fetchDeletePost.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default postSlice.reducer

