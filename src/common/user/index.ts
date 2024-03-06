import axios, {ResponseData} from '../axios';
import {showModal} from "../../component/mika-ui";

export let isUserLoggedIn = false;

const token = localStorage.getItem("token");
if (token) {
    isUserLoggedIn = true;
}

const login = async (user: string, password: string, verifyCodeId: string, captcha: string) => {
    try {
        const res = await axios.post("/login", {
            "username": user,
            "password": password,
            "verifyCodeId": verifyCodeId,
            "captcha": captcha
        });
        const data = res.data as ResponseData;
        if (data.code === 200) {
            localStorage.setItem("token", data.data as string);
            isUserLoggedIn = true;
        } else {
            showModal({
                title: "登录失败",
                content: data.message,
            });
        }
        return data.data;
    } catch {
        showModal({
            title: "登录失败",
            content: "网络错误",
        });
    }
}

const logout = () => {
    localStorage.removeItem("token");
    isUserLoggedIn = false;
}

export const getCaptcha = async () => {
    return axios.get("/common/captcha").then(res => res.data as ResponseData).then(data => {
        if (data.code !== 200) {
            return {
                verifyCodeId: "",
                captcha: "",
            };
        }

        const res = data.data as { verifyCodeId: string, captcha: string };
        return {
            verifyCodeId: res.verifyCodeId,
            captcha: res.captcha,
        };
    }).catch(() => {
        return {
            verifyCodeId: "",
            captcha: "",
        };
    });
}

export default {
    isUserLoggedIn,
    login,
    logout,
    getCaptcha
};