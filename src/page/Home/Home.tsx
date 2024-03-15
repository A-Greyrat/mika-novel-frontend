import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import {Carousel} from "../../component/mika-ui";
import NovelCard from "../../component/NovelCard/NovelCard";
import './Home.less';
import ReadingNovelList from "./ReadingNovelList";
import RecommendList from "./RecommendList";
import {getCarouselNovelList, getRankList, NovelInfo} from "../../common/novel/";
import {useEffect, useState} from "react";
import RankList from "./RankList";
import SkeletonCard from "../../component/SkeletonCard/SkeletonCard.tsx";

const Home = () => {
    const [carouselList, setCarouselList] = useState<NovelInfo[]>([]);
    const [dayRankList, setDayRankList] = useState<NovelInfo[]>([]);
    const [monthRankList, setMonthRankList] = useState<NovelInfo[]>([]);
    const [weekRankList, setWeekRankList] = useState<NovelInfo[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "首页";

        getCarouselNovelList().then(setCarouselList);
        getRankList("day", 1, 12).then((res) => {
            setDayRankList(res.records);
        });
        getRankList("month", 1, 12).then((res) => {
            setMonthRankList(res.records);
        });
        getRankList("week", 1, 12).then((res) => {
            setWeekRankList(res.records);
        });
    }, []);

    return (<div className="mika-novel-home-page-root">
            <Header/>
            <div className="mika-novel-home-page-wrapper">
                <Carousel items={
                    carouselList && carouselList.length > 0 ?
                        carouselList.map((item) => (
                            <NovelCard {...item} key={item.id}/>
                        )) : [1, 2, 3, 4, 5].map((item) => (<SkeletonCard key={item} padding='20px'/>))
                } className='mika-novel-carouse-list' autoSwitchByTime={3000}/>
                <ReadingNovelList/>
                <RecommendList/>
                <RankList items={[dayRankList, weekRankList, monthRankList]} rankTitle={["日榜", "周榜", "月榜"]}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;