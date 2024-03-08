import NovelCard from "./NovelCard.tsx";
import './RecommendList.less';
import {memo} from "react";

type RecommendListItem = {
    url: string;
    title: string;
    cover: string;
    description: string;
    tags: string[];
    author: string;
}

type RecommendListProps = {
    items: RecommendListItem[];
}

const RecommendList = memo((props: RecommendListProps) => {
    return (
        <div className="mika-novel-recommend-list-root">
            <h1>推荐</h1>
            <div className="mika-novel-recommend-list-container">
                {props.items.map((item, index) => (
                    <NovelCard key={index} {...item} imgWidth={150} imgHeight={220}/>
                ))}
            </div>
        </div>
    );
});

export default RecommendList;