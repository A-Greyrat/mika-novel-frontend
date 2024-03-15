import './SearchPage.less';
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getSearchedNovels, NovelInfo} from "../../common/novel";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import NovelCard from "../../component/NovelCard/NovelCard";
import {isMobile, Pagination} from "../../component/mika-ui";
import SkeletonCard from "../../component/SkeletonCard/SkeletonCard.tsx";

const SearchPage = () => {
    const {keyword} = useParams();
    const [searchResult, setSearchResult] = useState<NovelInfo[]>([]);
    const loading = useRef(true);

    const [page, setPage] = useState(1);
    const totalRef = useRef(0);
    const curRef = useRef(0);

    useEffect(() => {
        if (!keyword) return;
        window.scrollTo(0, 0);
        document.title = `搜索 - ${keyword}`;

        loading.current = true;
        getSearchedNovels(keyword, 1, 10).then((res) => {
            setSearchResult(res.records);
            totalRef.current = res.total;
            curRef.current = res.total > 10 ? 10 : res.total;
            loading.current = false;
        });
    }, [keyword]);

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
                loading.current = true;
                setPage(index);
                if (!keyword) return;
                getSearchedNovels(keyword, index, 10).then((res) => {
                    loading.current = false;
                    setSearchResult(res.records);
                    curRef.current += res.records.length;
                });
            }} pageNum={Math.ceil(totalRef.current / 10)} maxDisplayNumber={isMobile() ? 3 : 5} initIndex={page}/>
            <Footer/>
        </div>
    )
};

export default SearchPage;
