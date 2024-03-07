import './Test.less';
import {Image} from "../../component/mika-ui"
import {useState} from "react";

const Test = () => {
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(500);
    return (
        <div className="test-root">
            <Image lazy
                   src="https://img.hongyoubizhi.com/picture/pages/regular/2022/07/06/14/100112501_p0_master1200.jpg?x-oss-process=image/resize,w_450/format,jpg"
                   width={width} height={height}
            />

            <div>
                <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))}/>
                <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))}/>
            </div>

        </div>
    );
};

export default Test;