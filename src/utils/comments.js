import { cloneDeep } from "lodash";

const addCommentToCorrectParent = (parent, parentId, comment) => {
    const clonedParent = cloneDeep(parent);
    if(parent.id === parentId) {
        clonedParent.replies = [comment, ...clonedParent.replies];
        return clonedParent;
    }
    let latestParent = [];
    // recursively go through the replies
    latestParent = clonedParent.replies.map(reply => addCommentToCorrectParent(reply, parentId, comment));
    return {...clonedParent, replies: latestParent}
    
}

export const addComment = (parent, parentId, comment) => {
    const clonedParent = cloneDeep(parent);
    // if it's a parent comment then add it to root level otherwise add to matching comment replies

    if(!parentId) {
        clonedParent.push(comment);
        return([comment, ...clonedParent]);
    }
    const updatedParent = clonedParent.map(item => addCommentToCorrectParent(item, parentId, comment));
    return updatedParent;
}