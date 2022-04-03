import {
    ComponentType,
    HTMLProps,
    useEffect,
    useMemo,
    useRef,
    useState,
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
    MagnifiedImageProps, Point, ContainerDimensions,
} from 'src/types';

export interface PropTypes extends Omit<HTMLProps<HTMLDivElement>, 'ref'> {
    containerDimensions: ContainerDimensions;
    cursorOffset: Point;
    fadeDurationInMs?: number;
    imageComponent?: ComponentType<HTMLProps<HTMLImageElement>>;
    imageProps: MagnifiedImageProps;
    isActive?: boolean;
    isLazyLoaded?: boolean;
    isPortalRendered?: boolean;
    inPlaceMode?: boolean;
    isPositionOutside?: boolean;
    position: Point;
    sourceImageDimensions: ContainerDimensions;
}

export const MagnifyContainer = (props: PropTypes): JSX.Element | null => {
    const {
        containerDimensions,
        cursorOffset,
        fadeDurationInMs = 0,
        imageComponent: ImageComponent = 'img',
        imageProps,
        isActive,
        isLazyLoaded = true,
        inPlaceMode,
        isPortalRendered,
        isPositionOutside,
        position,
        sourceImageDimensions,
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

    const imageCoordinates = inPlaceMode
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
            sourceImageDimensions,
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

    const enlargedImageStyle = useMemo(() => getMagnifiedImageStyle(imageProps), [imageProps]);

    const computedContainerStyle = {
        overflow: 'hidden',
        ...getMagnifyContainerStyle(
            containerDimensions,
            style,
            fadeDurationInMs,
        ),
        ...getTransitionActiveStyle(isTransitionActive),
    };

    const computedImageStyle = {
        ...enlargedImageStyle,
        ...getMagnifiedImageTranslationStyle(imageCoordinates),
    };

    return isVisible ? (
        <div
            {...rest}
            style={computedContainerStyle}
        >
            <ImageComponent
                {...imageProps}
                alt={imageProps.alt || ''}
                style={computedImageStyle}
                onError={imageProps.onError || noop}
                onLoad={imageProps.onLoad || noop}
            />
        </div>
    ) : null;
};
