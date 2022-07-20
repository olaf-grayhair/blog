import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface UserState {
    user: any[],
    isLoading: boolean,
    error: string,
    count: number
}

const initialState: UserState = {
    user: [],
    isLoading: false,
    error: '',
    count: 0
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment(state, action: PayloadAction<number>) {
            state.count += action.payload
        }
    }
})

export default userSlice.reducer
export const {increment} = userSlice.actions