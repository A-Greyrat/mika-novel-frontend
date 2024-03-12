import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./NovelReader.less";
import {getNovelContent} from "../../common/novel";
import {getReaderSetting} from "../../common/setting";
import {Button} from "../../component/mika-ui";
import {useStore} from "../../common/mika-store";

const SettingPanel = () => {
    const [setting, setSetting] = useStore("mika-novel-reader-setting", getReaderSetting());
    console.log(setting)
    return (
        <div className="mika-novel-reader-setting-panel">
            <label>字体大小</label>
            <input type="range" min={14} max={32} step={1} value={parseInt(setting.fontSize)} onChange={(e) => {
                setSetting({...setting, fontSize: e.target.value + 'px'});
            }}/>

            <label>行高</label>
            <input type="range" min={1} max={3} step={0.1} value={parseFloat(setting.lineHeight)} onChange={(e) => {
                setSetting({...setting, lineHeight: e.target.value});
            }}/>
            <label>字间距</label>
            <input type="range" min={0} max={2} step={0.1} value={parseFloat(setting.letterSpacing)}
                   onChange={(e) => {
                       setSetting({...setting, letterSpacing: e.target.value + 'px'});
                   }}/>
            <label>背景颜色</label>
            <input type="color" value={setting.backgroundColor} onChange={(e) => {
                setSetting({...setting, backgroundColor: e.target.value});
            }}/>
            <label>字体颜色</label>
            <input type="color" value={setting['--text-color']} onChange={(e) => {
                setSetting({...setting, '--text-color': e.target.value});
            }}/>
            <label>标题字体大小</label>
            <input type="range" min={14} max={32} step={1} value={parseInt(setting['--title-font-size'])}
                   onChange={(e) => {
                       setSetting({...setting, '--title-font-size': e.target.value + 'px'});
                   }}/>
            <label>标题字体粗细</label>
            <input type="range" min={100} max={900} step={100} value={parseInt(setting['--title-font-weight'])}
                   onChange={(e) => {
                       setSetting({...setting, '--title-font-weight': e.target.value});
                   }}/>

            <label>内容宽度</label>
            <input type="range" min={20} max={100} step={1}
                   value={parseInt(setting['--content-width'].replace('%', ''))} onChange={(e) => {
                setSetting({...setting, '--content-width': e.target.value + '%'});
            }}/>

            <label>内容背景颜色</label>
            <input type="color" value={setting['--content-background-color']} onChange={(e) => {
                setSetting({...setting, '--content-background-color': e.target.value});
            }}/>

        </div>
    );

}

const ToolBar = () => {
    const nav = useNavigate();
    const [settingPanelVisible, setSettingPanelVisible] = useState(false);
    const [showToolBar, setShowToolBar] = useState(true);

    if (!showToolBar) {
        return (
            <div className='mika-novel-reader-toolbar-container-folded'>
                <Button styleType='text' onClick={() => {
                    setShowToolBar(!showToolBar);
                }}>{'展开 >'}</Button>
            </div>
        );
    }

    return (
        <div className='mika-novel-reader-toolbar-container'>
            <div className="mika-novel-reader-toolbar">
                <Button styleType='text' onClick={() => {
                    nav(-1);
                }}>返回</Button>
                <Button styleType='text'>上一章</Button>
                <Button styleType='text'>目录</Button>
                <Button styleType='text'>下一章</Button>
                <Button styleType='text' onClick={() => {
                    setSettingPanelVisible(!settingPanelVisible);
                }}>设置</Button>
                <Button styleType='text' onClick={() => {
                    setShowToolBar(!showToolBar);
                }}>{'< 收起'}</Button>
            </div>
            {settingPanelVisible && <SettingPanel/>}
        </div>
    );
}

const NovelReader = () => {
    const {novelId, volumeId, chapterId} = useParams();
    const [novelContent, setNovelContent] = useState<string[]>();
    const [title, setTitle] = useState<string>();
    const [setting, _setSetting] = useStore("mika-novel-reader-setting", getReaderSetting());

    console.log(setting)
    useEffect(() => {
        window.scrollTo(0, 0);

        getNovelContent(novelId!, volumeId!, chapterId!).then((res) => {
            setNovelContent(res.content);
            setTitle(res.title);
        });

    }, [novelId, volumeId, chapterId]);

    if (!novelId || !volumeId || !chapterId) {
        return null;
    }

    return (
        <div className="mika-novel-reader-root" style={{
            ...setting,
        }}>
            <ToolBar/>
            <div className="mika-novel-reader-content">
                <h1>{title}</h1>
                <div className="mika-novel-reader-divider"/>
                <div className="mika-novel-reader-content-container">
                    {novelContent?.map((content, index) => {
                        return (
                            <p key={index}>{content}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default NovelReader;