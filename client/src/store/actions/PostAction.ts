import axios from "axios";
import { IData, IOnePost, IPost } from "../../types/types";
import { instance } from "../../components/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    'posts/getAll',
    async (sortItem?: string) => {

        let query = ''
        if (sortItem === 'date') {
            query = '?sort=date'
        }
        if (sortItem === 'comments') {
            query = '?sort=comments'
        }
        if (sortItem === 'likes') {
            query = '?sort=likes'
        }
        if (sortItem === '') {
            query = ''
        }

        try {
            const response = await axios.get<IData>(`http://localhost:5000/api/post/all_posts${query}`)

            return response.data
        } catch (e) {
            console.log('upload error')
        }
    }
)

export const uploaFile = createAsyncThunk(
    'posts/uploads',
    async (body: any) => {
        try {
            const formData = new FormData()
            formData.append('image', body)

            const response = await instance.post<any>(`post/upload`, formData)
            return response.data
        } catch (e) {
            console.log('upload error')
        }
    }
)

export const createPost = createAsyncThunk(
    'posts/create',
    async (body: any) => {
        const formData = new FormData()
        formData.append('image', body)
        try {
            const response = await instance.post<any>(`post/add`, body)
            return response.data
        } catch (e) {
            console.log('upload error')
        }
    }
)

export const fetchLike = createAsyncThunk(
    'post/like',
    async (id: string) => {

        try {
            const response = await instance.post<object>(`post/${id}/likes`)
            return response.data
        } catch (e) {
            console.log('upload error')
        }
    }
)

export const fetchDeletePost = createAsyncThunk(
    'post/delete',
    async (id: string) => {

        try {
            const response = await instance.delete<object>(`post/delete/${id}`)
            return response.data
        } catch (e) {
            console.log('upload error')
        }
    }
)

export const fetchSearchPost = createAsyncThunk(
    'post/search',
    async (query: {title: string, search: string}) => {
        const searchType = Object.values(query)[0]
        console.log(searchType, 'like', query);
        let result

        if (searchType === 'title') {
            result = `search?title=${query.search}`
        } else {
            result = `search?tags=${query.search}`
        }
        console.log(result);
        
        try {
            const response = await instance.get<object>(`post/${result}`)
            return response.data
        } catch (e) {
            console.log('search error')
        }
    }
)

export const fetchUserPost = createAsyncThunk(
    'post/user_posts',
    async () => {
        try {
            const response = await instance.get<object>(`post/user_posts`)
            return response.data
        } catch (e) {
            console.log('search error')
        }
    }
)

export const fetchSavedArticle = createAsyncThunk(
    'posts/saved',
    async () => {
        try {
            const response = await instance.get<IData>(`post/user_saved`)
            console.log(response.data);
            return response.data
        } catch (e) {
            console.log('upload error')
        }
    }
)