

const base_url = 'http://127.0.0.1:8000';

const apiGet = async (url, token) => {
    try{
        let response = await fetch(base_url + url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
                credentials: 'include',
            }
        });
        return await response.json();
    }catch(errors){
        console.log(errors);
    }
}

const apiPost = async (url, formData, token= null) => {
    let headers;
    console.log(token);
    if(token){
        headers = {
            'Authorization': 'Token ' + token,
            credentials: 'include',
        }
    }
    else{
        headers = {
        }
    }
    try{
        let response = await fetch(base_url + url, {
            headers: headers,
            method: 'POST',
            body: formData
        });
        return await response.json();
    }catch(errors){
        console.log(errors);
    }
}

const apiUserData = async (token) => {
    const jsonData = await apiGet('/api/user/data/', token);
    return jsonData ? jsonData[0] : null;
}


module.exports = {
    apiGet,
    apiPost,
    apiUserData,
}