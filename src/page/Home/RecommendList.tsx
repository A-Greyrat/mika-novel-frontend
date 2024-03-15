import NovelCard from "../../component/NovelCard/NovelCard";
import './RecommendList.less';
import {memo, useCallback} from "react";
import {getRecommendNovelList, NovelInfo} from "../../common/novel";
import {withLockTime} from "../../component/mika-ui";
import SkeletonCard from "../../component/SkeletonCard/SkeletonCard.tsx";
import InfinityList from "../../component/mika-ui/InfinityList/InfinityList.tsx";
import {useStore} from "../../common/mika-store";

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
    const [items, setItems] = useStore<NovelInfo[]>('recommendList', []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getMore = useCallback(withLockTime((unloading: () => void) => {
        getRecommendNovelList().then(async (res) => {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(null);
                }, 500);
            });
            const newItems = [...items, ...res];
            setItems(newItems);
            unloading();
        });
    }, 500), [items]);

    return (
        <div className="mika-novel-recommend-list-root">
            <h1>推荐</h1>
            <InfinityList
                onIntersect={getMore}
                loading={<Loading/>}
                className="mika-novel-recommend-list-container">
                {items?.map((item, _index) => (
                    <NovelCard key={item.id} {...item} height={240} padding={12} maxDisplayLines={3}/>
                ))}
            </InfinityList>
        </div>
    );
});

export default RecommendList;