export const userIsLoggedIn = () => {

    let d = new Date();
    d.setTime(d.getTime() + (1000));
    let expires = "expires=" + d.toUTCString();

    document.cookie = "token" + "=new_value;path=/;" + expires;
    return document.cookie.indexOf("token" + '=') == -1;
}

export default userIsLoggedIn;