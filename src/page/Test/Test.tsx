import './Test.less';
import SkeletonCard from "../../component/SkeletonCard/SkeletonCard";

const Test = () => {
    console.log('test')
    return (
        <div className="test-root">
            <SkeletonCard/>
        </div>
    );
};

export default Test;