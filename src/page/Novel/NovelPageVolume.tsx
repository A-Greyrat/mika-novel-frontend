import './NovelPageVolume.less';
import {Button} from "../../component/mika-ui";

type NovelPageVolumeProps = {
    volume: {
        id: string;
        title: string;
        chapters: {
            id: string;
            title: string;
        }[];
    }[];
}

const NovelPageVolume = (props: NovelPageVolumeProps) => {
    return (
        <div className="mika-novel-page-volume">
            {props.volume.map((volume, index) => {
                return (
                    <div key={index}>
                        <h2>{volume.title}</h2>
                        <div>
                            {volume.chapters.map((chapter, index) => {
                                return (
                                    <div key={index}>
                                        <Button styleType="default">{chapter.title}</Button>
                                    </div>
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
