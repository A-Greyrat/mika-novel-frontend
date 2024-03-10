import './Header.less';
import {memo, useEffect, useState} from "react";
import {isUserLoggedIn} from "../../common/user";
import {Dropdown, Image} from "../mika-ui";
import {useNavigate} from "react-router-dom";

const UserSection = () => {
    const [avatar] = useState("/defaultAvatar.webp");
    const nav = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn) {
            // TODO: get user avatar
        }
    }, []);

    return (
        <Dropdown menu={<div style={{
            width: 200,
            backgroundColor: "white",
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.1)",
            borderRadius: 5
        }}>
            <div style={{padding: 10, borderBottom: "1px solid #e7e7e7"}}>
                <div style={{marginLeft: 10}}>
                    <p style={{fontSize: 16, color: "#333"}}>Mika</p>
                    <p style={{fontSize: 12, color: "#666"}}>
                        <span>账号：mika</span>
                        <span style={{marginLeft: 10}}>ID：123456</span>
                    </p>
                </div>
            </div>

        </div>} paddingTrigger={10} className="mika-novel-header-user-dropdown">
            <div className="mika-novel-header-user">
                <Image src={avatar} width={42} height={42} alt="" onClick={() => {
                    if (!isUserLoggedIn)
                        nav("/login");
                }}/>
            </div>
        </Dropdown>);
}

const SearchSection = () => {
    return (
        <div className="mika-novel-header-search">
            <input type="text" placeholder="搜索"/>
        </div>
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
                <div className="mika-novel-header-collect">收藏</div>
                <div className="mika-novel-header-history">历史</div>
                <div className="mika-novel-header-upload">上传</div>
            </div>
        </header>
    );
});

export default Header;