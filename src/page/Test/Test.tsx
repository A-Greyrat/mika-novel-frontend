import './Test.less';
import {Image} from "../../component/mika-ui"
import {useEffect, useState} from "react";
import {rsaEncrypt} from "../../common/user/encrypt.ts";

const Test = () => {
    const [text, setText] = useState("");
    useEffect(() => {
        rsaEncrypt("Hello World").then(res => {
            setText(res);
        }, err => {
            setText(err);
        });
    }, []);

    return (
        <div className="test-root">
            {/*<Image lazy*/}
            {/*       src="https://img.hongyoubizhi.com/picture/pages/regular/2022/07/06/14/100112501_p0_master1200.jpg?x-oss-process=image/resize,w_450/format,jpg"*/}
            {/*       width={305} height={413}*/}
            {/*/>*/}
            {text}

        </div>
    );
};

export default Test;