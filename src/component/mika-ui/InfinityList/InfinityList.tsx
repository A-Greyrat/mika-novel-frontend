import React, {forwardRef, memo, useEffect, useRef, useState} from "react";
import "./InfinityList.less";

export interface InfinityListProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    onIntersect: (unloading: () => void) => unknown;
    loading?: React.ReactElement;

    limit?: number;
    itemnum?: number;

    options?: IntersectionObserverInit;
}

const DefaultLoading = memo(() => {
    return (<div className="mika-infinity-list-loading"/>);
});

const InfinityList = memo(forwardRef((props: InfinityListProps, ref: React.Ref<HTMLDivElement>) => {
    const [loading, setLoading] = useState(false);
    const detectRef = useRef<HTMLDivElement>(null);
    const {children, onIntersect, loading: loadingEle, limit, options, ...rest} = props;

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (loading) return;
                setLoading(true);
                if (limit !== undefined && props.itemnum !== undefined && limit <= props.itemnum) {
                    observer.disconnect();
                    setLoading(false);
                } else {
                    onIntersect(() => {
                        setLoading(false);
                    });
                }
            }
        }, (options ?? {
            threshold: 0.1
        }));

        detectRef && detectRef.current && observer.observe(detectRef.current);
        return () => {
            observer.disconnect();
        }
    }, [limit, loading, onIntersect, options, props.itemnum]);


    return (
        <div ref={ref} className={"mika-infinity-list-root" + (props.className ? " " + props.className : "")}{...rest}>
            {children}
            {loading && (loadingEle ? loadingEle : <DefaultLoading/>)}
            <div ref={detectRef}/>
        </div>
    );
}));

export default InfinityList;
