import { primaryInput } from 'detect-it';
import {
    CSSProperties,
    Dispatch,
    MouseEvent,
    SetStateAction,
    SyntheticEvent,
    TouchEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { MagnifyContainerPortal } from 'src/MagnifyContainerPortal';
import { NegativeSpaceLens } from 'src/lens/negative-space';
import { PositiveSpaceLens } from 'src/lens/positive-space';
import { DefaultHint } from 'src/hint/DefaultHint';
import { getLensCursorOffset } from 'src/lib/lens';
import { getEnlargedImageContainerDimension } from 'src/lib/dimensions';
import { CursorPosition } from 'src/CursorPosition';
import { InPlaceMagnifyContainer } from 'src/InPlaceMagnifyContainer';
import {
    getContainerStyle,
    getSmallImageStyle,
} from 'src/lib/styles';
import {
    capitalize, isFluid, isIntristic, noop,
} from 'src/utils';
import {
    INPUT_TYPE,
    INTERACTIONS,
    DEFAULT_MAGNIFY_CONTAINER_HEIGHT,
    DEFAULT_MAGNIFY_CONTAINER_WIDTH,
    MagnifiedImagePosition,
} from 'src/constants';
import type {
    ImageProps,
    StaticImageProps,
    DetectedInputType,
    ReactImageMagnifyProps,
} from 'src/types';

function resolveSmallImage(
    smallImageProp: ImageProps,
    smallImageHeight?: number,
    smallImageWidth?: number,
): StaticImageProps {
    const smallImage = {
        ...smallImageProp,
        height: smallImageHeight || (smallImageProp as StaticImageProps).height || 0,
        width: smallImageWidth || (smallImageProp as StaticImageProps).width || 0,
    };

    if (!smallImage.onLoad) {
        smallImage.onLoad = noop;
    }

    return smallImage;
}

function setSmallImageDimensionState(
    img: HTMLImageElement | null,
    setSmallImage: Dispatch<SetStateAction<StaticImageProps>>,
    smallImageProp: ImageProps,
): void {
    if (img && isIntristic(smallImageProp)) {
        const { naturalHeight, naturalWidth } = img;
        const newSmallImage = resolveSmallImage(smallImageProp, naturalHeight, naturalWidth);

        setSmallImage(newSmallImage);
    }
}

export const ReactImageMagnify = (props: ReactImageMagnifyProps): JSX.Element => {
    const {
        activationInteractionHint,
        activationInteractionMouse = INTERACTIONS.hover,
        activationInteractionTouch = INTERACTIONS.press,
        fadeDurationInMs = 300,
        hintComponent: HintComponent = DefaultHint,
        hintProps,
        isEnabled = true,
        imageComponent: ImageComponent = 'img',
        imageProps,
        lensComponent: LensComponentProp,
        lensProps,
        magnifyContainerProps,
        magnifiedImageComponent,
        magnifiedImageProps,
        portalProps: portalPropsProp,
        shouldUsePositiveSpaceLens = false,
        style,
        ...rest
    } = props;
    const isZoomClickable = activationInteractionHint === INTERACTIONS.click;

    if (
        activationInteractionHint
        && activationInteractionMouse === INTERACTIONS.click
        && process?.env?.NODE_ENV !== 'production'
    ) {
        // eslint-disable-next-line no-console
        console.warn(`[ReactImageMagnify]
        Warning! "activationInteractionHint" is set to ${activationInteractionHint} and "activationInteractionMouse" is set to ${INTERACTIONS.click}.
        These are incompatible options and may beahve unexpectedly.
        `);
    }

    ///
    /// Hooks
    ///

    const imageRef = useRef<HTMLImageElement>(null);
    const [smallImage, setSmallImage] = useState<StaticImageProps>(resolveSmallImage(imageProps));
    const [isMouseDetected, setIsMouseDetected] = useState(primaryInput === INPUT_TYPE.mouse);
    const [isTouchDetected, setIsTouchDetected] = useState(primaryInput === INPUT_TYPE.touch);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [lockedByHintInteraction, setLockedByHintInteraction] = useState(isZoomClickable);

    ///
    /// Derived data from state
    ///

    const portalProps = {
        ...portalPropsProp,
        placement: portalPropsProp?.placement || (isTouchDetected
            ? MagnifiedImagePosition.OVER
            : MagnifiedImagePosition.LEFT),
    };
    const isInPlaceMode = portalProps.placement === MagnifiedImagePosition.OVER;
    const shouldShowLens = !isInPlaceMode && !isTouchDetected;

    ///
    /// Memos
    ///

    const resizeHandler = useMemo(() => (): void => setSmallImageDimensionState(
        imageRef.current,
        setSmallImage,
        imageProps,
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ), []);

    const computedEnlargedImageContainerDimensions = useMemo(() => ({
        width: getEnlargedImageContainerDimension({
            containerDimension: magnifyContainerProps?.width || DEFAULT_MAGNIFY_CONTAINER_WIDTH,
            smallImageDimension: smallImage.width,
            isInPlaceMode,
        }),
        height: getEnlargedImageContainerDimension({
            containerDimension: magnifyContainerProps?.height || DEFAULT_MAGNIFY_CONTAINER_HEIGHT,
            smallImageDimension: smallImage.height,
            isInPlaceMode,
        }),
    }), [magnifyContainerProps, smallImage, isInPlaceMode]);

    const cursorOffset = useMemo(() => getLensCursorOffset(
        smallImage,
        magnifiedImageProps,
        computedEnlargedImageContainerDimensions,
    ), [computedEnlargedImageContainerDimensions, magnifiedImageProps, smallImage]);

    ///
    /// Effects
    ///

    useEffect(() => {
        setSmallImage(resolveSmallImage(imageProps));
    }, [imageProps]);

    useEffect(() => {
        setLockedByHintInteraction(activationInteractionHint === INTERACTIONS.click);
    }, [activationInteractionHint]);

    useEffect(() => {
        if (isFluid(imageProps) || isIntristic(imageProps)) {
            setSmallImageDimensionState(imageRef.current, setSmallImage, imageProps);

            window.addEventListener('resize', resizeHandler);
        } else {
            window.removeEventListener('resize', resizeHandler);
        }

        return (): void => window.removeEventListener('resize', resizeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageProps, imageRef]);

    ///
    /// Handlers
    ///

    const generateHintStyle = (hintPropsStyle: CSSProperties | undefined): CSSProperties => {
        const hintStyle = { ...hintPropsStyle };

        // Check and set via if-statements to prevent accidentally overriding existing
        // styles or styles that are set later
        if (lockedByHintInteraction) {
            hintStyle.cursor = 'pointer';
        }

        return hintStyle;
    };

    const handleDetectedEnvironmentChanged = (detectedInputType: DetectedInputType): void => {
        setIsMouseDetected(detectedInputType.isMouseDetected);
        setIsTouchDetected(detectedInputType.isTouchDetected);
    };

    const handleHintClick = (e: MouseEvent<unknown>): void => {
        e.preventDefault();
        e.stopPropagation();
        setLockedByHintInteraction(false);
    };

    const handleHintTouchEnd = (e: TouchEvent<unknown>): void => {
        e.preventDefault();
        e.stopPropagation();
        setLockedByHintInteraction(false);
    };

    const handleOutsideClick = (): void => {
        if (isZoomClickable) {
            setLockedByHintInteraction(true);
        }
    };

    const MemodImageComponent = useMemo(() => (
        <ImageComponent
            {...imageProps}
            alt={smallImage.alt}
            style={getSmallImageStyle(smallImage, imageProps.style)}
            ref={imageRef}
            onLoad={(e: SyntheticEvent<HTMLImageElement, Event>): void => {
                if (smallImage.onLoad) {
                    smallImage.onLoad(e);
                }

                if (isFluid(imageProps) || isIntristic(imageProps)) {
                    setSmallImageDimensionState(imageRef.current, setSmallImage, imageProps);
                }

                setImageLoaded(true);
            }}
        />
    ), [ImageComponent, imageProps, smallImage]);

    const HintComponentOrNull = (
        activationInteractionHint === INTERACTIONS.click
        || activationInteractionHint === INTERACTIONS.hover
    ) ? (
        // @ts-expect-error
        <HintComponent
            hintTextMouse={hintProps?.hintTextMouse || `${capitalize(activationInteractionHint)} to Zoom`}
            hintTextTouch={hintProps?.hintTextTouch || 'Long-Touch to Zoom'}
            isMouseDetected={isMouseDetected}
            isTouchDetected={isTouchDetected}
            style={generateHintStyle(hintProps?.style)}
            {...hintProps}
            onClick={lockedByHintInteraction ? handleHintClick : undefined}
            onTouchEnd={lockedByHintInteraction ? handleHintTouchEnd : undefined}
        />
        ) : null;

    const LensComponent = LensComponentProp || shouldUsePositiveSpaceLens ? PositiveSpaceLens : NegativeSpaceLens;

    return (
        <CursorPosition
            shouldStopTouchMovePropagation
            activationInteractionMouse={activationInteractionMouse}
            activationInteractionTouch={activationInteractionTouch}
            isEnabled={isEnabled}
            style={getContainerStyle(smallImage, style, lockedByHintInteraction)}
            onDetectedEnvironmentChanged={handleDetectedEnvironmentChanged}
            onOutsideClick={handleOutsideClick}
            {...rest}
        >
            {({ position, isActive, isPositionOutside }): JSX.Element => (
                <>
                    {MemodImageComponent}
                    {imageLoaded && (
                        <>
                            {HintComponentOrNull}
                            {shouldShowLens && !lockedByHintInteraction && (
                                <LensComponent
                                    cursorOffset={cursorOffset}
                                    fadeDurationInMs={fadeDurationInMs}
                                    isActive={isActive}
                                    isPositionOutside={isPositionOutside}
                                    position={position}
                                    smallImage={smallImage}
                                    {...lensProps}
                                />
                            )}
                            {isInPlaceMode && !lockedByHintInteraction && (
                                <InPlaceMagnifyContainer
                                    containerDimensions={computedEnlargedImageContainerDimensions}
                                    cursorOffset={cursorOffset}
                                    fadeDurationInMs={fadeDurationInMs}
                                    isActive={isActive}
                                    isPositionOutside={isPositionOutside}
                                    imageComponent={magnifiedImageComponent}
                                    imageProps={magnifiedImageProps}
                                    position={position}
                                    sourceImage={smallImage}
                                    {...magnifyContainerProps}
                                />
                            )}
                            {!isInPlaceMode && !lockedByHintInteraction && (
                                <MagnifyContainerPortal
                                    containerDimensions={computedEnlargedImageContainerDimensions}
                                    cursorOffset={cursorOffset}
                                    fadeDurationInMs={fadeDurationInMs}
                                    isActive={isActive}
                                    isPositionOutside={isPositionOutside}
                                    imageComponent={magnifiedImageComponent}
                                    imageProps={magnifiedImageProps}
                                    portalProps={portalProps}
                                    position={position}
                                    sourceImage={smallImage}
                                    {...magnifyContainerProps}
                                    ref={imageRef}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </CursorPosition>
    );
};
