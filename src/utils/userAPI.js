var BASE_URL = '/api/users/';

function signup(user) {
    return fetch(BASE_URL + 'signup', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(user)
    })
    .then(res => {
        console.log('response', res);
        if (res.ok) return res.json();
        throw new Error('Error from user service');
    })
    // .then(({token}) => token);
    .then(({token}) => console.log('token from server', token))
}

function login(user) {
    return fetch(BASE_URL + 'signup', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(user)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad Credentials')
    })
    .then(({token}) => token);
}

export default {
    signup,
    login
}