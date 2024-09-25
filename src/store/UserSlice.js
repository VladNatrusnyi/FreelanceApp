import {createSlice} from "@reduxjs/toolkit";


export const emptyInitialStateForAuthSlice = {
    activeUser: null,
}

const initialState = emptyInitialStateForAuthSlice

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUser(state, action) {
            state.activeUser = action.payload
        },
    },
})


export const {
    setActiveUser,
} = userSlice.actions

export default userSlice.reducer