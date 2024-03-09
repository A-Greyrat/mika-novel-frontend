import './NovelCard.less';
import {Image} from "../../component/mika-ui";
import React, {memo, useMemo} from "react";

type NovelCardProps = {
    url: string;
    title: string;
    author: string;
    cover: string;
    description: string;
    tags: string[];
    height?: number;
    mobileHeight?: number;
    padding?: number;
}

const NovelCard = memo((props: NovelCardProps) => {
    const style = useMemo(() => {
        return {
            "--height": props.height ? props.height + 'px' : '280px',
            "--mobile-height": props.mobileHeight ? props.mobileHeight + 'px' : '220px',
            "--padding": props.padding ? props.padding + 'px' : "16px"
        } as React.CSSProperties;
    }, [props.height, props.mobileHeight, props.padding]);

    return (
        <div className="mika-novel-novel-card"
             style={style}
             onClick={() => {
                 window.location.href = props.url;
             }}>
            <Image lazy src={props.cover} width={0} height={0} alt={props.title}/>
            <div><h1>{props.title}</h1></div>
            <h2>{"作者：" + props.author}</h2>
            <div className="mika-novel-novel-card-tags">
                {props.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                ))}
            </div>
            <p>{props.description}</p>
        </div>
    );
});

export default NovelCard;