import './SkeletonCard.less';
import Skeleton from "../mika-ui/Skeleton/Skeleton";
import React from "react";

interface SkeletonCardProps {
    width?: string;
    height?: string;
    padding?: string;
}

const SkeletonCard = (props: SkeletonCardProps) => {
    return (<div className="mika-novel-skeleton-card" style={{
        "--width": props.width || "100%",
        "--height": props.height || "280px",
        "--padding": props.padding || "10px",
    } as React.CSSProperties}>
        <Skeleton type="box"/>
        <Skeleton type="text"/>
        <Skeleton type="text"/>
        <Skeleton type="text"/>
        <Skeleton type="text"/>
    </div>);
}

export default SkeletonCard;