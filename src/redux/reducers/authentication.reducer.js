/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const authenticationSlice = createSlice({
    name: 'authenticatedUser',
    initialState,
    reducers: {
        setLogInUser(state, action) {
            state = action.payload;
            return state;
        },
        removeLogInUser(state, action) {
            return {};
        }
    }
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;