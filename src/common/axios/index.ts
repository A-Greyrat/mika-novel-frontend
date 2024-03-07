import axios, {AxiosRequestConfig} from 'axios';

const instance = axios.create({
    baseURL: 'http://118.31.42.183:8080',
    timeout: 5000,
});

export const httpGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T | null>> => {
    return instance.get(url, config)
        .then(res => res.data as ResponseData<T>)
        .catch(() => errorResponse);
}

export const httpPost = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ResponseData<T | null>> => {
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

export const errorResponse : ResponseData<null> = {
    code: 400,
    data: null,
    msg: '网络错误',
};

export default instance;