import {memo, useState} from "react";
import {TabList} from "../../component/mika-ui";
import './RankList.less';
import {NovelInfo} from "../../common/novel";

type RankListProps = {
    items: NovelInfo[][];
    rankTitle: string[];
}

const RankList = memo((props: RankListProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="mika-novel-rank-list">
            <TabList style={{fontSize: '18px', margin: '15px 0'}} items={props.rankTitle} activeIndex={activeIndex}
                     onChange={setActiveIndex}/>
            <div className="mika-novel-rank-list-content">
                {props.items && props.items[activeIndex] && props.items[activeIndex].map((item, index) => (
                    <div key={index} className="mika-novel-rank-list-item">
                        <span>{index}</span>
                        <a href={`/novel/${item.id}`}>{item.title}</a>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default RankList;