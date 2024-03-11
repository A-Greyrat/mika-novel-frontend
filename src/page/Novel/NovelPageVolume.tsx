import './NovelPageVolume.less';
import {Button} from "../../component/mika-ui";
import {getHistory, NovelPageVolumeInfo} from "../../common/novel";
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import {useStore} from "../../common/mika-store";

const NovelPageVolume = ({nid, volumeData}: { nid: string, volumeData: NovelPageVolumeInfo[] }) => {
    const nav = useNavigate();
    const [lastRead, setLastRead] = useStore<{ volumeId: number, chapterId: number }>("mika-novel-last-read");

    useEffect(() => {
        getHistory(nid).then((res) => {
            res.length > 0 && setLastRead({
                volumeId: res[0].volumeNumber,
                chapterId: res[0].chapterNumber
            });
        });
    }, [nid, setLastRead]);


    if (!volumeData) {
        return null;
    }

    return (
        <div className="mika-novel-page-volume">
            {volumeData.map((volume, index) => {
                return (
                    <div key={index}>
                        <h2>{volume.title}</h2>
                        <div className="mika-novel-page-volume-chapters">
                            {volume.chapters.map((chapter: NovelPageVolumeInfo['chapters'][number], index) => {
                                return (
                                    <Button key={index}
                                            styleType={lastRead?.volumeId === parseInt(chapter.volumeId) && lastRead?.chapterId === parseInt(chapter.id) ? 'primary' : 'default'}
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
