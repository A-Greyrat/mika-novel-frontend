import './ReadingNovelList.less';
import {Image} from "../../component/mika-ui";
import {memo, useEffect, useState} from "react";
import {getFavoriteList, NovelInfo} from "../../common/novel";

const ReadingNovelListItem = (props: NovelInfo) => {
    return (
        <div className="mika-novel-reading-novel-list-item">
            <Image lazy src={props.cover} alt={props.title} width={120} height={180}/>
            <p>{props.title}</p>
        </div>
    );
}

const ReadingNovelList = memo(() => {
    const [items, setItems] = useState<NovelInfo[]>([]);

    useEffect(() => {
        getFavoriteList().then((res) => {
            setItems(res.records);
        });
    }, []);

    if (!items || items.length === 0) {
        return null;
    }

    return (<div className="mika-novel-reading-novel-list-root">
            <h1>正在看的</h1>
            <div className="mika-novel-reading-novel-list-wrapper">
                <div className="mika-novel-reading-novel-list-container">
                    {items.map((item, index) => (
                        <ReadingNovelListItem key={index} {...item}/>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ReadingNovelList;