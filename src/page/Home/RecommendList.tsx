import NovelCard from "./NovelCard.tsx";
import './RecommendList.less';

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

const RecommendList = (props: RecommendListProps) => {
    return (
        <div>
            <h1>推荐</h1>
            <div className="mika-novel-recommend-list-container">
                {props.items.map((item, index) => (
                    <NovelCard key={index} {...item} imgWidth={150} imgHeight={220}/>
                ))}
            </div>
        </div>
    );
}

export default RecommendList;