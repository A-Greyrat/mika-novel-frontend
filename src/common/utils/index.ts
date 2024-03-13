export {debounce} from '../../component/mika-ui';

export const throttle = <T,>(fn: (arg: T) => unknown, delay: number) => {
    let timer: NodeJS.Timeout | null = null;
    return function (arg: T) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fn(arg);
            timer = null;
        }, delay);
    }
}
