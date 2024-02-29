import {TabList} from "../../component/mika-ui";
import {useState} from "react";

const Test = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <>
            <TabList items={['Tab 1', 'Tab 2', 'Tab 3']}
                     activeIndex={activeIndex}
                     width={'150px'}
                     onChange={setActiveIndex}
            />
        </>
    );
};

export default Test;