import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import './NovelPage.less';
import {memo, useEffect, useState} from "react";
import NovelPageRecommend from "./NovelPageRecommend";
import {useParams} from "react-router-dom";
import {getNovelInfo, getNovelVolumes, getRelatedNovels, NovelInfo, NovelPageVolumeInfo} from "../../common/novel";
import $404 from "../404/404";
import NovelPageDetail from "./NovelPageDetail.tsx";
import NovelPageDesc from "./NovelPageDesc.tsx";
import NovelPageVolume from "./NovelPageVolume.tsx";
import NovelPageComment from "./NovelPageComment.tsx";
import SkeletonCard from "../../component/SkeletonCard/SkeletonCard.tsx";
import Skeleton from "../../component/mika-ui/Skeleton/Skeleton.tsx";

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

const Loading = memo(() => {
    return (<div className="mika-novel-novel-page-root">
        <Header/>
        <div className="mika-novel-novel-page-loading-container">
            <SkeletonCard height="294px" padding="12px" width='90vw'/>
            <div style={{gridArea: "novel-volume"}}>
                <Skeleton type='text' height='30px' width='150px'/>
                <Skeleton type='text' height='20px'/>
                <Skeleton type='text' height='20px'/>
                <Skeleton type='text' height='20px'/>
                <div className='gap-20'/>
                <Skeleton type='text' height='30px' width='150px'/>
                <Skeleton type='text' height='20px'/>
                <Skeleton type='text' height='20px'/>
                <Skeleton type='text' height='20px'/>
                <div className='gap-20'/>
                <Skeleton type='text' height='30px' width='150px'/>
                <Skeleton type='text' height='20px'/>
                <Skeleton type='text' height='20px'/>
                <Skeleton type='text' height='20px'/>
            </div>
            <div style={{gridArea: "novel-recommend"}}>
                <Skeleton type='text' height='30px' width='120px'/>
                <Skeleton type='text' height='20px'/>
                <Skeleton type='text' height='20px'/>
                <Skeleton type='text' height='20px'/>
                <div className='gap-20'/>
                <Skeleton type='text' height='30px' width='120px'/>
                <Skeleton type='text' height='20px'/>
                <Skeleton type='text' height='20px'/>
                <Skeleton type='text' height='20px'/>
                <div className='gap-20'/>
                <Skeleton type='text' height='30px' width='120px'/>
                <Skeleton type='text' height='20px'/>
                <Skeleton type='text' height='20px'/>
                <Skeleton type='text' height='20px'/>
            </div>
        </div>
        <Footer/>
    </div>);
})

const NovelPage = () => {
    const {novelId} = useParams();
    const [novelData, setNovelData] = useState<NovelInfo>();
    const [volumeData, setVolumeData] = useState<NovelPageVolumeInfo[]>();
    const [recommendNovels, setRecommendNovels] = useState<NovelInfo[]>([]);
    useEffect(() => {
        window.scrollTo(0, 0);

        getNovelInfo(novelId!).then(setNovelData);
        getNovelVolumes(novelId!).then(setVolumeData);
        getRelatedNovels(novelId!).then(setRecommendNovels);
    }, [novelId]);

    if (!novelId) {
        return <$404/>;
    }

    if (!novelData || !volumeData) {
        return <Loading/>;
    }

    return (
        <div className="mika-novel-novel-page-root">
            <Header/>
            <div className="mika-novel-novel-page-container">
                <NovelPageDetail {...novelData} />
                <NovelPageDesc desc={novelData.description}/>
                <NovelPageVolume volumeData={volumeData}/>
                <NovelPageComment comment={testCommentData}/>
                <NovelPageRecommend novels={recommendNovels}/>
            </div>
            <Footer/>
        </div>
    )
}

export default NovelPage;