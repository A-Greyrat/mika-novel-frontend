import React, {forwardRef, memo} from "react";
import './TabList.css';

export type TabListProps = {
    items: string[];
    activeIndex: number;
    onChange: (index: number) => void;
    className?: string;
    width?: string;
    type?: 'horizontal' | 'vertical';
    style?: React.CSSProperties;
}

const TabList = forwardRef((props: TabListProps, ref: any) => {
    return (
        <ul ref={ref} style={{width: props.width, ...props.style}}
            className={"mika-tab-list-container" + (props.type === 'vertical' ? '-vertical' : '') + (props.className ? ' ' + props.className : '')}>
            {props.items.map((item, index) => (
                <li key={index} className={props.activeIndex === index ? 'active' : ''}
                    style={{ fontSize: 'inherit' }}
                    onClick={() => props.onChange(index)}>{item}</li>
            ))}
        </ul>
    );
});

export default memo(TabList);