import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from '../store/UserSlice'
import workersReducer from '../store/WorkersSlice'
import filtersReducer from '../store/FiltersSlice'
import {setupListeners} from "@reduxjs/toolkit/query";

export const USER_LOGOUT = '@@logout/USER_LOGOUT'

const combinedReducer = combineReducers({
    user: userReducer,
    workers: workersReducer,
    filters: filtersReducer
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined;
    }
    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        })
})

setupListeners(store.dispatch)