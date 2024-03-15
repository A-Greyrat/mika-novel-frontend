import './CategoryPage.less';
import {memo, useEffect, useState} from "react";
import {getHotTagDisplayBlocks, HotTagDisplayBlock} from "../../common/novel";
import Header from "../../component/header/Header.tsx";
import Footer from "../../component/footer/Footer.tsx";
import NovelCard from "../../component/NovelCard/NovelCard.tsx";
import SkeletonCard from "../../component/SkeletonCard/SkeletonCard.tsx";

const Loading = memo(() => {
    return (
        <div className="mika-novel-loading">
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
        </div>
    );
});

const CategoryPage = () => {
    const [tagBlocks, setTagBlocks] = useState<HotTagDisplayBlock[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "热门分类";
        window.scrollTo(0, 0);

        getHotTagDisplayBlocks().then((blocks) => {
            setTagBlocks(blocks);
            setLoading(false);
        });
    }, []);

    return (<>
            <Header/>
            {loading && <Loading/>}
            <div className="mika-novel-category-page-root">
                <div className="mika-novel-category-page-tag-blocks">
                    {tagBlocks && tagBlocks.map((block) => {
                        return (<>
                            <div className="mika-novel-category-page-tag-block-title">{block.tag.tagName}</div>
                            <div className="mika-novel-category-page-tag-block">
                                {block.list.map((novel) => {
                                    return <NovelCard key={novel.id} {...novel} padding={6}/>;
                                })}
                            </div>
                        </>);
                    })}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default CategoryPage;
