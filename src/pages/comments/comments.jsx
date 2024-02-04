import { Avatar, Box, Button, Container, Paper, Stack } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentsSection from '../../components/CommentSection/CommentsSection';
import { authenticationActions } from '../../redux/reducers/authentication.reducer';
import { performLogOut } from '../../utils/authentication';
import './comment.css';

function CommentsPage(props) {
    const authenticatedUser = useSelector(state =>state.authenticatedUser);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        performLogOut();
        dispatch(authenticationActions.removeLogInUser());

    }
    return (
        <Container>
            <Box>
                <Button size="small" style={{textTransform: 'none'}} onClick={handleLogOut}>Log out</Button>
            </Box>
            <Paper elevation={4} className={'paper'}>
                <Stack direction={'column'} sx={{height: '100%'}}>
                    <Box className={'author'}>
                    <Avatar
                        src="/images/user-3.jpg"
                        alt="author profile image"
                    />
                        <Box ml={1}>
                            <Box component={'p'} className={'author-name'}>Adam Smith</Box>
                            <Box component={'p'} className={'post-ago'}>2d</Box>
                        </Box>
                    </Box>
                    <Box sx={{ borderBottom: 1, borderColor: '#F3E9E9', padding: '1rem 2rem' }}>
                        <Box component={'p'} className='content-title'>Celebrating New Year</Box>
                        <Box component={'p'} className='content-description'>One more year loaded with sweet recollections and cheerful times has passed. All my friends made my year exceptionally uncommon, and I wish this continues forever. With you around, each minute is a unique event for me. I wish you to Happy new year to all of you.</Box>
                    </Box>
                    <Box sx={{ borderBottom: 1, borderColor: '#F3E9E9', padding: '1rem 2rem' }} className='comment'>Comments</Box>
                    {authenticatedUser?.id ? <CommentsSection /> : <Box className={"message"}>Please <Link to={'/signin'}>login</Link> to view or add comment on the post</Box>}
                </Stack>
            </Paper>
        </Container>
    );
}

export default CommentsPage;