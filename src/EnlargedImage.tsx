import {
    CSSProperties, HTMLProps, useEffect, useMemo, useRef, useState,
} from 'react';

import {
    getLensModeEnlargedImageCoordinates,
    getInPlaceEnlargedImageCoordinates,
} from 'src/lib/imageCoordinates';
import { noop } from 'src/utils';
import {
    getEnlargedImageContainerStyle,
    getEnlargedImageStyle,
} from 'src/lib/styles';
import {
    ContainerDimensions, LargeImageShape, Point, SmallImageShape,
} from 'src/types';

export interface PropTypes extends HTMLProps<HTMLDivElement> {
    containerClassName?: string,
    containerStyle?: Partial<CSSProperties>,
    cursorOffset: Point,
    position: Point,
    fadeDurationInMs?: number,
    imageClassName?: string,
    imageStyle?: Partial<CSSProperties>,
    isActive?: boolean,
    isLazyLoaded?: boolean,
    largeImage: LargeImageShape,
    containerDimensions: ContainerDimensions,
    isPortalRendered?: boolean,
    isInPlaceMode?: boolean,
    isPositionOutside?: boolean,
    smallImage: ContainerDimensions | SmallImageShape,
}

export function EnlargedImage(props: PropTypes): JSX.Element {
    const {
        fadeDurationInMs = 0,
        isLazyLoaded = false,
        containerClassName,
        containerStyle = {},
        cursorOffset,
        position,
        imageStyle = {},
        imageClassName,
        largeImage,
        isActive,
        containerDimensions,
        isPortalRendered,
        isInPlaceMode,
        isPositionOutside,
        smallImage,
        ...rest
    } = props;
    const timersRef = useRef<number[]>([]);
    const [isTransitionEntering, setIsTransitionEntering] = useState(false);
    const [isTransitionActive, setIsTransitionActive] = useState(false);
    const [isTransitionLeaving, setIsTransitionLeaving] = useState(false);
    const [, setIsTransitionDone] = useState(false);

    const isVisible = isTransitionEntering || isTransitionActive || isTransitionLeaving;

    useEffect(() => (): void => timersRef.current?.forEach((timerId) => {
        clearTimeout(timerId);
    }), []);

    useEffect(() => {
        if (isActive && !isPositionOutside) {
            setIsTransitionDone(false);
            setIsTransitionEntering(true);

            timersRef.current.push(window.setTimeout(() => {
                setIsTransitionEntering(false);
                setIsTransitionActive(true);
            }, 0));
        } else {
            setIsTransitionLeaving(true);
            setIsTransitionActive(false);

            timersRef.current.push(window.setTimeout(() => {
                setIsTransitionDone(true);
                setIsTransitionLeaving(false);
            }, fadeDurationInMs));
        }
    }, [fadeDurationInMs, isActive, isPositionOutside]);

    const getImageCoordinates = (): Point => {
        if (isInPlaceMode) {
            return getInPlaceEnlargedImageCoordinates({
                containerDimensions,
                largeImage,
                position,
            });
        }

        return getLensModeEnlargedImageCoordinates({
            containerDimensions,
            cursorOffset,
            largeImage,
            position,
            smallImage,
        });
    };

    const computedContainerStyle = getEnlargedImageContainerStyle({
        containerDimensions,
        containerStyle,
        fadeDurationInMs,
        isTransitionActive,
        isInPlaceMode,
        isPortalRendered,
    });

    const computedImageStyle = getEnlargedImageStyle({
        imageCoordinates: getImageCoordinates(),
        imageStyle,
        largeImage,
    });

    const Component = useMemo(() => (
        <div
            className={containerClassName}
            style={computedContainerStyle}
            {...rest}
        >
            <img
                {...largeImage}
                alt={largeImage.alt || ''}
                className={imageClassName}
                src={largeImage.src}
                srcSet={largeImage.srcSet}
                sizes={largeImage.sizes}
                style={computedImageStyle}
                onLoad={largeImage.onLoad || noop}
                onError={largeImage.onError || noop}
            />
        </div>
    ), [computedContainerStyle, computedImageStyle, containerClassName, imageClassName, largeImage, rest]);

    return (
        <>
            {isLazyLoaded && isVisible && Component}
            {!isLazyLoaded && Component}
        </>
    );
}
