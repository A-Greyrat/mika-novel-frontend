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

export const getHistoryList = async (pageSize: number = 1000, page: number = 1) => {
    return httpGet<{
        total: number;
        records: HistoryItem[]
    }>(`/reader/history?page=${page}&pageSize=${pageSize}`).then((res) => {
        res.data?.records.forEach((item) => {
            const date = new Date(item.timestamp);
            item.timestamp = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        });
        return res.data;
    });
}

export const getHistory = async (novelId: string, pageSize: number = 1) => {
    return httpGet(`/reader/history/novel?novelId=${novelId}&pageSize=${pageSize}`).then((res) => {
        return res.data as HistoryItem[];
    });
}

export const removeHistory = async (novelId: string) => {
    return httpPost("/reader/history/delete", {
        novelIds: [novelId]
    });
}

// return all tags list
export const getAvailableTags = async () => {
    return httpGet("/novel/available-tags").then((res) => {
        return res.data as {
            id: string;
            tagName: string;
        }[];
    });
}


export const addComment = async (novelId: string, toUid: string, content: string) => {
    return httpPost("/novel/comment/add", {
        novelId: novelId,
        toId: toUid,
        content: content
    });
}

export const deleteComment = async (commentId: string) => {
    return httpPost("/novel/comment/delete", {
        id: commentId
    });
}

export interface NovelPageCommentReply {
    parent?: string;

    id: string;
    time: string;
    content: string;
    replyTo: {
        id: string;
        name: string;
    }
    user: {
        id: string;
        name: string;
        avatar: string;
    }
}

export interface NovelPageCommentProps {
    id: string;
    time: string;
    content: string;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
    reply: NovelPageCommentReply[];
}

export interface Comment {
    id: number;
    userDetail: {
        id: number;
        nickname: string;
        avatar: string;
    };
    toId: number;
    toUserDetail: {
        id: number;
        nickname: string;
        avatar: string;
    } | null;
    content: string;
    timestamp: string;
}

export const getComments = async (novelId: string, page: number, pageSize: number) => {
    return httpGet(`/novel/comment?novelId=${novelId}&page=${page}&pageSize=${pageSize}`).then((res) => {
        const data = res.data as { total: number, records: Comment[][] };
        const ret: NovelPageCommentProps[] = [];
        data?.records?.forEach((item) => {
            const father: NovelPageCommentProps = {
                id: item[0].id.toString(),
                time: item[0].timestamp.replace(/-/g, "/").replace("T", " ").replace(/\.\d+/, ""),
                content: item[0].content,
                user: {
                    id: item[0].userDetail.id.toString(),
                    name: item[0].userDetail.nickname,
                    avatar: item[0].userDetail.avatar
                },
                reply: []
            }
            ret.push(father);
            item?.slice(1).forEach((reply) => {
                father.reply?.push({
                    id: reply.id.toString(),
                    time: reply.timestamp.replace(/-/g, "/").replace("T", " ").replace(/\.\d+/, ""),
                    content: reply.content,
                    replyTo: {
                        id: reply.toUserDetail?.id.toString() || "0",
                        name: reply.toUserDetail?.nickname || "我"
                    },
                    user: {
                        id: reply.userDetail.id.toString(),
                        name: reply.userDetail.nickname,
                        avatar: reply.userDetail.avatar
                    }
                });
            });
        });

        return {
            total: data.total,
            records: ret
        };
    });
}

export const getNextChapter = async (novelId: string, volumeId: string, chapterId: string) => {
    return httpGet(`/novel/chapter/next?nid=${novelId}&vNum=${volumeId}&cNum=${chapterId}`).then((res) => {
        return res.data as {
            id: number,
            novelId: number,
            volumeNumber: number,
            chapterNumber: number,
            title: string,
            timestamp: string,
            content: string
        };
    });
}

export const getPrevChapter = async (novelId: string, volumeId: string, chapterId: string) => {
    return httpGet(`/novel/chapter/previous?nid=${novelId}&vNum=${volumeId}&cNum=${chapterId}`).then((res) => {
        return res.data as {
            id: number,
            novelId: number,
            volumeNumber: number,
            chapterNumber: number,
            title: string,
            timestamp: string,
            content: string
        };
    });
}


export interface HotTagDisplayBlock {
    tag: {
        id: string;
        tagName: string;
    };
    list: NovelInfo[];
}

export const getHotTagDisplayBlocks = async (num: number = 10) => {
    return httpGet<HotTagDisplayBlock[]>(`/novel/hot?num=${num}`).then(res => {
        return res.data as HotTagDisplayBlock[];
    })
};

export const getHotTags = async () => {
    return httpGet<{ id: string; tagName: string; }[]>(`/novel/hot-tags?`).then(res => {
        return res.data;
    });
}

