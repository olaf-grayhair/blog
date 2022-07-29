import { IComment, IComments, ICreate, IData, IOnePost, IPost } from "../../types/types";
import { instance } from "../../components/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetcPostComments = createAsyncThunk(
    'comments/getPostComments',
    async (id: string) => {
        try {
            const response = await instance.get<IComments>(`api/post/comments/${id}`)
            console.log(response.data);
            return response.data
        } catch (e) {
            console.log('error in fetch comments')
        }
    }
)

export const fetcCommentCreate = createAsyncThunk(
    'comments/createComment',
    async (body: ICreate) => {
        console.log(body.id);
        console.log(body.text);
        
        try {
            const response = await instance.post<ICreate>(`api/post/${body.id}/comment`, {text: body.text})
            console.log(response.data);
            return response.data
        } catch (e) {
            console.log('error in comment create')
        }
    }
)

export const fetchCommentDelete = createAsyncThunk(
    'comments/deletComment',
    async (id: string) => {

        try {
            const response = await instance.delete<string>(`api/comment/delete/${id}`)
            console.log(response.data);
            return response.data
        } catch (e) {
            console.log('error in comment delete')
        }
    }
)