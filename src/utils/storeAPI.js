var BASE_URL  = 'api/store';


getproducts = () => {

    return fetch(BASE_URL + '')
    .then(res => {
        console.log('response', res);
        if (res.ok) return res.json();
        throw new Error('Error from user service');
    })

}

export default {
    getproducts
}