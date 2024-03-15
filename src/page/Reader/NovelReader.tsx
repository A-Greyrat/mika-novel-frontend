import {useNavigate, useParams} from "react-router-dom";
import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import "./NovelReader.less";
import {
    getNextChapter,
    getNovelContent,
    getNovelVolumes,
    getPrevChapter,
    NovelPageVolumeInfo
} from "../../common/novel";
import {getReaderSetting, resetReaderSetting, setReaderSetting} from "../../common/setting";
import {Button, showMessage, Slider} from "../../component/mika-ui";
import {useStore} from "../../common/mika-store";
import LoadingPage from "../Loading/LoadingPage.tsx";

const SettingPanel = () => {
    const [setting, setSetting] = useStore("mika-novel-reader-setting", getReaderSetting());

    const changeSetting = useCallback((key: string, value: string) => {
        setSetting({...setting, [key]: value});
        setReaderSetting({...setting, [key]: value});
    }, [setting, setSetting]);

    return (
        <div className="mika-novel-reader-setting-panel">
            <label>字体大小</label>
            <Slider showValue min={14} max={32} step={1} value={parseInt(setting.fontSize)} onChange={(e) => {
                changeSetting('fontSize', e.target.value + 'px');
            }}/>
            <label>字体粗细</label>
            <Slider showValue min={100} max={900} step={100} value={parseInt(setting['--text-font-weight'])}
                   onChange={(e) => {
                       changeSetting('--text-font-weight', e.target.value);
                   }}/>

            <label>行高</label>
            <Slider showValue min={1} max={3} step={0.1} value={parseFloat(setting.lineHeight)} onChange={(e) => {
                changeSetting('lineHeight', e.target.value);
            }}/>
            <label>字间距</label>
            <Slider showValue min={0} max={2} step={0.1} value={parseFloat(setting.letterSpacing)}
                   onChange={(e) => {
                       changeSetting('letterSpacing', e.target.value + 'px');
                   }}/>

            <label>段间距</label>
            <Slider showValue min={0} max={60} step={2} value={parseFloat(setting['--paragraph-spacing'])}
                   onChange={(e) => {
                       changeSetting('--paragraph-spacing', e.target.value + 'px');
                   }}/>

            <label>背景颜色</label>
            <input type="color" value={setting.backgroundColor} onChange={(e) => {
                changeSetting('backgroundColor', e.target.value);
            }}/>
            <label>字体颜色</label>
            <input type="color" value={setting['--text-color']} onChange={(e) => {
                changeSetting('--text-color', e.target.value);
            }}/>

            <label>标题字体大小</label>
            <Slider showValue min={14} max={32} step={1} value={parseInt(setting['--title-font-size'])}
                   onChange={(e) => {
                       changeSetting('--title-font-size', e.target.value + 'px');
                   }}/>
            <label>标题字体粗细</label>
            <Slider showValue min={100} max={900} step={100} value={parseInt(setting['--title-font-weight'])}
                   onChange={(e) => {
                       changeSetting('--title-font-weight', e.target.value);
                   }}/>

            <label>内容宽度</label>
            <Slider showValue min={20} max={100} step={1}
                   value={parseInt(setting['--content-width'].replace('%', ''))} onChange={(e) => {
                changeSetting('--content-width', e.target.value + '%');
            }}/>

            <label>内容背景颜色</label>
            <input type="color" value={setting['--content-background-color']} onChange={(e) => {
                changeSetting('--content-background-color', e.target.value);
            }}/>

            <Button style={{
                width: "100%",
                marginTop: 10,
                marginBottom: 10
            }} onClick={() => {
                resetReaderSetting();
                setSetting(getReaderSetting());
            }}>恢复默认</Button>
        </div>
    );

}

const MenuPanel = memo(({novelId, volumeId, chapterId}: {
    novelId: string,
    volumeId: string,
    chapterId: string
}) => {
    const nav = useNavigate();
    const [menu, setMenu] = useState<NovelPageVolumeInfo[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getNovelVolumes(novelId).then((res) => {
            setMenu(res);
            setLoading(false);
        });
    }, [novelId, volumeId, chapterId]);

    return (
        <div className="mika-novel-reader-menu-panel">
            {loading && <div style={{
                textAlign: "center",
                margin: "20px auto",
                color: "#666"
            }}>加载中...</div>}
            {menu && menu.map((item, index) => {
                return (
                    <div key={index} className="mika-novel-reader-menu-item">
                        <h3>{item.title}</h3>
                        <div>
                            {item.chapters.map((chapter, index) => {
                                return (
                                    <Button key={index} size='large' styleType='text' onClick={() => {
                                        nav(`/novel/${novelId}/${chapter.volumeId}/${chapter.id}`);
                                        window.location.reload();
                                    } }>{chapter.title}</Button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

const ToolBar = memo(({novelId, volumeId, chapterId, setTitle, setContent, isFromRedirect}: {
    novelId: string,
    volumeId: string,
    chapterId: string,
    setTitle?: (title: string) => void,
    setContent?: (content: string[]) => void,
    isFromRedirect?: React.MutableRefObject<boolean>
}) => {
    const nav = useNavigate();
    const [settingPanelVisible, setSettingPanelVisible] = useState(false);
    const [showToolBar, setShowToolBar] = useState(true);
    const [isSwitching, setIsSwitching] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const goPrev = useCallback(async () => {
        setIsSwitching(true);
        return getPrevChapter(novelId, volumeId, chapterId).then((res) => {
            if (res) {
                nav(`/novel/${novelId}/${res.volumeNumber}/${res.chapterNumber}`);
                isFromRedirect && (isFromRedirect.current = true);
                setContent && setContent(JSON.parse(res.content));
                setTitle && setTitle(res.title);
            } else {
                showMessage({children: "已经是第一章了"});
            }
            setIsSwitching(false);
        });
    }, [novelId, volumeId, chapterId, nav, isFromRedirect, setContent, setTitle]);

    const goNext = useCallback(async () => {
        setIsSwitching(true);
        return getNextChapter(novelId, volumeId, chapterId).then((res) => {
            if (res) {
                nav(`/novel/${novelId}/${res.volumeNumber}/${res.chapterNumber}`);
                isFromRedirect && (isFromRedirect.current = true);
                setContent && setContent(JSON.parse(res.content));
                setTitle && setTitle(res.title);
            } else {
                showMessage({children: "已经是最后一章了"});
            }
            setIsSwitching(false);
        });
    }, [novelId, volumeId, chapterId, nav, isFromRedirect, setContent, setTitle]);

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
                    nav(`/novel/${novelId}`, {replace: true});
                }}>返回</Button>
                <Button styleType='text' onClick={goPrev} disabled={isSwitching}>上一章</Button>
                <Button styleType='text' onClick={() => {
                    setMenuVisible(!menuVisible);
                    setSettingPanelVisible(false);
                }} disabled={isSwitching}>目录</Button>
                <Button styleType='text' onClick={goNext} disabled={isSwitching}>下一章</Button>
                <Button styleType='text' onClick={() => {
                    setSettingPanelVisible(!settingPanelVisible);
                    setMenuVisible(false);
                }}>设置</Button>
                <Button styleType='text' onClick={() => {
                    setShowToolBar(!showToolBar);
                    setMenuVisible(false);
                    setSettingPanelVisible(false);
                }}>{'< 收起'}</Button>
            </div>
            {settingPanelVisible && <SettingPanel/>}
            {menuVisible && <MenuPanel novelId={novelId} volumeId={volumeId} chapterId={chapterId}/>}
        </div>
    );
});

const NovelReader = () => {
    const {novelId, volumeId, chapterId} = useParams();
    const [novelContent, setNovelContent] = useState<string[]>();
    const [title, setTitle] = useState<string>();
    const [setting, _setSetting] = useStore("mika-novel-reader-setting", getReaderSetting());
    const [loading, setLoading] = useState(true);
    const isFromRedirect = useRef(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (isFromRedirect.current) {
            isFromRedirect.current = false;
            return;
        }

        getNovelContent(novelId!, volumeId!, chapterId!).then((res) => {
            setNovelContent(res.content);
            setTitle(res.title);
            setLoading(false);
        });

    }, [novelId, volumeId, chapterId]);

    if (!novelId || !volumeId || !chapterId) {
        return null;
    }

    if (loading) {
        return <LoadingPage/>;
    }
    document.title = title || "小说阅读";

    return (
        <div className="mika-novel-reader-root" style={{
            ...setting,
        }}>
            <ToolBar novelId={novelId} volumeId={volumeId} chapterId={chapterId} setTitle={setTitle}
                     setContent={setNovelContent} isFromRedirect={isFromRedirect}/>
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