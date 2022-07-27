import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { ICreatePost, IData, IPost } from "../../types/types";
import { createPost, fetchPosts, uploaFile } from "../actions/PostAction";

interface PostState extends IData{
    // posts: IPost[];
    // postsLength: number ;
    isLoading: boolean;
    error: string;
    post: object | IPost[];
    imageUrl: string;
}

const initialState: PostState = {
    posts: [],
    post: [],
    postsLength: 0,
    isLoading: false,
    error: '',
    imageUrl: '',
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
//         getContentpending(state) {
//             state.isLoading = true
//         },
//         getContent(state, action: PayloadAction<IData>) {
//             state.isLoading = false;
//             state.error = ''
//             state.posts = action.payload.posts;
//             state.postsLength = action.payload.postsLength;
//             // state.users = action.payload.users
//         },
//         getContentError(state, action: PayloadAction<string>) {
//             state.isLoading = false
//             state.error = action.payload
//         },
// ////////////////////////
//         getOnePostPending(state) {
//             state.isLoading = true
//         },
//         getOnePost(state, action: PayloadAction<IData>) {
//             state.isLoading = false;
//             state.error = ''
//             state.post = action.payload;
//         },
//         getOnePostError(state, action: PayloadAction<string>) {
//             state.isLoading = false
//             state.error = action.payload
//         },
        // uploadPostFile(state, action: PayloadAction<string>) {
        //     state.isLoading = false
        //     state.error = ''
        //     state.url = action.payload
        // },
    },
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
            // state.posts.push(action.payload);
            // state.postsLength + 1;
        },
        [createPost.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default postSlice.reducer

