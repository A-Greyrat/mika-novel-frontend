import './ReadingNovelList.less';
import {Image} from "../../component/mika-ui";
import {memo} from "react";

type ReadingNovelListItem = {
    url: string;
    title: string;
    cover: string;
}

type ReadingNovelListProps = {
    items: ReadingNovelListItem[];
}


const ReadingNovelListItem = (props: ReadingNovelListItem) => {
    return (
        <div className="mika-novel-reading-novel-list-item">
            <a href={props.url}>
                <Image lazy src={props.cover} alt={props.title} width={150} height={220}/>
                <p>{props.title}</p>
            </a>
        </div>
    );
}

const ReadingNovelList = memo((props: ReadingNovelListProps) => {
    return (<>
            <h1>正在看的</h1>
            <div className="mika-novel-reading-novel-list-root">
                <div className="mika-novel-reading-novel-list-container">
                    {props.items.map((item, index) => (
                        <ReadingNovelListItem key={index} {...item}/>
                    ))}
                </div>
            </div>
        </>
    );
});

export default ReadingNovelList;