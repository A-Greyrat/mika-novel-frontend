import './SearchPage.less';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getSearchedNovels, NovelInfo} from "../../common/novel";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import NovelCard from "../../component/NovelCard/NovelCard";
import {isMobile, Pagination} from "@natsume_shiki/mika-ui";
import SkeletonCard from "../../component/SkeletonCard/SkeletonCard.tsx";

const SearchPage = () => {
    const {keyword, p} = useParams();
    const [searchResult, setSearchResult] = useState<NovelInfo[]>([]);
    const loading = useRef(true);
    const nav = useNavigate();

    const [page, setPage] = useState(p);
    const totalRef = useRef(0);
    const curRef = useRef(0);

    useEffect(() => {
        if (p !== page) {
            setPage(p);
        }
    }, [p, page]);

    useEffect(() => {
        if (!keyword) return;
        window.scrollTo(0, 0);
        document.title = `搜索 - ${keyword}`;

        loading.current = true;

        setSearchResult([]);
        getSearchedNovels(keyword, parseInt(page || '1'), 10).then((res) => {
            setSearchResult(res.records);
            totalRef.current = res.total;
            const totalPage = Math.ceil(res.total / 10);
            if (totalPage !== 0 && parseInt(p || '1') > totalPage) {
                nav(`/search/${keyword}/${totalPage}`);
            } else if (parseInt(p || '1') < 1) {
                nav(`/search/${keyword}/1`);
            } else {
                curRef.current = res.total > 10 ? 10 : res.total;
                loading.current = false;
            }
        });
    }, [keyword, nav, p, page]);

    if (loading.current) {
        return <div>
            <Header/>
            <div className='mika-novel-search-page-container'>
                <div className="mika-novel-search-page-list">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_item, index) => (
                        <SkeletonCard key={index}/>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    }

    if (totalRef.current === 0) {
        return <div>
            <Header/>
            <div className='mika-novel-search-page-container no-result'>
                <h1>啥也没有</h1>
            </div>
            <Footer/>
        </div>
    }

    return (
        <div>
            <Header/>
            <div className='mika-novel-search-page-container'>
                <h1>共有 {totalRef.current} 条搜索结果</h1>
                <div className="mika-novel-search-page-list">
                    {searchResult && searchResult.map((item, _index) => (
                        <NovelCard {...item} key={item.id}/>
                    ))}
                </div>
            </div>

            <Pagination onChange={(index) => {
                nav(`/search/${keyword}/${index}`);
            }} pageNum={Math.ceil(totalRef.current / 10)} maxDisplayNumber={isMobile() ? 3 : 5}
                        initIndex={parseInt(page || '0')}/>
            <Footer/>
        </div>
    )
};

export default SearchPage;
