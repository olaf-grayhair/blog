import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    user: [],
    isLoading: false,
    error: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
})

export default userSlice.reducer