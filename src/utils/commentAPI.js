const BASE_URL = '/api/comments/';

const getcomments = (songId) => {

    return fetch(BASE_URL + songId)
    .then(res => {
        console.log('response', res);
        if (res.ok) return res.json();
        throw new Error('Error from comment API');
    })
}

const createComments = (comment) => {
    console.log(comment)
    return fetch(BASE_URL,{
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(comment)
    })
    .then(res => {
        console.log('response', res);
        if (res.ok) return res.json();
        throw new Error('Error from comment API');
    })
}

const updateComment = (commentId, request) => {

    return fetch(BASE_URL + commentId ,{
        method: 'PUT',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({comment: request})
    })
    .then(res => {
        console.log('response', res);
        if (res.ok) return res.json();
        throw new Error('Error from comment API');
    })
}

const deleteComment = (commentId) => {

    return fetch(BASE_URL + commentId ,{
        method: 'DELETE',
    })
    .then(res => {
        console.log('response', res);
        if (res.ok) return res.json();
        throw new Error('Error from comment API');
    })
}

export { createComments, updateComment, deleteComment, getcomments }