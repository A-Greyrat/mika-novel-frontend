import './NovelCard.less';
import {Image} from "../../component/mika-ui";
import {memo} from "react";


type NovelCardProps = {
    url: string;
    title: string;
    author: string;
    cover: string;
    description: string;
    tags: string[];
    imgWidth: number;
    imgHeight: number;
}

const NovelCard = memo((props: NovelCardProps) => {
    return (
        <div className="mika-novel-novel-card" onClick={() => {
            window.location.href = props.url;
        }}>
            <Image src={props.cover} width={props.imgWidth} height={props.imgHeight} alt={props.title}/>
            <div className="mika-novel-novel-card-content">
                <h1>{props.title}</h1>
                <h2>{"作者：" + props.author}</h2>
                <div className="mika-novel-novel-card-tags">
                    {props.tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                    ))}
                </div>
                <p>{props.description}</p>
            </div>
        </div>
    );
});

export default NovelCard;