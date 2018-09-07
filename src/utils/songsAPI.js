var BASE_URL = '/api/songs/';

var getsongs = () => {

    return fetch(BASE_URL + 'getsongs')
    .then(res => {
        console.log('response', res);
        if (res.ok) return res.json();
        throw new Error('Error from user service');
    })
}

export default {
    getsongs
}