
import {createSlice} from "@reduxjs/toolkit";


export const emptyInitialStateForWorkersSlice = {
    workers: null
}

const initialState = emptyInitialStateForWorkersSlice

export const workersSlice = createSlice({
    name: 'workers',
    initialState,
    reducers: {

        setWorkers (state, action) {
            state.workers = action.payload
        },
    },
})


export const {
    setWorkers,
} = workersSlice.actions

export default workersSlice.reducer
