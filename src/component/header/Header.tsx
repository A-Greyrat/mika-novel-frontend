import './Header.less';
import {memo, useCallback, useEffect, useRef, useState} from "react";
import {isUserLoggedIn, logout, useUser} from "../../common/user";
import {Button, Dropdown, Image, withLockTime} from "../mika-ui";
import {useLocation, useNavigate} from "react-router-dom";
import {getFavoriteList, getHistoryList, HistoryItem, NovelInfo} from "../../common/novel";
import {baseURL} from "../../common/axios";

const UserSection = () => {
    const [avatar] = useState("/defaultAvatar.webp");
    const userInfo = useUser();
    const nav = useNavigate();

    return (
        <Dropdown menu={<div style={{
            width: 200,
            backgroundColor: "white",
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.1)",
            borderRadius: 5
        }}>
            {userInfo && userInfo.userId !== 0 && <div style={{padding: 10, borderBottom: "1px solid #e7e7e7"}}>
                <div style={{marginTop: "30px"}}>
                    <p style={{fontSize: 12, color: "#666", textAlign: 'center'}}>
                        <span>账号：{userInfo?.nickname}</span>
                        <span style={{marginLeft: 10}}>ID：{userInfo?.userId}</span>
                    </p>
                    <Button styleType="link" onClick={() => {
                        logout();
                        window.location.reload();
                    }}>登出</Button>
                </div>
            </div>}

            {(!userInfo) && <div style={{padding: 10}}>
                <div style={{marginTop: "30px", display: "flex", justifyContent: "center",}}>
                    <Button styleType="link" onClick={() => {
                        nav("/login");
                    }}>登录</Button>
                </div>
            </div>}
        </div>} paddingTrigger={10} className="mika-novel-header-user-dropdown">
            <div className="mika-novel-header-user">
                <Image src={avatar} width={42} height={42} alt="" onClick={() => {
                    nav(isUserLoggedIn ? "/space" : "/login");
                }}/>
            </div>
        </Dropdown>);
}
const SearchSection = () => {
    const nav = useNavigate();
    const location = useLocation();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (location.pathname.startsWith("/search")) {
            if (inputRef.current) {
                inputRef.current.value = decodeURIComponent(location.pathname.split("/")[2]);
            }
        }
    }, [location.pathname, nav]);

    return (
        <div className="mika-novel-header-search">
            <form onSubmit={e => {
                e.preventDefault();
                if (inputRef.current) {
                    nav('/');
                    setTimeout(() => {
                        const formData = new FormData(e.target as HTMLFormElement);
                        nav(`/search/${(formData.get("search") as string)}`, {replace: true});
                    }, 10);
                }
            }}>
                <input type="text" name='search' placeholder="搜索" ref={inputRef}/>
            </form>
        </div>
    );
}
const FavorDropdown = () => {
    const [favorList, setFavorList] = useState<(NovelInfo & { novelId: number })[]>([]);
    const nav = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const freshFavorList = useCallback(withLockTime(() => {
        getFavoriteList(10).then(res => {
            res && setFavorList(res.records);
        });
    }, 1000), [setFavorList]);

    useEffect(() => {
        freshFavorList();
    }, [freshFavorList]);

    return (
        <Dropdown menu={<div className="mika-novel-header-favor-dropdown" style={{
            backgroundColor: "white",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            borderRadius: 10,
            overflowY: "auto",
            maxHeight: "80vh"
        }}>
            {favorList && favorList.length > 0 && favorList.map((item, index) => {
                return (
                    <div className="mika-novel-header-favor-item" key={index} onClick={() => {
                        nav(`/novel/${item.novelId}`);
                    }}>
                        <Image src={baseURL + item.cover} width={40} height={40} alt=""/>
                        <div className="mika-novel-header-favor-item-info">
                            <p>{item.title}</p>
                            <p>作者: {item.author}</p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                );
            })}

            {favorList && favorList.length > 0 && <div className="mika-novel-header-favor-more" onClick={() => {
                nav("/space/favor");
            }}>查看更多</div>}

        </div>} paddingTrigger={10} className="mika-novel-header-favor" callback={() => {
            freshFavorList();
        }}>
            <div className='trigger' onClick={() => {
                nav("/space/favor");
            }}>收藏
            </div>
        </Dropdown>
    );

}
const HistoryDropdown = () => {
    const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
    const nav = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const freshHistoryList = useCallback(withLockTime(() => {
        getHistoryList(10).then(res => {
            res && setHistoryList(res.records);
        });
    }, 1000), [setHistoryList]);

    useEffect(() => {
        freshHistoryList();
    }, [freshHistoryList]);

    return (
        <Dropdown menu={<div className="mika-novel-header-history-dropdown" style={{
            backgroundColor: "white",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            borderRadius: 10,
            overflowY: "auto",
            maxHeight: "80vh"
        }}>
            {historyList && historyList.map((item, index) => {
                return (
                    <div className="mika-novel-header-history-item" key={index} onClick={() => {
                        nav(`/novel/${item.novelId}`);
                    }}>
                        <Image src={baseURL + item.cover} width={40} height={40} alt=""/>
                        <div className="mika-novel-header-history-item-info">
                            <p>{item.novelTitle}</p>
                            <p>{item.timestamp}</p>
                            <p>上次看到: {item.chapterTitle}</p>
                        </div>
                    </div>
                );
            })}

            {historyList && historyList.length > 0 && <div className="mika-novel-header-history-more" onClick={() => {
                nav("/space/history");
            }}>查看更多
            </div>}
        </div>} paddingTrigger={10} className="mika-novel-header-history" callback={() => {
            freshHistoryList();
        }}>
            <div className='trigger' onClick={() => {
                nav("/space/history");
            }}>历史
            </div>
        </Dropdown>
    );
}


const Header = memo(() => {
    const nav = useNavigate();

    return (
        <header className="mika-novel-header-container">
            <p className="mika-novel-header-icon" onClick={() => {
                nav("/");
            }}>Mika</p>
            <SearchSection/>
            <div className="mika-novel-header-right">
                <UserSection/>
                <FavorDropdown/>
                <HistoryDropdown/>
                <div className="mika-novel-header-category" onClick={() => {
                    nav("/category");
                }}>分类
                </div>
                <Dropdown menu={
                    <div className="mika-novel-header-dropdown">
                        <Button onClick={() => {
                            nav("/space");
                        }} styleType="text">个人中心</Button>
                        <Button styleType="text" onClick={() => {
                            nav("/category");
                        }}>分类</Button>
                    </div>} position='right' paddingTrigger={10} className="mika-novel-header-dropdown-container">
                    <div className="mika-novel-header-ellipsis">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <circle cx="12" cy="12" r="2" fill="#777"/>
                            <circle cx="6" cy="12" r="2" fill="#777"/>
                            <circle cx="18" cy="12" r="2" fill="#777"/>
                        </svg>
                    </div>
                </Dropdown>
            </div>
        </header>
    );
});

export default Header;