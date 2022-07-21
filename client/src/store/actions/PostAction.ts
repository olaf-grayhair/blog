import axios from "axios";
import { IData, IPost } from "../../types/types";
import { getContent, getContentError, getContentpending } from "../reducers/PostSlice";
import { AppDispatch } from "../store";


export const getPosts = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getContentpending())
            const response = await axios.get<IData>('http://localhost:5000/post/all_posts')
            console.log(response.data);
            
            dispatch(getContent(response.data))
        } catch (e) {
            console.log('get post error')
            dispatch(getContentError('e.message'))
        }
    }
}

export const getOnePost = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getContentpending())
            const response = await axios.get<IData>(`http://localhost:5000/post/post/${id}`)
            console.log(response.data);
            
            dispatch(getContent(response.data))
        } catch (e) {
            console.log('get post error')
            dispatch(getContentError('e.message'))
        }
    }
}