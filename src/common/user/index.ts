import {httpGet, httpPost} from '../axios';

export let isUserLoggedIn = false;

const token = localStorage.getItem("token");
if (token) {
    isUserLoggedIn = true;
}

interface LoginRequest {
    user: string,
    password: string,
    verifyCodeId: string,
    captcha: string,
}

export const login = async ({user, password, verifyCodeId, captcha}: LoginRequest) => {
    return httpPost<string>("/user/login", {
        "username": user,
        "password": password,
        "verifyCodeId": verifyCodeId,
        "captcha": captcha
    }).then(res => {
        if (res.code === 200) {
            localStorage.setItem("token", res.data!);
            isUserLoggedIn = true;
        }
        return res;
    })
}

export const getEmailCaptcha = (email: string) => httpPost(`/common/verify-email`, {email});
export const emailTimeLimit = 60 * 1000;

interface RegisterRequest {
    nickname: string,
    password: string,
    email: string,
    verifyCode: string,
}

export const register = async ({nickname, password, email, verifyCode}: RegisterRequest) => {
    return httpPost<string>("/user/signup", {
        "nickname": nickname,
        "password": password,
        "email": email,
        "verifyCode": verifyCode
    }).then(res => {
        console.log(res)
        if (res.code === 200) {
            localStorage.setItem("token", res.data!);
            isUserLoggedIn = true;
        }
        return res;
    })

}

export const logout = () => {
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
    getCaptcha,
    getEmailCaptcha,
    emailTimeLimit,
    register
};