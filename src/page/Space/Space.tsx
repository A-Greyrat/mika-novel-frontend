import './Space.less';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import {Button, Image, TabList} from "../../component/mika-ui";
import {memo, useEffect, useState} from "react";
import {getUserInfo} from "../../common/user";
import {
    getFavoriteList,
    getHistoryList,
    HistoryItem,
    NovelInfo,
    removeFavorite,
    removeHistory
} from "../../common/novel";
import {useNavigate} from "react-router-dom";

const FavorList = memo(() => {
    const [favorList, setFavorList] = useState<(NovelInfo & { novelId: number })[]>([]);
    const nav = useNavigate();

    useEffect(() => {
        getFavoriteList().then(res => {
            res.records && setFavorList(res.records);
        });
    }, []);

    return (
        <div className="mika-novel-space-individual-favor-list">
            {favorList && favorList.map((item, index) => {
                return (<div className="mika-novel-space-individual-favor-item" key={index}>
                        <Image lazy src={item.cover} width={40} height={40} alt=""/>
                        <div className="mika-novel-space-individual-favor-item-info">
                            <div>{item.title}</div>
                            <p>作者：{item.author}</p>
                            <p>{item.description}</p>
                            <div className='padding'></div>
                            <div>
                                <Button styleType="primary" size="large" onClick={() => {
                                    nav(`/novel/${item.novelId}`);
                                }}>继续阅读</Button>
                                <Button styleType="default" size="large" onClick={async () => {
                                    return removeFavorite(String(item.novelId)).then((res) => {
                                        if (res.code === 200)
                                            return setFavorList(favorList.filter((value) => value.novelId !== item.novelId));
                                    });
                                }}>取消收藏</Button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>);
});

const HistoryList = memo(() => {
    const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
    const nav = useNavigate();

    useEffect(() => {
        getHistoryList().then(res => {
            res && setHistoryList(res);
        });
    }, []);

    return (<div className="mika-novel-space-individual-history-list">
        {historyList && historyList.map((item, index) => {
            return (
                <div className="mika-novel-space-individual-history-item" key={index}>
                    <Image lazy src={item.cover} width={40} height={40} alt=""/>
                    <div className="mika-novel-space-individual-history-item-info">
                        <div>{item.novelTitle}</div>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path
                                    d="M20,2H18V0h-2v2H8V0H6v2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M20,20H4V8h16V20z M7,11h5v5H7V11z M9,13h1v1H9V13z M13,13h1v1h-1V13z M15,13h1v1h-1V13z M11,15h1v1h-1V15z M13,15h1v1h-1V15z"/>
                            </svg>
                            {item.timestamp}</p>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="black" strokeWidth="1"/>
                                <circle cx="12" cy="12" r="6" fill="white"/>
                                <circle cx="14" cy="10" r="2" fill="white"/>
                                <path d="M18 12l-4-4v3H6v2h8v3z"/>
                            </svg>
                            {item.chapterTitle}
                        </p>
                        <div className='padding'></div>
                        <div>
                            <Button styleType="primary" size="large" onClick={() => {
                                nav(`/novel/${item.novelId}`);
                            }}>继续阅读</Button>
                            <Button styleType="default" size="large" onClick={async () => {
                                return removeHistory(String(item.novelId)).then((res) => {
                                    if (res.code === 200)
                                        return setHistoryList(historyList.filter((value) => value.novelId !== item.novelId));
                                });
                            }}>删除记录</Button>
                        </div>

                    </div>
                </div>
            );
        })}
    </div>);
});


const Space = () => {
    const [userInfo, setUserInfo] = useState({
        userId: 0,
        nickname: "",
        avatar: "",
        signature: ""
    });

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        getUserInfo().then(res => {
            res && setUserInfo(res);
        });
    }, []);

    return (
        <div className="mika-novel-space-root">
            <Header/>
            <div className="mika-novel-space-container">
                <div className="mika-novel-space-individual">
                    <Image src='./defaultAvatar.webp' alt="avatar" width={100} height={100}/>
                    <div className="mika-novel-space-individual-info-name">
                        <div className="mika-novel-space-individual-padding"></div>
                        <h2>{userInfo.nickname}</h2>
                        <p>这个人很懒，什么都没有留下</p>
                    </div>
                </div>
                <div className="mika-novel-space-individual-nav">
                    <TabList items={[
                        "我的收藏", "阅读历史", "设置"
                    ]} className="mika-novel-space-individual-nav-tab" activeIndex={activeIndex}
                             onChange={(index) => setActiveIndex(index)}/>

                    {activeIndex === 0 && <FavorList/>}
                    {activeIndex === 1 && <HistoryList/>}
                    {activeIndex === 2 && <div>设置</div>}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Space;
