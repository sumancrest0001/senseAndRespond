import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import CommentsPage from './pages/comments/comments';
import LoginPage from './pages/login/login';
import SignUpPage from './pages/signup/signup';
import { authenticationActions } from './redux/reducers/authentication.reducer';

function App(props) {
    const dispatch = useDispatch();
    const authenticatedUser = useSelector(state => state.authenticatedUser)
    useEffect(() => {
        if(!authenticatedUser?.id) {
            const cachedAuthenticatedUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if(cachedAuthenticatedUser?.id) {
                dispatch(authenticationActions.setLogInUser(cachedAuthenticatedUser));
            }
        }
    },[]);

    return (
        <Routes>
            <Route path="/" element={<h1>Home page <Link to={'/comments'}>Comments page</Link></h1>} />
            <Route path="/comments" element={<CommentsPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
        </Routes>
    );
}

export default App;