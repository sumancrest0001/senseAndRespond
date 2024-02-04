import { Box, Button, Container, Stack } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { commentActions } from '../../redux/reducers/comments.reducer';
import Comment from '../Comment/Comment';

const PAGE_LIMIT = 3;

function CommentsSection(props) {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const authenticatedUser = useSelector(state => state.authenticatedUser);
    const [countPage, setCountPage] = useState(1);

    const comments = useSelector(state => state.comments.comments);
    const totalComments = comments.length;
    const showLoadMoreOption = totalComments > (countPage * PAGE_LIMIT);
    const commentsToShow = comments.length < PAGE_LIMIT ? comments : comments.slice(0, countPage * PAGE_LIMIT);

    const handleAddComment = () => {
        const inputValue = inputRef.current.value;
        const newCommentData = {
            id: uuidv4(),
            comment: inputValue,
            name: authenticatedUser.fullName,
            image: '/images/user-3.jpg',
            replies: []
        }
        dispatch(commentActions.addComment({comment: newCommentData, parentId: null}));
        inputRef.current.value = null;
    }
    return (
        <Box sx={{overflow: 'auto', flexGrow: 1}} px={4} py={2}>
            <Stack gap={1} direction={'row'} mb={2}>
                <input ref={inputRef} type='text' placeholder='Reply...' style={{borderRadius: '10px', padding: '0.5rem 1rem', border: '1px solid gray'}} id="comment" />
                <Button size='small' variant='contained' sx={{textTransform: 'none'}} onClick={handleAddComment}>Reply</Button>
            </Stack>
            <Container sx={{overflow: 'auto', flexGrow: 1, padding: 0}}>
                {
                    commentsToShow.map((comment) => <Comment key={comment.id} comment={comment} backgroundColor={'#EDF5F8'} />)
                }
            </Container>
            {showLoadMoreOption && <Button  sx={{textTransform: 'none'}} size={'small'} onClick={() => setCountPage(prev => prev + 1)}>load more...</Button>}
        </Box>
    );
}

export default CommentsSection;