import { IComment, IComments, ICreate, IData, IOnePost, IPost, ISave } from "../../types/types";
import { instance } from "../../components/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetcCommentCreate = createAsyncThunk(
    'comments/createComment',
    async (body: ICreate, thunkAPI) => {
        try {
            const response = await instance.post<ICreate>(`post/${body.id}/comment`, {text: body.text})
            return response.data
        } catch (err: any) {
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

export const fetchOnePost = createAsyncThunk(
    'posts/fetchOnePost',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.get<IOnePost>(`http://localhost:5000/api/post/${id}`)
            console.log(response.data);
            return response.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const saveArticle = createAsyncThunk(
    'posts/saveArticle',
    async (id: string, thunkAPI) => {
        try {
            const response = await instance.post<ISave>(`post/${id}/readingList`)
            console.log(response.data);
            return response.data
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)




