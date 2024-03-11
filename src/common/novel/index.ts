import {httpGet, httpPost} from "../axios";

export interface NovelInfo {
    id: string;
    title: string;
    description: string;
    cover: string;
    tags: {
        id: string;
        tagName: string;
    }[];
    author: string;
}

export interface NovelPageVolumeInfo {
    id: string;
    title: string;
    chapters: {
        id: string;
        title: string;
        volumeId: string;
        novelId: string;
    }[];
}


export const getCarouselNovelList = async (num: number = 6) => {
    return httpGet<NovelInfo[]>(`/novel/carousel?num=${num}`).then((res) => {
        return res.data as NovelInfo[];
    });
};


export const getRecommendNovelList = async (num: number = 5) => {
    return httpGet<NovelInfo[]>(`/novel/recommend?num=${num}`).then((res) => {
        return res.data as NovelInfo[];
    });
};


export const getNovelInfo = async (id: string): Promise<NovelInfo> => {
    return httpGet<NovelInfo>(`/novel?nid=${id}`).then((res) => {
        return res.data as NovelInfo;
    });
}

export const getNovelVolumes = async (id: string): Promise<NovelPageVolumeInfo[]> => {
    return httpGet(`/novel/contents?nid=${id}`).then((res) => {
        const data = res.data as {
            [key: string]: {
                id: number;
                title: string;
                chapterNumber: number;
                novelId: number;
                volumeNumber: number;
            }[]
        };
        const volumeData: NovelPageVolumeInfo[] = [];
        for (const key in data) {
            const [id, title] = key.split("::");
            volumeData.push({
                id: id,
                title: title,
                chapters: data[key].map((v) => {
                    return {
                        id: v.chapterNumber.toString(),
                        title: v.title,
                        volumeId: v.volumeNumber.toString(),
                        novelId: v.novelId.toString()
                    }
                })
            });
        }
        return volumeData;
    });
}

export const getRelatedNovels = async (id: string, num: number = 3): Promise<NovelInfo[]> => {
    return httpGet(`/novel/related?nid=${id}&num=${num}`).then((res) => {
        return res.data as NovelInfo[];
    });
}

export const getNovelContent = async (novelId: string, volumeId: string, chapterId: string) => {
    return httpGet(`/novel/chapter?nid=${novelId}&vNum=${volumeId}&cNum=${chapterId}`).then((res) => {
        const data = res.data as { title: string, content: string };
        return {
            title: data.title,
            content: JSON.parse(data.content)
        };
    });
}

export const getSearchedNovels = async (keyword: string, page: number, pageSize: number) => {
    return httpGet(`/search/book?title=${keyword}&page=${page}&pageSize=${pageSize}`).then((res) => {
        return res.data as {
            total: number;
            records: NovelInfo[];
        };
    });
}

export const addFavorite = async (novelId: string) => {
    return httpPost("/reader/favorites/add", {
        novelIds: [novelId]
    });
}

export const removeFavorite = async (novelId: string) => {
    return httpPost("/reader/favorites/delete", {
        novelIds: [novelId]
    });
}

export const getFavoriteList = async (pageSize: number = 1000, page: number = 1) => {
    return httpGet(`/reader/favorites?pageSize=${pageSize}&page=${page}`).then((res) => {
        return res.data as {
            total: number;
            records: (NovelInfo & { novelId: number })[];
        };
    });
}

export const getIsFavorite = async (novelId: number) => {
    // return getFavoriteList().then((res) => {
    //     return res.records.some((item) => {
    //         return item.novelId === novelId;
    //     });
    // });

    return httpGet(`/reader/favorites/contains?novelId=${novelId}`).then((res) => {
        return res.data as boolean;
    });
}

export const getRankList = async (rankName: string, page: number, pageSize: number) => {
    return httpGet(`/novel/ranklist?timeType=${rankName}&page=${page}&pageSize=${pageSize}`).then((res) => {
        return res.data as {
            total: number;
            records: NovelInfo[];
        };
    });
}

export interface HistoryItem {
    novelId: number;
    volumeId: number;
    volumeNumber: number;
    chapterNumber: number;
    timestamp: string;
    novelTitle: string;
    author: string;
    cover: string;
    chapterTitle: string;
}

export const getHistoryList = async (pageSize: number = 1000) => {
    return httpGet<HistoryItem[]>(`/reader/history?pageSize=${pageSize}`).then((res) => {
        return res.data as HistoryItem[];
    });
}
