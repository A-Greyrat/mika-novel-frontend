import './ReadingNovelList.less';
import {Image} from  "@natsume_shiki/mika-ui";
import {memo, useEffect} from "react";
import {getFavoriteList, NovelInfo} from "../../common/novel";
import {useNavigate} from "react-router-dom";
import {baseURL} from "../../common/axios";
import {useStore} from "mika-store";

const ReadingNovelListItem = (props: NovelInfo) => {
    const nav = useNavigate();

    return (
        <div className="mika-novel-reading-novel-list-item" onClick={() => {
            nav(`/novel/${props.id}`);
        }}>
            <Image lazy src={baseURL + props.cover} alt={props.title} width={120} height={180}/>
            <p>{props.title}</p>
        </div>
    );
}

const ReadingNovelList = memo(() => {
    const [items, setItems] = useStore<(NovelInfo & {novelId: number})[]>('mika-novel-favorite-list', []);

    useEffect(() => {
        getFavoriteList().then((res) => {
            res && setItems(res.records);
        });
    }, [setItems]);

    if (!items || items.length === 0) {
        return null;
    }

    return (<div className="mika-novel-reading-novel-list-root">
            <h1>我的收藏</h1>
            <div className="mika-novel-reading-novel-list-wrapper">
                <div className="mika-novel-reading-novel-list-container">
                    {items.map((item, _index) => (
                        <ReadingNovelListItem key={item.id} {...item} id={item.novelId.toString()}/>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ReadingNovelList;
