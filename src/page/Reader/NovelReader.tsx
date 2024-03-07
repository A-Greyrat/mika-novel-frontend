import {useParams} from "react-router-dom";
import {useEffect} from "react";
import "./NovelReader.less";

let testData =
    "どこから話せばいいんだろう\n" +
    "待ちくたびれても\n" +
    "終わりだなんて言わせないから\n" +
    "書きなぐった\n" +
    "無意識の衝動をつれて\n" +
    "何もかも壊したら\n" +
    "不可能を始めればいいんだ\n" +
    "There's a reason that we came across in this world\n" +
    "There's a reason that we caught the magnetic wave\n" +
    "傷つけ合う世界はどこへ\n" +
    "So\n" +
    "愛のために泣けるのは\n" +
    "君がそこにいるから\n" +
    "君だけを呼び続けるから\n" +
    "愛のために歌うのは\n" +
    "そして共に生き抜く事\n" +
    "ずっと 君と\n" +
    "青色した空と波ひとつない\n" +
    "鏡のような海を見てた\n" +
    "どんな場所にいたって\n" +
    "どんな形になって\n" +
    "どんな時代にいたって\n" +
    "見つけだす\n" +
    "じゃあ やりますか?\n" +
    "宙吊りにした運命に逆らって\n" +
    "There's a reason that we came across in this world\n" +
    "There's a reason that we caught the magnetic wave\n" +
    "引きよせ合う二人はどこへ\n" +
    "So\n" +
    "愛のために進むのは\n" +
    "君とここにいるから\n" +
    "僕だけが君を守るから\n" +
    "愛のために願うのは\n" +
    "そして誰も傷つけずに\n" +
    "ずっと となりで\n" +
    "僕らは超えてゆく\n" +
    "すべての憎しみを\n" +
    "ニセモノの正義など棄ててしまえ\n" +
    "So\n" +
    "愛のために泣けるのは\n" +
    "君がそこにいるから\n" +
    "We will always be together\n" +
    "愛の\n" +
    "愛のために進むのは\n" +
    "君とここにいるから\n" +
    "僕だけが君を守るから\n" +
    "愛のために願うのは\n" +
    "そして共に生き抜く事\n" +
    "ずっと\n" +
    "We'll always be together\n";

const dataArr = testData.split("\n");
const title = "第一章 智取生辰纲";

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

    useEffect(() => {
        console.log(novelId, volumeId, chapterId);
    }, [novelId, volumeId, chapterId]);

    return (
        <div className="mika-novel-reader-root">
            <div className="mika-novel-reader-content">
                <div className="mika-novel-reader-title">
                    <h1>{title}</h1>
                </div>
                {dataArr.map((data, index) => {
                    return (
                        <p key={index}>{data}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default NovelReader;