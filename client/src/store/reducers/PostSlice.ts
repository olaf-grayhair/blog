import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICreatePost, IData, ILike, IOnePost, IPost } from "../../types/types";
import { createPost, fetchDeletePost, fetchLike, fetchPosts, fetchSavedArticle, fetchSearchPost, fetchUserPost, updatePost, uploaFile } from "../actions/PostAction";

interface PostState extends IData {
    // posts: IPost[];
    // totalPages: number ;
    isLoading: boolean;
    error: string;
    post: IPost[];
    imageUrl: string;
    like: string;
}

const initialState: PostState = {
    posts: [],
    post: [],
    like: '',
    totalPages: 0,
    currentPage: 0,
    isLoading: false,
    error: '',
    imageUrl: '',
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        ///get all posts
        [fetchPosts.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchPosts.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = ''
            // let arr: any[][] = []
            // arr = ([...state.posts, ...action.payload.posts])

            // state.posts = arr.reduce((o: any, i: any) => {
            //     if (!o.find((v: any) => v._id == i._id)) {
            //         o.push(i);
            //     }
            //     return o;
            // }, []);

            // state.posts = [...state.posts, ...action.payload.posts]

            // state.posts = state.posts.filter((value, index, self) =>
            //     index === self.findIndex((t) => (
            //         t._id === value._id && t.title === value.title
            //     ))
            // )

            // state.posts = state.posts.filter((v,i,a)=>a.findIndex(v2=>(v2._id===v._id))===i)

            // if(state.currentPage === action.payload.currentPage) {
            //     state.posts = action.payload.posts
            // }else {
            //     let array = []
            //     array = [...state.posts, ...action.payload.posts]

            //     state.posts = array.filter((v,i,a)=>a.findIndex(v2=>(v2._id===v._id))===i)
            // }

            let array = []
            array = [...state.posts, ...action.payload.posts]

            state.posts = array.filter((v, i, a) => a.findIndex(v2 => (v2._id === v._id)) === i)

            // console.log(state.posts);


            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage


        },
        [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///upload poster
        [uploaFile.pending.type]: (state) => {
            state.isLoading = true
        },
        [uploaFile.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = ''
            state.imageUrl = action.payload
        },
        [uploaFile.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///create post
        [createPost.pending.type]: (state) => {
            state.isLoading = true
        },
        [createPost.fulfilled.type]: (state, action: PayloadAction<IOnePost>) => {
            state.isLoading = false
            state.error = ''
            state.posts.push(action.payload.post);
            state.imageUrl = ''
        },
        [createPost.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///post like
        [fetchLike.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchLike.fulfilled.type]: (state, action: PayloadAction<ILike>) => {
            state.isLoading = false
            state.error = ''
            state.like = action.payload.result
            localStorage.setItem('like', state.like)
        },
        [fetchLike.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///delete post
        [fetchDeletePost.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchDeletePost.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
            state.isLoading = false
            state.error = ''
            state.posts = state.posts.filter(post => post._id !== action.payload._id);
        },
        [fetchDeletePost.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///search post
        [fetchSearchPost.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchSearchPost.fulfilled.type]: (state, action: PayloadAction<IData>) => {
            state.isLoading = false
            state.error = ''
            state.post = action.payload.posts;
        },
        [fetchSearchPost.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///user posts
        [fetchUserPost.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchUserPost.fulfilled.type]: (state, action: PayloadAction<IData>) => {
            state.isLoading = false;
            state.error = ''
            state.posts = action.payload.posts;
            state.totalPages = action.payload.totalPages;
        },
        [fetchUserPost.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        ///reading list
        [fetchSavedArticle.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchSavedArticle.fulfilled.type]: (state, action: PayloadAction<IData>) => {
            state.isLoading = false;
            state.error = ''
            state.posts = action.payload.posts;
            state.totalPages = action.payload.totalPages;
        },
        [fetchSavedArticle.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },

        ///update post
        [updatePost.pending.type]: (state) => {
            state.isLoading = true
        },
        [updatePost.fulfilled.type]: (state, action: PayloadAction<IOnePost>) => {
            state.isLoading = false;
            state.error = ''
            state.posts = state.posts.filter(post => post._id === action.payload.post._id);
        },
        [updatePost.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default postSlice.reducer

