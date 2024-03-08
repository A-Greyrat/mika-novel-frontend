import './Header.less';
import {memo, useEffect, useState} from "react";
import {isUserLoggedIn} from "../../common/user";
import {Image} from "../mika-ui";

const UserSection = () => {
    const [avatar] = useState("/defaultAvatar.webp");

    useEffect(() => {
        if (isUserLoggedIn) {
            // TODO: get user avatar
        }
    }, []);

    return (
        <div className="mika-novel-header-user">
            <Image src={avatar} width={42} height={42} alt="" onClick={() => {
                window.location.href = "/login";
            }}/>
        </div>
    );
}

const Header = memo(() => {
    return (
        <header className="mika-novel-header-container">
            <p className="mika-novel-header-icon" onClick={() => {
                window.location.href = "/";
            }}>Mika</p>
            <div className="mika-novel-header-right">
                <UserSection/>
            </div>
        </header>
    );
});

export default Header;