import './Header.less';
import {memo} from "react";

const Header = () => {
    return (
        <header className="mika-novel-header-container">
            <p className="mika-novel-header-icon">Mika</p>
        </header>
    );
}

export default memo(Header);