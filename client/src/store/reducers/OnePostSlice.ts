import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { IOnePost, IPost, IUser } from "../../types/types";

export interface OnePostState {
    isLoading: boolean;
    error: string;
    post: IPost;
}

const initialState: OnePostState = {
    post: {} as IPost,
    isLoading: false,
    error: '',
}

const OnePostSlice = createSlice({
    name: 'onePost',
    initialState,
    reducers: {
        postPending(state) {
            state.isLoading = true
        },
        getPost(state, action: PayloadAction<IOnePost>) {
            state.isLoading = false;
            state.error = ''
            state.post = action.payload.post;
        },
        postError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default OnePostSlice.reducer
export const {postPending, getPost, postError
} = OnePostSlice.actions
