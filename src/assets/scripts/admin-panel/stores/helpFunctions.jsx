// eslint-disable-next-line import/prefer-default-export
export function formDataConstruction(dataObject) {
  const userData = {};
  const sendData = new FormData();
  sendData.append('ajax_data', 1);
  Object.entries(dataObject).forEach((value) => {
    // eslint-disable-next-line prefer-destructuring
    userData[value[0]] = value[1];
  });
  return userData;
}
