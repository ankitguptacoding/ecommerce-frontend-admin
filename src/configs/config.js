const apiBaseUrl = 'http://localhost:450/'; //Local
// const apiBaseUrl = '192.168.1.6:450/'; //Local

let token = JSON.parse(localStorage.getItem("token"));
const config = {
    headers:{
        'content-type': 'application/json',
        Authorization: token
    }
  };
module.exports ={
    apiBaseUrl,
    config
}