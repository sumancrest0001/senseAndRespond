import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authentication.reducer';
import commentsReducer from './comments.reducer';

const store = configureStore({
    reducer: { 
        comments: commentsReducer,
        authenticatedUser: authenticationReducer
    }
});

export default store;