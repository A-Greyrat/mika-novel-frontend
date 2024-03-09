import {httpGet} from "../axios";

export const getCarouselNovelList = () => {
    httpGet('/novel/carousel').then((res) => {
        console.log(res);
    });
}

