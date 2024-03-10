import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import {Carousel} from "../../component/mika-ui";
import CarouselNovelCard from "./NovelCard";
import './Home.less';
import ReadingNovelList from "./ReadingNovelList";
import RecommendList from "./RecommendList";
import {getCarouselNovelList, getRankList, NovelInfo} from "../../common/novel/";
import {useEffect, useState} from "react";
import RankList from "./RankList.tsx";

const Home = () => {
    const [carouselList, setCarouselList] = useState<NovelInfo[]>([]);
    const [dayRankList, setDayRankList] = useState<NovelInfo[]>([]);
    const [monthRankList, setMonthRankList] = useState<NovelInfo[]>([]);
    const [weekRankList, setWeekRankList] = useState<NovelInfo[]>([]);

    useEffect(() => {
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

    if (carouselList.length === 0) {
        return <div>Loading...</div>;
    }

    return (<div className="mika-novel-home-page-root">
            <Header/>
            <div className="mika-novel-home-page-wrapper">
                <Carousel items={
                    carouselList.map((item) => (
                        <CarouselNovelCard id={item.id} title={item.title} author={item.author} cover={item.cover}
                                           description={item.description} tags={item.tags}/>
                    ))
                } className='mika-novel-carouse-list' autoSwitchByTime={3000}/>
                <ReadingNovelList/>
                <RecommendList/>
                <RankList items={[weekRankList, monthRankList, dayRankList]} rankTitle={["周榜", "月榜", "日榜"]}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;