import { configureStore } from '@reduxjs/toolkit'
import PostSlice from './reducers/PostSlice'
import UserSlice from './reducers/UserSlice'
// ...

export const store = configureStore({
  reducer: {
    users: UserSlice,
    posts: PostSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch