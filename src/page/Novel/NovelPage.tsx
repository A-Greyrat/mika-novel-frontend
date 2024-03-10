import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import './NovelPage.less';
import {useEffect, useState} from "react";
import NovelPageRecommend from "./NovelPageRecommend";
import {useParams} from "react-router-dom";
import {getNovelInfo, NovelInfo} from "../../common/novel";
import $404 from "../404/404";
import NovelPageDetail from "./NovelPageDetail.tsx";
import NovelPageDesc from "./NovelPageDesc.tsx";
import NovelPageVolume from "./NovelPageVolume.tsx";
import NovelPageComment from "./NovelPageComment.tsx";

const testCommentData = [
    {
        "id": "1",
        "content": "感觉不如...赛尔号",
        "time": "2021-08-12 12:00:00",
        "user": {
            "id": "1",
            "name": "张三",
            "avatar": "https://via.placeholder.com/100"
        }
    },
    {
        "id": "2",
        "content": "感觉不如...福利连",
        "time": "2021-08-12 12:00:00",
        "user": {
            "id": "1",
            "name": "张三",
            "avatar": "https://via.placeholder.com/100"
        },
        "reply": [
            {
                "id": "3",
                "content": "感觉你妈不如你妈",
                "time": "2021-08-12 12:00:00",
                "replyTo": {
                    "id": "1",
                    "name": "张三"
                },
                "user": {
                    "id": "2",
                    "name": "张四",
                    "avatar": "https://via.placeholder.com/100"
                }
            },
            {
                "id": "4",
                "content": "感觉...感觉不如感觉",
                "time": "2021-08-12 12:00:00",
                "replyTo": {
                    "id": "1",
                    "name": "张三"
                },
                "user": {
                    "id": "2",
                    "name": "张四",
                    "avatar": "https://via.placeholder.com/100"
                }
            }
        ]
    }, {
        "id": "5",
        "content": "感觉不如...福利连",
        "time": "2021-08-12 12:00:00",
        "user": {
            "id": "1",
            "name": "张三",
            "avatar": "https://via.placeholder.com/100"
        },
        "reply": [
            {
                "id": "6",
                "content": "感觉你妈不如你妈",
                "time": "2021-08-12 12:00:00",
                "replyTo": {
                    "id": "1",
                    "name": "张三"
                },
                "user": {
                    "id": "7",
                    "name": "张四",
                    "avatar": "https://via.placeholder.com/100"
                }
            },
            {
                "id": "7",
                "content": "感觉...感觉不如感觉",
                "time": "2021-08-12 12:00:00",
                "replyTo": {
                    "id": "1",
                    "name": "张三"
                },
                "user": {
                    "id": "2",
                    "name": "张四",
                    "avatar": "https://via.placeholder.com/100"
                }
            }
        ]
    }, {
        "id": "8",
        "content": "感觉不如...福利连",
        "time": "2021-08-12 12:00:00",
        "user": {
            "id": "1",
            "name": "张三",
            "avatar": "https://via.placeholder.com/100"
        },
        "reply": [
            {
                "id": "9",
                "content": "感觉你妈不如你妈",
                "time": "2021-08-12 12:00:00",
                "replyTo": {
                    "id": "1",
                    "name": "张三"
                },
                "user": {
                    "id": "2",
                    "name": "张四",
                    "avatar": "https://via.placeholder.com/100"
                }
            },
            {
                "id": "10",
                "content": "感觉...感觉不如感觉",
                "time": "2021-08-12 12:00:00",
                "replyTo": {
                    "id": "1",
                    "name": "张三"
                },
                "user": {
                    "id": "2",
                    "name": "张四",
                    "avatar": "https://via.placeholder.com/100"
                }
            }
        ]
    }
]

const NovelPage = () => {
    const {novelId} = useParams();
    const [novelData, setNovelData] = useState<NovelInfo>();

    useEffect(() => {
        getNovelInfo(novelId!).then(setNovelData);
    }, [novelId]);

    if (!novelId) {
        return <$404/>;
    }

    if (!novelData) {
        return <div>loading</div>;
    }

    return (
        <div className="mika-novel-novel-page-root">
            <Header/>
            <div className="mika-novel-novel-page-container">
                <NovelPageDetail {...novelData} />
                <NovelPageDesc desc={novelData.description}/>
                <NovelPageVolume nid={novelId}/>
                <NovelPageComment comment={testCommentData}/>
                <NovelPageRecommend nid={novelId}/>
            </div>
            <Footer/>
        </div>
    )
}

export default NovelPage;