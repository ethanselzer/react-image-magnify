import {
    ComponentType,
    HTMLProps, useEffect, useMemo, useRef, useState,
} from 'react';

import {
    getLensModeMagnifiedImageCoordinates,
    getInPlaceMagnifiedImageCoordinates,
} from 'src/lib/imageCoordinates';
import { noop } from 'src/utils';
import {
    getMagnifyContainerStyle,
    getMagnifiedImageStyle,
    getMagnifiedImageTranslationStyle,
    getTransitionActiveStyle,
} from 'src/lib/styles';
import {
    ContainerDimensions, MagnifiedImageProps, Point, ImageProps,
} from 'src/types';

export interface PropTypes extends HTMLProps<HTMLDivElement> {
    containerDimensions: ContainerDimensions;
    cursorOffset: Point;
    fadeDurationInMs?: number;
    imageComponent?: ComponentType<HTMLProps<HTMLImageElement>>;
    imageProps: MagnifiedImageProps;
    isActive?: boolean;
    isLazyLoaded?: boolean;
    isPortalRendered?: boolean;
    isInPlaceMode?: boolean;
    isPositionOutside?: boolean;
    position: Point;
    sourceImage: ContainerDimensions | ImageProps;
}

export function MagnifyContainer(props: PropTypes): JSX.Element {
    const {
        containerDimensions,
        cursorOffset,
        fadeDurationInMs = 0,
        imageComponent: ImageComponent = 'img',
        imageProps,
        isActive,
        isLazyLoaded = true,
        isInPlaceMode,
        isPortalRendered,
        isPositionOutside,
        position,
        sourceImage,
        style,
        ...rest
    } = props;
    const timersRef = useRef<number[]>([]);
    const [isTransitionEntering, setIsTransitionEntering] = useState(false);
    const [isTransitionActive, setIsTransitionActive] = useState(false);
    const [isTransitionLeaving, setIsTransitionLeaving] = useState(false);
    const [, setIsTransitionDone] = useState(false);

    const isVisible = !isLazyLoaded || (
        isLazyLoaded && (isTransitionEntering || isTransitionActive || isTransitionLeaving)
    );

    const imageCoordinates = isInPlaceMode
        ? getInPlaceMagnifiedImageCoordinates(
            containerDimensions,
            imageProps,
            position,
        )
        : getLensModeMagnifiedImageCoordinates(
            containerDimensions,
            cursorOffset,
            imageProps,
            position,
            sourceImage,
        );

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

    const enlargedImageContainerStyle = useMemo(() => getMagnifyContainerStyle(
        containerDimensions,
        style,
        fadeDurationInMs,
        isInPlaceMode,
        isPortalRendered,
    ), [containerDimensions, style, fadeDurationInMs, isInPlaceMode, isPortalRendered]);

    const enlargedImageStyle = useMemo(() => getMagnifiedImageStyle(imageProps), [imageProps]);

    const computedContainerStyle = {
        ...enlargedImageContainerStyle,
        ...getTransitionActiveStyle(isTransitionActive),
    };

    const computedImageStyle = {
        ...enlargedImageStyle,
        ...getMagnifiedImageTranslationStyle(imageCoordinates),
    };

    return (
        <>
            {isVisible && (
                <div
                    {...rest}
                    style={computedContainerStyle}
                >
                    <ImageComponent
                        {...imageProps}
                        alt={imageProps.alt || ''}
                        style={computedImageStyle}
                        onLoad={imageProps.onLoad || noop}
                        onError={imageProps.onError || noop}
                    />
                </div>
            )}
        </>
    );
}
