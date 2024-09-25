
import {createSlice} from "@reduxjs/toolkit";


export const emptyInitialStateForWorkersSlice = {
    rating: 0,
    speciality: null
}

const initialState = emptyInitialStateForWorkersSlice

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {

        setRating (state, action) {
            state.rating = action.payload
        },

        setSpeciality (state, action) {
            state.speciality = action.payload
        },

        clearFilters (state, action) {
            state.rating = 0
            state.speciality = null
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setRating,
    setSpeciality,
    clearFilters
} = filtersSlice.actions

export default filtersSlice.reducer
