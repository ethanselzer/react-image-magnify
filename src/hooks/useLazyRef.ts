import { MutableRefObject, useRef } from 'react';

const noValue = Symbol('lazyRef.noValue');

export const useLazyRef = <Value>(getInitialValue: () => Value): MutableRefObject<Value> => {
    const lazyRef = useRef<typeof noValue | Value>(noValue);

    if (lazyRef.current === noValue) {
        lazyRef.current = getInitialValue();
    }

    return lazyRef as MutableRefObject<Value>;
};
