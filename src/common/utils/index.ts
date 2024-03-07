export const debounce = <T>(fn: (arg: T) => unknown, delay: number) => {
    let timer: number | null = null;
    return function (arg: T) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(arg);
            timer = null;
        }, delay);
    }
}

export const throttle = <T,>(fn: (arg: T) => unknown, delay: number) => {
    let timer: number | null = null;
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
