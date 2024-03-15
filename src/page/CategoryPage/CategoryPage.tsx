import './CategoryPage.less';
import {useEffect, useState} from "react";
import {getHotTagDisplayBlocks, HotTagDisplayBlock} from "../../common/novel";

const CategoryPage = () => {
    const [tagBlocks, setTagBlocks] = useState<HotTagDisplayBlock[]>([]);

    useEffect(() => {
        document.title = "热门分类";
        window.scrollTo(0, 0);

        getHotTagDisplayBlocks().then((blocks) => {
            setTagBlocks(blocks);
        });
    }, []);

    return (
        <div className="mika-novel-category-page-root">
            <div className="mika-novel-category-page-title">热门分类</div>
            <div className="mika-novel-category-page-tag-blocks">
                {
                    tagBlocks && tagBlocks.map((block) => {
                        return (
                            <div key={block.tag.id} className="mika-novel-category-page-tag-block">
                                <div className="mika-novel-category-page-tag-name">{block.tag.tagName}</div>
                                <div className="mika-novel-category-page-tag-novels">
                                    {
                                        block.list.map((novel) => {
                                            return (
                                                <div key={novel.id} className="mika-novel-category-page-tag-novel">
                                                    <img src={novel.cover} alt={novel.title} />
                                                    <div className="mika-novel-category-page-tag-novel-title">{novel.title}</div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default CategoryPage;
