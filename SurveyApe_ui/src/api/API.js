const apis = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';


export const login = (payload) =>
    fetch(`${apis}/users/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:payload.userData.email,pwd:payload.userData.password})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});
