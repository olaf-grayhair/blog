import axios from "axios";
import { IData, IOnePost, IPost } from "../../types/types";
import { baseURL, instance } from "../../components/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    'posts/getAll',
    async (item: {sortItem: string, page?: number, limit?: number}) => {

        let query = ''
        if (item.sortItem === 'date') {
            query = '&sort=date'
        }
        if (item.sortItem === 'comments') {
            query = '&sort=comments'
        }
        if (item.sortItem === 'likes') {
            query = '&sort=likes'
        }
        if (item.sortItem === '') {
            query = ''
        }
        // ТЭГИ ОТДЕЛЬНО ????
        console.log(item.limit, 'item.limit');
        
        try {
            const response = await axios.get<IData>(`${baseURL}post/all_posts?page=${item.page}&limit=${query !== '' && item.limit !== undefined ? item.limit : 4}${query}`)
            console.log(response.data);
            
            return response.data
        } catch (e) {
            console.log('upload error')
        }
    }
)

export const uploaFile = createAsyncThunk(
    'posts/uploads',
    async (item: {body: any, id: string}, thunkAPI) => {
        try {
            const formData = new FormData()
            formData.append('image', item.body)
            formData.append('id', item.id)

            const response = await instance.post<string>(`post/upload`, formData)
            return response.data
        } catch (err:any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const createPost = createAsyncThunk(
    'posts/create',
    async (body: any, thunkAPI) => {
        try {
            const response = await instance.post<IData>(`post/add`, body)
            return response.data
        } catch (err:any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const updatePost = createAsyncThunk(
    'posts/update',
    async (item: {body: any, id: string}, thunkAPI) => {
        console.log(item);
        
        try {
            const response = await instance.put<IData>(`post/${item.id}`, item.body)
            return response.data
        } catch (err:any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchLike = createAsyncThunk(
    'post/like',
    async (id: string, thunkAPI) => {

        try {
            const response = await instance.post<IData>(`post/${id}/likes`)
            return response.data
        } catch (err:any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchDeletePost = createAsyncThunk(
    'post/delete',
    async (id: string, thunkAPI) => {

        try {
            const response = await instance.delete<IData>(`post/delete/${id}`)
            return response.data
        } catch (err:any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchSearchPost = createAsyncThunk(
    'post/search',
    async (query: {title: string, search: string}, thunkAPI) => {
        const searchType = Object.values(query)[0]
        let result

        if (searchType === 'title') {
            result = `search?title=${query.search}`
        } else {
            result = `search?tags=${query.search}`
        }
        
        try {
            const response = await instance.get<IData>(`post/${result}`)
            return response.data
        } catch (err:any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchUserPost = createAsyncThunk(
    'post/user_posts',
    async (_, thunkAPI) => {
        try {
            const response = await instance.get<IData>(`post/user_posts`)
            return response.data
        } catch (err:any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchSavedArticle = createAsyncThunk(
    'posts/saved',
    async (_, thunkAPI) => {
        try {
            const response = await instance.get<IData>(`post/user_saved`)
            return response.data
        } catch (err:any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)