import axios from "axios";
import { AppDispatch } from "../store";
import { IData, IOnePost, IPost } from "../../types/types";

// import { uploadPostFile} from "../reducers/PostSlice";
import { postPending, getPost, postError, OnePostState } from "../reducers/OnePostSlice";
import { instance } from "../../components/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    'posts/getAll',
     async () => {
        try{
            const response = await axios.get<IData>('http://localhost:5000/api/post/all_posts')
            return response.data
        }catch(e) {
            console.log('upload error')
        }
    }
)

export const fetchOnePost = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(postPending())
            const response = await axios.get<IOnePost>(`http://localhost:5000/api/post/${id}`)
            console.log(response.data);
            
            dispatch(getPost(response.data))
        } catch (e) {
            console.log('get post error')
            dispatch(postError('e.message'))
        }
    }
}

export const uploaFile = createAsyncThunk(
    'posts/uploads',
     async (body: any) => {
        try{
            const formData = new FormData()
            formData.append('image', body)

            const response = await instance.post<any>(`api/post/upload`, formData)
            return response.data
        }catch(e) {
            console.log('upload error')
        }
    }
)

// export const uploadAvatar = (file: any) => {
//     return async (dispatch: AppDispatch) => {
//         try{           
//             const formData = new FormData()
//             formData.append('image', file)

//             const response = await instance.post<any>(`api/post/upload`, formData)

//             dispatch(uploadPostFile(response.data))

//         }catch(e) {
//             console.log('upload error')
//         }
//     }
// }

export const createPost = createAsyncThunk(
    'posts/create',
     async (body: any) => {
        const formData = new FormData()
        formData.append('image', body)
        try{
            const response = await instance.post<any>(`api/post/add`, body)
            return response.data
        }catch(e) {
            console.log('upload error')
        }
    }
)