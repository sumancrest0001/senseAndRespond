import { cloneDeep } from "lodash";

const addCommentToCorrectParent = (parent, parentId, comment) => {
    const clonedParent = cloneDeep(parent);
    // if it's a parent comment then add it to root level otherwise add to matching comment replies
    if(!parentId) {
        clonedParent.push(comment);

        return clonedParent;
    }

    if(parent.id === parentId || !parentId) {
        parent.replies = [comment, ...parent.replies];
        return parent;
    }
    let latestParent = [];
    // recursively go through the replies
    latestParent = parent.replies.map(reply => addCommentToCorrectParent(reply, parentId, comment));
    return {...parent, replies: latestParent}
    
}

export const addComment = (parent, parentId, comment) => {
    const clonedParent = cloneDeep(parent);

    if(!parentId) {
        clonedParent.push(comment);
        return(clonedParent);
    }
    const updatedParent = clonedParent.map(item => addCommentToCorrectParent(item, parentId, comment));
    return updatedParent;
}