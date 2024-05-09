import './NovelPageVolume.less';
import {Button}  from "@natsume_shiki/mika-ui";
import {getHistory, NovelPageVolumeInfo} from "../../common/novel";
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import {useStore} from "mika-store";

const NovelPageVolume = ({nid, volumeData}: { nid: string, volumeData: NovelPageVolumeInfo[] }) => {
    const nav = useNavigate();
    const [lastRead, setLastRead] = useStore<{
        volumeId: number,
        chapterId: number
    } | null>("mika-novel-last-read", null);

    useEffect(() => {
        setLastRead(null);
        getHistory(nid).then((res) => {
            if (res && res.length > 0) {
                setLastRead({
                    volumeId: res[0].volumeNumber,
                    chapterId: res[0].chapterNumber
                });
            }
        });
    }, [nid, setLastRead]);

    if (!volumeData) {
        return null;
    }

    return (
        <div className="mika-novel-page-volume">
            {volumeData.map((volume, _index) => {
                return (
                    <div key={volume.id}>
                        <h2>{volume.title}</h2>
                        <div className="mika-novel-page-volume-chapters">
                            {volume.chapters.map((chapter: NovelPageVolumeInfo['chapters'][number], _index) => {
                                return (
                                    <Button key={chapter.id}
                                            styleType={lastRead && lastRead.volumeId === parseInt(chapter.volumeId) && lastRead.chapterId === parseInt(chapter.id) ? 'primary' : 'default'}
                                            size='large' onClick={() => {
                                        nav(`/novel/${chapter.novelId}/${chapter.volumeId}/${chapter.id}`);
                                    }}>
                                        <div>
                                            {chapter.title}
                                        </div>
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default NovelPageVolume;
