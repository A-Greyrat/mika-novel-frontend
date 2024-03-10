import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./NovelReader.less";
import {getNovelContent} from "../../common/novel";

// type NovelReaderSetting = {
//     fontSize: number;
//     fontFamily: string;
//     backgroundColor: string;
//     textColor: string;
//     lineHeight: number;
//     letterSpacing: number;
// }

const NovelReader = () => {
    const {novelId, volumeId, chapterId} = useParams();
    const [novelContent, setNovelContent] = useState<string[]>();
    const [title, setTitle] = useState<string>();

    useEffect(() => {
        getNovelContent(novelId!, volumeId!, chapterId!).then((res) => {
            console.log(res)
            setNovelContent(res.content);
            setTitle(res.title);
        });
    }, [novelId, volumeId, chapterId]);

    if (!novelId || !volumeId || !chapterId) {
        return null;
    }

    return (
        <div className="mika-novel-reader-root">
            <div className="mika-novel-reader-content">
                <div className="mika-novel-reader-title">
                    <h1>{title}</h1>
                </div>
                <div className="mika-novel-reader-content-container">
                    {novelContent?.map((content, index) => {
                        return (
                            <p key={index}>{content}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default NovelReader;