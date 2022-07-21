import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { IData, IPost } from "../../types/types";
// export interface IPost {
//     _id: string;
//     title: string;
//     text: string;
//     tags: string;
//     imageUrl: string;
//     timestamps: string;
//     user: string;
//     comments: any[];
// }

// export interface IData {
//     posts: any[];
//     postsLength: number;
// }



interface PostState {
    posts: IPost[];
    postsLength: number ;
    isLoading: boolean;
    error: string;
}

const initialState: PostState = {
    posts: [],
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
        },
        getContentError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default postSlice.reducer
export const {getContent, getContentpending, getContentError} = postSlice.actions
