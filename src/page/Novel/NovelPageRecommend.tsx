import './NovelPageRecommend.less';

const testData = [
    {
        "id": "1",
        "title": "ラッキースター",
        "cover": "https://via.placeholder.com/100",
    },
    {
        "id": "1",
        "title": "ラッキースター",
        "cover": "https://via.placeholder.com/100",
    },
]


const NovelPageRecommend = () => {

    return (
        <div className="mika-novel-page-novel-recommend">
            <h2>相关推荐</h2>
            <div>
                {testData.map((novel, index) => {
                    return (
                        <div key={index}>
                            <img src={novel.cover} alt={novel.title}/>
                            <h3>{novel.title}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default NovelPageRecommend;