import './Test.less';
import {AutoComplete, debounce} from "../../component/mika-ui";
import React, {useCallback} from "react";
// import {getSearchAutoComplete} from "../../common/novel";

const getSearchAutoComplete = (keyword: string) => {
    return new Promise<string[]>((resolve) => {
        setTimeout(() => {
            resolve([keyword + '1', keyword + '2', keyword + '3', keyword + '4', keyword + '5']);
        }, 300);
    });
}

const Test = () => {
    const [dataSrc, setDataSrc] = React.useState<string[]>([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const _getSearchAutoComplete = useCallback(debounce((keyword: string) => {
        if (!keyword) {
            setDataSrc([]);
            return;
        }
        getSearchAutoComplete(keyword).then(res => {
            console.log(res);
            setDataSrc(res);
        });
    }, 300), []);

    return (<div className='test-root'>
            <AutoComplete size='medium' type='outline' changeDataSrc={(key) => {
                _getSearchAutoComplete(key);
            }} dataSrc={dataSrc}>

            </AutoComplete>
        </div>
    );
};

export default Test;