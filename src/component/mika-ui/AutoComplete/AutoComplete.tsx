import React, {forwardRef, memo, ReactNode, useCallback, useEffect} from "react";
import Input from "../Input";
import './AutoComplete.less';

export interface AutoCompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onSubmit'> {
    type?: 'outline' | 'filled' | 'borderless';
    size?: 'small' | 'medium' | 'large';

    onSubmit?: (e: React.FormEvent) => void;
    dataSrc: string[];
    changeDataSrc?: (keyword: string) => void;
    children?: ReactNode;
}

const AutoComplete = memo(forwardRef((props: AutoCompleteProps, ref: React.Ref<HTMLInputElement>) => {
    const {children, dataSrc, className, changeDataSrc, ...rest} = props;
    const olRef = React.useRef<HTMLOListElement>(null);
    const [value, setValue] = React.useState('');
    const [showList, setShowList] = React.useState(false);
    const curIndex = React.useRef(0);
    const onComposition = React.useRef(false);

    useEffect(() => {
        const handleBlur = () => {
            setShowList(false);
        };

        const handleFocus = () => {
            setShowList(true);
        };

        const input = ref as React.MutableRefObject<HTMLInputElement>;

        input && input.current?.addEventListener('blur', handleBlur);
        input && input.current?.addEventListener('focus', handleFocus);
        return () => {
            input && input.current?.removeEventListener('blur', handleBlur);
            input && input.current?.removeEventListener('focus', handleFocus);
        };
    }, [ref]);


    const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
        e.preventDefault();
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const ol = olRef.current;
            ol && ol.children[curIndex.current]?.classList.remove('active');
            curIndex.current = e.key === 'ArrowDown' ? Math.min(curIndex.current + 1, dataSrc.length - 1) : Math.max(curIndex.current - 1, 0);
            ol && ol.children[curIndex.current]?.classList.add('active');
        } else if (e.key === 'Enter') {
            setValue(dataSrc[curIndex.current]);
            olRef.current?.children[curIndex.current]?.classList.remove('active');
        }
    }, [dataSrc]);

    return (<div className='mika-auto-complete-root'>
        <Input ref={ref} {...rest} onKeyUp={handleKeyUp}
               className={`mika-auto-complete-input ${className ?? ''}`}
               onSubmit={(e) => {
                   e.preventDefault();
               }}
               value={value}
               onCompositionStart={() => {
                   onComposition.current = true;
                   console.log('start');
               }}
               onCompositionEnd={(e) => {
                   onComposition.current = false;
                   console.log('end');
                   changeDataSrc?.(e.currentTarget.value);
                   curIndex.current = 0;
               }}

               onInput={(e) => {
                   setValue(e.currentTarget.value);
                   if (onComposition.current) return;
                   console.log('input')

                   changeDataSrc?.(e.currentTarget.value);
                   curIndex.current = 0;
               }}>
            {children}
        </Input>
        {showList && dataSrc && <ol className='mika-auto-complete-list' ref={olRef}>
            {dataSrc.map((_, index) => {
                return <li key={index} tabIndex={index} className='mika-auto-complete-item' autoFocus>{_}</li>;
            })}
        </ol>}
    </div>);
}));

export default AutoComplete;
