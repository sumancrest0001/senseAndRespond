/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';
import { addComment } from '../../utils/comments';

const initialState = { comments: [
    {
        "id": "ab4e6b14-1b52-4d32-910f-68a3a56fcc2f",
        "comment": "this is my first comment",
        "name": "suman shrestha",
        "image": "/images/user-3.jpg",
        "replies": []
    },
    {
        "id": "1215bde9-4523-49de-994b-19cc0a3fd800",
        "comment": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        "name": "suman shrestha",
        "image": "/images/user-3.jpg",
        "replies": [
            {
                "id": "e1e5c601-382c-4027-992a-1356f06808e0",
                "comment": "this isi me",
                "name": "suman shrestha",
                "image": "/images/user-3.jpg",
                "replies": [
                    {
                        "id": "96d966f3-dc1b-426b-aa93-145136ca5ec2",
                        "comment": "another comment",
                        "name": "suman shrestha",
                        "image": "/images/user-3.jpg",
                        "replies": []
                    }
                ]
            }
        ]
    },
    {
        "id": "c8304789-0260-49fd-a7a0-07808eac71f6",
        "comment": "this",
        "name": "suman shrestha",
        "image": "/images/user-3.jpg",
        "replies": []
    },
    {
        "id": "35457dc1-8901-4a93-8417-32dec0778f76",
        "comment": "comment after commment",
        "name": "suman shrestha",
        "image": "/images/user-3.jpg",
        "replies": []
    },
    {
        "id": "72ade59b-f9d1-41f1-8fd7-035817972ac7",
        "comment": " is a long established fact that a reader will be distracted by the readab",
        "name": "suman shrestha",
        "image": "/images/user-3.jpg",
        "replies": []
    },
    {
        "id": "1d950af9-1efc-4acb-a0dd-78202c11c346",
        "comment": "em Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and",
        "name": "suman shrestha",
        "image": "/images/user-3.jpg",
        "replies": []
    },
    {
        "id": "e1d1f120-d531-4fca-9989-8a1680cbb680",
        "comment": "t, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, som",
        "name": "suman shrestha",
        "image": "/images/user-3.jpg",
        "replies": []
    },
    {
        "id": "c2378e1d-e47f-44dd-9068-eb27bcc487b3",
        "comment": "re many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or",
        "name": "suman shrestha",
        "image": "/images/user-3.jpg",
        "replies": []
    },
    {
        "id": "a6191401-a094-4c64-befa-314e743a67d4",
        "comment": "k like readable English. Many desktop publishing packages and web",
        "name": "suman shrestha",
        "image": "/images/user-3.jpg",
        "replies": []
    },
    {
        "id": "24cb48d3-d6e6-4077-a5c8-f804fe5968ca",
        "comment": "m Ipsum is not simply random text. It has roots in a piece of classica",
        "name": "suman shrestha",
        "image": "/images/user-3.jpg",
        "replies": []
    },
    {
        "id": "595f4bf6-f84c-4f19-a201-6b27377b61e6",
        "comment": "ent of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and ",
        "name": "suman shrestha",
        "image": "/images/user-3.jpg",
        "replies": []
    }
]};

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment(state, action) {
            const currentComments = current(state.comments);
            const updatedState = addComment(currentComments, action.payload.parentId, action.payload.comment);
            return {comments: updatedState};
        },
       /*  removeComment(state, action) {
            state.selectedLanguage = action.selectedLanguage
            return state;
        } */
    }
});

export const commentActions = commentSlice.actions;

export default commentSlice.reducer;