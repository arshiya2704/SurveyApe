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

export const postSurvey = (payload) =>
    fetch(`${apis}/surveys/addSurvey`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"survey":{"name":payload.survey.name,"type":payload.survey.type,"users":payload.survey.users,"email":payload.survey.email,"publish":payload.survey.publish,"end":payload.survey.end},"questions":payload.survey.questions})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});



export const getSurvey = (payload) =>
    fetch(`${apis}/surveys/getSurvey`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const getUniqueSurvey = (payload) =>
    fetch(`${apis}/surveys/getUniqueSurvey`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"survey":{"name":payload.sname},"user":{"email":payload.email}})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});




export const getSurveys = (payload) =>
    fetch(`${apis}/surveys/getSurveys`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});


export const submitSurvey = (payload) =>
    fetch(`${apis}/surveys/addResponse`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"responses":payload})
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});
