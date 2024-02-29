import {memo, useState} from "react";
import {TabList} from "../../component/mika-ui";
import './RankList.less';

type RankListItem = {
    url: string;
    title: string;
    rank: number;
    cover: string;
    description: string;
}

type RankListProps = {
    items: RankListItem[][];
    rankTitle: string[];
}

const RankList = (props: RankListProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (props.items.length !== props.rankTitle.length) {
        throw new Error('The length of items and rankTitle should be the same');
    }

    return (
        <div className="mika-novel-rank-list">
            <TabList style={{fontSize: '18px', margin: '15px 0'}} items={props.rankTitle} activeIndex={activeIndex}
                     onChange={setActiveIndex}/>
            <div className="mika-novel-rank-list-content">
                {props.items[activeIndex].map((item, index) => (
                    <div key={index} className="mika-novel-rank-list-item">
                        <span>{item.rank}</span>
                        <a href={item.url}>{item.title}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(RankList);