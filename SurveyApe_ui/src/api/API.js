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

export const register = (payload) =>
    fetch(`${apis}/users/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:payload.formData.email,pwd:payload.formData.password,firstname:payload.formData.Fname,lastname:payload.formData.Lname})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

