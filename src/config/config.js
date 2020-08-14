export const urlbase = "http://localhost:3000";
export const urllogin = urlbase + "/ingresar";

export const getHeader = function () {
    const auth = JSON.parse(atob(localStorage.getItem("token")));

    const headers = {
        'Accept': 'application/json',
        'Authorization': 'bearer ' + auth.access_token
    }
    return headers;
}