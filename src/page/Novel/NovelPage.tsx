import Header from "../../component/header/Header.tsx";
import Footer from "../../component/footer/Footer.tsx";
import './NovelPage.less';
import {useState} from "react";
import NovelPageDetail from "./NovelPageDetail.tsx";
import NovelPageVolume from "./NovelPageVolume.tsx";

type NovelPageProps = {
    id: string;
    title: string;
    description: string;
    cover: string;
    tags: string[];
    author: string;
    volume: {
        id: string;
        title: string;
        chapters: {
            id: string;
            title: string;
            content: string;
        }[]
    }[];
}

const testData: NovelPageProps = {
    id: "1",
    title: "ラッキースター",
    description:
        "これが最後と決めました\n" +
        "アイツは言った「死んだらどうなる？」\n" +
        "そこでナイフが飛び出して\n" +
        "呆気なかった涙よりも早く\n" +
        "あのねここで消えたら意味ないし\n" +
        "ろうそくのように\n" +
        "固まれ血のワルツ\n" +
        "繋げていない手が\n" +
        "こんなにあるのにな\n" +
        "ねぇ死んだらどうなる？\n" +
        "そこで誰を恨みますか\n" +
        "矢のように去っては過ぎてく季節\n" +
        "譲れないまま持ち直して\n" +
        "許せばきっと\n" +
        "忘れちゃえ なにもかも\n" +
        "行く先やさしさが断つ帰り道\n" +
        "振り返る背にかなしげな眼差し\n" +
        "ありがとうとごめんを\n" +
        "繰り返すまま\n" +
        "踏み出した０１\n" +
        "毎度最高な未来を\n" +
        "どこか期待している\n" +
        "抗うまま生きる不幸を\n" +
        "受け入れるならば自由を探して\n" +
        "赤色の創造が\n" +
        "割り切れないこの理由を\n" +
        "抱きしめては歌う 今日も\n",
    cover: "https://via.placeholder.com/100",
    tags: ["爱情", "校园"],
    author: "山ほど",
    volume: [
        {
            "id": "1",
            "title": "第一章",
            "chapters": [
                {
                    "id": "1",
                    "title": "第一节",
                    "content": "这是第一节"
                },
                {
                    "id": "2",
                    "title": "第二节",
                    "content": "这是第二节"
                }
            ]
        },
        {
            "id": "2",
            "title": "第二章",
            "chapters": [
                {
                    "id": "1",
                    "title": "第一节",
                    "content": "这是第一节"
                },
                {
                    "id": "2",
                    "title": "第二节",
                    "content": "这是第二节"
                }
            ]
        }
    ]
};


const NovelPage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [novelData, setNovelData] = useState<NovelPageProps>(testData);

    return (
        <div className="mika-novel-novel-page-root">
            <Header/>
            <div className="mika-novel-novel-page-container">
                <NovelPageDetail {...novelData}/>
                <div>
                    <div>
                        <NovelPageVolume volume={novelData.volume}/>
                        <div className="mika-novel-page-novel-comment"></div>
                    </div>
                    <div className="mika-novel-page-novel-recommend"></div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default NovelPage;