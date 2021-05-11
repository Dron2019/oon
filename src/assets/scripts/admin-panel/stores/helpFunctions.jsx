export function formDataConstruction(dataObject) {
    const userData = {}
    const sendData = new FormData();
    sendData.append('ajax_data',1);
    Object.entries(dataObject).forEach(value=>{
        userData[value[0]] = value[1];
    });
    return userData;
}