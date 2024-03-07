import './NovelPageRecommend.less';
import {Image} from "../../component/mika-ui";

type NovelPageRecommendProps = {
    novels: {
        id: string;
        title: string;
        cover: string;
        description: string;
    }[];
}


const NovelPageRecommend = (props: NovelPageRecommendProps) => {

    return (
        <div className="mika-novel-page-novel-recommend">
            <h2>相关推荐</h2>
            <div>
                {props.novels.map((novel, index) => {
                    return (
                        <div key={index} className="mika-novel-page-novel-recommend-item">
                            <Image src={novel.cover} width={100} height={150}/>

                            <div>
                                <h3>{novel.title}</h3>
                                <p>{novel.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default NovelPageRecommend;