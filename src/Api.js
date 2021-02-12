const baseURL = "http://192.168.0.42:55590/api"

export const buildURL = (url) => {
  return `${baseURL}/${url}`
};

export const sendsurvey = async (dict) => {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(dict);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  };

  await fetch(buildURL('customer'), requestOptions).then((resp) =>{
    return resp.json()
  }).then((data) => {
    return data
  }).catch((e) => {
    return e
  });
};