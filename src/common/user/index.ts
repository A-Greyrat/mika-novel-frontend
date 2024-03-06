import {httpGet, httpPost} from '../axios';

export let isUserLoggedIn = false;

const token = localStorage.getItem("token");
if (token) {
    isUserLoggedIn = true;
}

const login = async (user: string, password: string, verifyCodeId: string, captcha: string) => {
    return httpPost("/login", {
        "username": user,
        "password": password,
        "verifyCodeId": verifyCodeId,
        "captcha": captcha
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

const logout = () => {
    localStorage.removeItem("token");
    isUserLoggedIn = false;
}

interface Captcha {
    verifyCodeId: string;
    captcha: string;
}

export const getCaptcha = async () => {
    return httpGet<Captcha>("/common/captcha");
}

export default {
    isUserLoggedIn,
    login,
    logout,
    getCaptcha
};