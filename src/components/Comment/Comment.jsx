import { Shortcut } from '@mui/icons-material';
import { Avatar, Box, Button, CardContent, Container, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { commentActions } from '../../redux/reducers/comments.reducer';

function Comment({comment, backgroundColor}) {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const replyInputRef = useRef(null);

    const dispatch = useDispatch();
    const authenticatedUser = useSelector(state => state.authenticatedUser);

    const onCancelReply = () => {
        replyInputRef.current.value = null;
        setShowReplyInput(false);
    }

    const onSaveReply = () => {
        const reply = replyInputRef.current.value;
        const newCommentData = {
            id: uuidv4(),
            comment: reply,
            name: authenticatedUser.fullName,
            image: '/images/user-3.jpg',
            replies: []
        }
        dispatch(commentActions.addComment({parentId: comment.id, comment: newCommentData}));
        replyInputRef.current.value = null;

    }
    return (
        <Container style={{padding: 0}}>
        <Box sx={{ minWidth: 345, padding: '0 0 1rem 0', display: 'flex'}}>
            <Avatar
                src="/images/user-2.jpg"
                alt="commenter profile image"
            />
            <Box>
                <CardContent sx={{backgroundColor: backgroundColor, padding: '0.5rem 1rem', borderRadius: '0 1rem 1rem 1rem', marginLeft: '4px', maxWidth: '400px', width: 'max-content'}}>
                    <Typography gutterBottom variant="h6" component="h6" sx={{fontSize: '14px', lineHeight: 1.25, marginBottom: 0}}>
                    {comment.name}
                    </Typography>
                    <Typography variant="body2" sx={{fontSize: '14px'}}>
                        {comment.comment}
                    </Typography>
                </CardContent>
                <Box>
                  {showReplyInput ? (<>
                    <input type='text' ref={replyInputRef} placeholder='Reply...' style={{borderRadius: '1rem', marginTop: '0.5rem', padding: '0.5rem 1rem', border: '1px solid gray'}} id="comment" />
                    <Stack direction={'row'} mt={0.5}>
                        <Button size="small" onClick={onSaveReply} sx={{textTransform: 'none'}}>Save</Button>
                        <Button size="small" onClick={onCancelReply} sx={{textTransform: 'none'}}>Cancel</Button>
                    </Stack>
                    </>)
                    : (<Button size="small" onClick={() => setShowReplyInput(true)} sx={{textTransform: 'none'}}>Reply</Button>)
                    }
                </Box>
            </Box>
        </Box>
        {showReplies && comment.replies ? (<Box sx={{marginLeft: '1rem'}}>
            {comment.replies.map(item => <Comment key={item.id} comment={item} backgroundColor={'#E9FAFF'}/>)}
        </Box>) : null}
        {!showReplies && comment?.replies?.length ? <Button size="small" sx={{textTransform: 'none'}} startIcon={<Shortcut />} onClick={() => setShowReplies(true)}>{`replies(${comment?.replies?.length})`}</Button>
        : null
        }
        </Container>
    );
}

export default Comment;