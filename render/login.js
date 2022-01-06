const { ipcRenderer, remote } = require('electron');
const {apiPost} = require("./services/api");
const Store = require('electron-store');
const store = new Store();

let email, password = '';



const performSignIn = async (email, password) => {
    let formData = new FormData();
    formData.append('email', email.toLowerCase());
    formData.append('password', password.toString())
    const jsonData =  await apiPost('/api/user/login/', formData);
    if (jsonData && jsonData.token){
        store.set('userToken', jsonData.token)
        return true;
    }
    return false;
}

$(document).ready(() => {
    $('#t-btn-close').click(()=> {
        var window = remote.getCurrentWindow();
        window.close();
    });
    $('#email').change((el)=>{
        let input = $(el.target);
        email = input.val();
    });
    $('#password').change((el)=>{
        let input = $(el.target);
        password = input.val();
    });
    $('#login').on('click', ()=> {
       if(email.length > 0 && password.length > 0){
           performSignIn(email, password).then((success)=>{
               if(success){
                   ipcRenderer.send('login-complete', true);
               }
           }).catch((error)=>{
                console.log(error);
           });
       }
    });
});


