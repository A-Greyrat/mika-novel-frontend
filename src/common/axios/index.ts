import axios, {AxiosRequestConfig} from 'axios';
import {showModal} from "../../component/mika-ui";
import {isUserLoggedIn} from "../user";
import {withLock} from "../../component/mika-ui/utils/utils.ts";

export const baseURL = 'http://118.31.42.183:8080';

const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['token'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

const expireModal = withLock((_lock: boolean) => {
    showModal({
        title: "登录过期",
        content: "登录已过期，请重新登录",
        onOk: () => {
            _lock = false;
            localStorage.removeItem("token");
            window.location.reload();
        },
        closeIcon: false,
        closeOnClickMask: false,
        footer: "ok",
    });
});

instance.interceptors.response.use(response => {
    if (response.headers['token']) {
        localStorage.setItem('token', response.headers['token']);
    }

    return response;
}, error => {
    if (error.response.status === 401) {
        if (isUserLoggedIn) {
            expireModal();
        }
    }
    return Promise.reject(error);
});

export const httpGet = async <T, >(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T | null>> => {
    return instance.get(url, config)
        .then(res => res.data as ResponseData<T>)
        .catch(() => errorResponse);
}

export const httpPost = async <T, >(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ResponseData<T | null>> => {
    config = config || {};
    config.headers = {
        'Content-Type': 'application/json',
    };

    return instance.post(url, data, config)
        .then(res => res.data as ResponseData<T>)
        .catch(() => errorResponse);
}

export interface ResponseData<T> {
    code: number;
    msg: string;
    data: T;
}

export const errorResponse: ResponseData<null> = {
    code: 400,
    data: null,
    msg: '网络错误',
};

export default instance;