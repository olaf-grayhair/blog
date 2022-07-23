import axios from "axios";
import { AppDispatch } from "../store";
import { IData, IOnePost, IPost } from "../../types/types";

import { getContent, getContentError, getContentpending, getOnePost, getOnePostError, getOnePostPending } from "../reducers/PostSlice";
import { postPending, getPost, postError, OnePostState } from "../reducers/OnePostSlice";


export const fetchPosts = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getContentpending())
            const response = await axios.get<IData>('http://localhost:5000/api/post/all_posts')
            console.log(response.data);
            
            dispatch(getContent(response.data))
        } catch (e) {
            console.log('get post error')
            dispatch(getContentError('e.message'))
        }
    }
}

export const fetchOnePost = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(postPending())
            const response = await axios.get<IOnePost>(`http://localhost:5000/api/post/${id}`)
            console.log(response.data.user);
            
            dispatch(getPost(response.data))
        } catch (e) {
            console.log('get post error')
            dispatch(postError('e.message'))
        }
    }
}