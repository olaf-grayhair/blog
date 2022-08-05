import { IComment, IComments, ICreate, IData, IOnePost, IPost } from "../../types/types";
import { instance } from "../../components/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetcCommentCreate = createAsyncThunk(
    'comments/createComment',
    async (body: ICreate, thunkAPI) => {
        try {
            const response = await instance.post<ICreate>(`post/${body.id}/comment`, {text: body.text})
            return response.data
        } catch (err: any) {
            console.log(err.response.data);
            
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchCommentDelete = createAsyncThunk(
    'comments/deletComment',
    async (id: string, thunkAPI) => {
        try {
            const response = await instance.delete<string>(`comment/delete/${id}`)
            return response.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)