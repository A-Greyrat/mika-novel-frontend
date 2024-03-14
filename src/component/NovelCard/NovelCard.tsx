import './NovelCard.less';
import {Image} from "../../component/mika-ui";
import React, {memo, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {NovelInfo} from "../../common/novel";
import {baseURL} from "../../common/axios";

interface NovelCardProps extends NovelInfo {
    height?: number;
    mobileHeight?: number;
    padding?: number;
    maxDisplayLines?: number;
}

const NovelCard = memo((props: NovelCardProps) => {
    const nav = useNavigate();

    const style = useMemo(() => {
        return {
            "--height": props.height ? props.height + 'px' : '280px',
            "--mobile-height": props.mobileHeight ? props.mobileHeight + 'px' : '220px',
            "--padding": props.padding ? props.padding + 'px' : "16px",
            "--max-display-lines": props.maxDisplayLines ? props.maxDisplayLines + "" : "5"
        } as React.CSSProperties;
    }, [props.height, props.maxDisplayLines, props.mobileHeight, props.padding]);

    return (
        <div className="mika-novel-novel-card"
             style={style}
             onClick={() => {
                 nav(`/novel/${props.id}`);
             }}>
            <Image lazy src={baseURL + props.cover} width={0} height={0} alt={props.title}/>
            <div><h1>{props.title}</h1></div>
            <h2>{"作者：" + props.author}</h2>
            <div className="mika-novel-novel-card-tags">
                {props.tags && props.tags.map((tag, index) => (
                    <span key={index} onClick={e => {
                        e.stopPropagation();
                        nav(`/search/${tag.tagName}`);
                    }}>{tag.tagName}</span>
                ))}
            </div>
            <p>{props.description}</p>
        </div>
    );
});

export default NovelCard;