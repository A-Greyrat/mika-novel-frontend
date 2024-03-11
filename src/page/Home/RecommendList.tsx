import NovelCard from "../../component/NovelCard/NovelCard";
import './RecommendList.less';
import {memo, useCallback, useEffect, useRef, useState} from "react";
import {getRecommendNovelList, NovelInfo} from "../../common/novel";
import {withLock} from "../../component/mika-ui";
import SkeletonCard from "../../component/SkeletonCard/SkeletonCard.tsx";

const Loading = memo(() => {
    return (
        <div className="mika-novel-recommend-list-loading-container">
            <SkeletonCard height="240px" padding="12px"/>
            <SkeletonCard height="240px" padding="12px"/>
            <SkeletonCard height="240px" padding="12px"/>
        </div>
    );
});

const RecommendList = memo(() => {
    const [items, setItems] = useState<NovelInfo[]>();
    const [loading, setLoading] = useState(false);
    const getMoreRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getMore = useCallback(withLock(() => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            getRecommendNovelList().then((res) => {
                setItems((prev) => {
                    return prev ? prev.concat(res) : res;
                });
                setLoading(false);
            });
        }, 500);
    }, 500), []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                getMore();
            }
        }, {
            rootMargin: "50px",
            threshold: 0.1
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