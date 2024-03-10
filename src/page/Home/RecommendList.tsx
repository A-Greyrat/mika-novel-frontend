import NovelCard from "./NovelCard.tsx";
import './RecommendList.less';
import {memo, useCallback, useEffect, useRef, useState} from "react";
import {getRecommendNovelList, NovelInfo} from "../../common/novel";
import {withLock} from "../../component/mika-ui";

const Loading = memo(() => {
    return (
        <div className="mika-novel-recommend-list-loading-container">
            <div className="mika-novel-recommend-list-loading-spinner"></div>
        </div>
    );
});

const RecommendList = memo(() => {
    const [items, setItems] = useState<NovelInfo[]>();
    const [loading, setLoading] = useState(false);
    const getMoreRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getMore = useCallback(withLock(() => {
        setLoading(true);
        setTimeout(() => {
            getRecommendNovelList().then((res) => {
                setItems((prev) => {
                    return prev ? prev.concat(res) : res;
                });
                setLoading(false);
            });
            
            setLoading(false);
        }, 1000);
    }, 1000), []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log("get more")
                getMore();
            }
        }, {
            rootMargin: "50px",
        });

        getMoreRef.current && observer.observe(getMoreRef.current);
        return () => {
            observer.disconnect();
        }
    }, [getMore]);

    return (
        <div className="mika-novel-recommend-list-root">
            <h1>推荐</h1>
            <div className="mika-novel-recommend-list-container">
                {items?.map((item, index) => (
                    <NovelCard key={index} {...item} height={240} padding={12} maxDisplayLines={4}/>
                ))}
                {loading && <Loading/>}
                <div className="mika-novel-recommend-list-more" ref={getMoreRef}/>
            </div>
        </div>
    );
});

export default RecommendList;