import './Footer.less';
import {memo} from "react";

const Footer = memo(() => {
    return (
        <footer className="mika-novel-footer-container">
            <p style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "transparent",
                WebkitTextStroke: "1px #8c5b8f",
                textAlign: "center",
            }}>これが最後と決めました</p>
        </footer>
    )
});

export default Footer;