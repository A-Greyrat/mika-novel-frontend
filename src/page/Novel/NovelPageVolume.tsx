import './NovelPageVolume.less';
import {Button} from "../../component/mika-ui";
import {NovelPageVolumeInfo} from "../../common/novel";
import { useNavigate} from 'react-router-dom';

const NovelPageVolume = ({volumeData}: {volumeData: NovelPageVolumeInfo[]}) => {
    const nav = useNavigate ();

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
                                        <Button key={index} styleType="default" size='large' onClick={() => {
                                            nav(`/novel/${chapter.novelId}/${chapter.volumeId}/${chapter.id}`);
                                        }}><div>{chapter.title}</div></Button>
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
