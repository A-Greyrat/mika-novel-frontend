import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import './NovelPage.less';
import {memo, useEffect, useState} from "react";
import NovelPageRecommend from "./NovelPageRecommend";
import {useParams} from "react-router-dom";
import {
    getComments,
    getNovelInfo,
    getNovelVolumes,
    getRelatedNovels,
    NovelInfo, NovelPageCommentProps,
    NovelPageVolumeInfo
} from "../../common/novel";

import $404 from "../404/404";
import NovelPageDetail from "./NovelPageDetail";
import NovelPageDesc from "./NovelPageDesc";
import NovelPageVolume from "./NovelPageVolume";
import NovelPageComment from "./NovelPageComment";
import SkeletonCard from "../../component/SkeletonCard/SkeletonCard";
import {Skeleton} from "../../component/mika-ui";
import {useStore} from "../../common/mika-store";


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

    const [comment, setComment] = useStore<NovelPageCommentProps[]>(`novel-page-comment`);
    const [_total, setTotal] = useStore<number>(`novel-page-comment-total`, 0);

    useEffect(() => {
        window.scrollTo(0, 0);

        getNovelInfo(novelId!).then(setNovelData);
        getNovelVolumes(novelId!).then(setVolumeData);
        getRelatedNovels(novelId!).then(setRecommendNovels);

        getComments(novelId!, 1, 10).then(res => {
            setTotal(res.total);
            setComment(res.records);
        });
    }, [novelId, setComment, setTotal]);

    if (!novelId) {
        return <$404/>;
    }

    if (!novelData || !volumeData || !comment) {
        return <Loading/>;
    }

    return (
        <div className="mika-novel-novel-page-root">
            <Header/>
            <div className="mika-novel-novel-page-container">
                <NovelPageDetail {...novelData} />
                <NovelPageDesc desc={novelData.description}/>
                <NovelPageVolume volumeData={volumeData} nid={novelId}/>
                <NovelPageComment novelId={novelId} />
                <NovelPageRecommend novels={recommendNovels}/>
            </div>
            <Footer/>
        </div>
    )
}

export default NovelPage;