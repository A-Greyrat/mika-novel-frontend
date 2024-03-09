import './Test.less';
import CarouselNovelCard from "../Home/NovelCard.tsx";
import Carousel from "../../component/mika-ui/Carousel/Carousel.tsx";


const Test = () => {
    return (
        <div className="test-root">
            <div style={{
                width: '300px',
                height: '3000px',
                backgroundColor: 'red',
            }}></div>
            <Carousel items={[
                <CarouselNovelCard title="关于我转生变成史莱姆这档事"
                                   cover="http://img.hongyoubizhi.com/picture/pages/original/2023/10/25/12/116118366_p0.jpg"
                                   author="伏瀬"
                                   description="三上悟过著不起眼的人生，在随机杀人魔肆虐下结束了三十七年生涯……看似如此。当他苏醒时，不仅眼睛看不见，就连耳朵也听不到……面对一连串突发状况，他意识到自己投胎转世成「史莱姆」！尽管变成最弱魔物让他颇有怨言，三上悟还是决定要快乐地过史莱姆生活，没想到却碰上天灾级魔物「暴风龙维尔德拉」，命运就此出现巨大转折──维尔德拉将他命名为「利姆路」，正要展开史莱姆式的异世界新生活时，却被卷入哥布灵对牙狼族的纷争之中，最后还莫名其妙当上魔物大王……能夺取对手能力的「捕食者」以及精通世界真理的「大贤者」，有这两项特殊技能当武器，最强的史莱姆传说正式展开！"
                                   tags={["异世界", "奇幻", "战斗"]} url='/novel/4' imgWidth={200}
                                   imgHeight={300}/>,
                <CarouselNovelCard title="Title 2"
                                   cover="http://img.hongyoubizhi.com/picture/pages/original/2023/10/25/12/116118366_p0.jpg"
                                   author="伏瀬"
                                   description="Description 2" tags={["tag1", "tag2"]} url='/novel/1'
                                   imgWidth={200}
                                   imgHeight={300}/>,
                <CarouselNovelCard title="Title 3"
                                   cover="http://img.hongyoubizhi.com/picture/pages/original/2023/10/25/12/116118366_p0.jpg"
                                   author="伏瀬"
                                   description="Description 3" tags={["tag1", "tag2"]} url='/novel/2'
                                   imgWidth={200}
                                   imgHeight={300}/>,
                <CarouselNovelCard title="Title 4"
                                   cover="http://img.hongyoubizhi.com/picture/pages/original/2023/10/25/12/116118366_p0.jpg"
                                   author="伏瀬"
                                   description="Description 4" tags={["tag1", "tag2"]} url='/novel/3'
                                   imgWidth={200}
                                   imgHeight={300}/>,
            ]} autoSwitchByTime={3000}/>
        </div>
    );
};

export default Test;