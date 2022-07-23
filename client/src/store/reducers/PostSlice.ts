import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { IData, IPost } from "../../types/types";

interface PostState extends IData{
    // posts: IPost[];
    // postsLength: number ;
    isLoading: boolean;
    error: string;
    post: object | IPost[]
}

const initialState: PostState = {
    posts: [],
    post: [],
    users: [],
    postsLength: 0,
    isLoading: false,
    error: '',
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getContentpending(state) {
            state.isLoading = true
        },
        getContent(state, action: PayloadAction<IData>) {
            state.isLoading = false;
            state.error = ''
            state.posts = action.payload.posts;
            state.postsLength = action.payload.postsLength;
            state.users = action.payload.users
        },
        getContentError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
////////////////////////
        getOnePostPending(state) {
            state.isLoading = true
        },
        getOnePost(state, action: PayloadAction<IData>) {
            state.isLoading = false;
            state.error = ''
            state.post = action.payload;
        },
        getOnePostError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default postSlice.reducer
export const {getContent, getContentpending, getContentError,
    getOnePostPending, getOnePost, getOnePostError
} = postSlice.actions
