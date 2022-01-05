const Store = require('electron-store');
const {apiUserData} = require("./api");
const store = new Store();

const validateUserToken = async () => {
    const userToken = store.get('userToken');
    if (userToken){
        const jsonData = await apiUserData(userToken);
        return !!(jsonData && jsonData.id);
    }
    return false
}

module.exports = validateUserToken