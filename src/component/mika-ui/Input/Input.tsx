import React, {forwardRef, memo} from "react";
import './Input.less';


export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    type?: 'outline' | 'filled' | 'borderless';
    size?: 'small' | 'medium' | 'large';
}


const Input = memo(forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const {type, size, className, ...rest} = props;

    return (
        <input className={`mika-input-${type || 'outline'} mika-input-${size || 'medium'} ${className}`}
               ref={ref} type='text' {...rest} />
    );
}));

export default Input;