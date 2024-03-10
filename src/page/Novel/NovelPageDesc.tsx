import {memo} from "react";
import "./NovelPageDesc.less";

const NovelPageDesc = memo(({desc}: {desc: string}) => {
    return (<div className="mika-novel-page-novel-desc">
        {desc}
    </div>);
});

export default NovelPageDesc;