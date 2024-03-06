import axios, {AxiosRequestConfig} from 'axios';

const instance = axios.create({
    baseURL: 'https://118.31.42.183/api',
    timeout: 5000,
});

export const httpGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T | null>> => {
    return instance.get(url, config)
        .then(res => res.data as ResponseData<T>)
        .catch(() => errorResponse);
}

export const httpPost = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ResponseData<T | null>> => {
    return instance.post(url, data, config)
        .then(res => res.data as ResponseData<T>)
        .catch(() => errorResponse);
}

export interface ResponseData<T> {
    code: number;
    message: string;
    data: T;
}

export const errorResponse : ResponseData<null> = {
    code: 400,
    data: null,
    message: '网络错误',
};

export default instance;