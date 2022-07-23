import axios from "axios";
import { AppDispatch } from "../store";
import { IComment, IComments, IData, IOnePost, IPost } from "../../types/types";

import {getContentError} from "../reducers/PostSlice";
import { OnePostState } from "../reducers/CommentSlice";
import { getCommnents, getCommnentspending } from "../reducers/CommentSlice";



export const fetcPostComments = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getCommnentspending())
            const response = await axios.get<IComments>(`http://localhost:5000/api/post/comments/${id}`)
            console.log(response.data);
            
            dispatch(getCommnents(response.data))
        } catch (e) {
            console.log('get post error')
            dispatch(getContentError('e.message'))
        }
    }
}