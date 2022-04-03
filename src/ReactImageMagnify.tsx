import { primaryInput } from 'detect-it';
import {
    CSSProperties,
    MouseEvent,
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
    capitalize, imageToStrictDimensions, isFluid, resolveSmallImage, setSmallImageDimensionState,
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
    DetectedInputType,
    ReactImageMagnifyProps,
    ContainerDimensions,
} from 'src/types';

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
    const [smallImage, setSmallImage] = useState<ImageProps>(resolveSmallImage(imageProps));
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
            : MagnifiedImagePosition.AUTO),
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
        width: getEnlargedImageContainerDimension(
            magnifyContainerProps?.width || DEFAULT_MAGNIFY_CONTAINER_WIDTH,
            imageRef?.current?.offsetWidth || smallImage.width || DEFAULT_MAGNIFY_CONTAINER_WIDTH,
            magnifyContainerProps?.scale,
            isInPlaceMode,
        ),
        height: getEnlargedImageContainerDimension(
            magnifyContainerProps?.height || DEFAULT_MAGNIFY_CONTAINER_HEIGHT,
            imageRef?.current?.offsetHeight || smallImage.height || DEFAULT_MAGNIFY_CONTAINER_HEIGHT,
            magnifyContainerProps?.scale,
            isInPlaceMode,
        ),
    } as ContainerDimensions), [magnifyContainerProps, smallImage, isInPlaceMode]);

    const cursorOffset = useMemo(() => getLensCursorOffset(
        imageToStrictDimensions(smallImage, imageRef),
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
        if (!isFluid(imageProps)) {
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

    const onImageComplete = (): void => {
        if (!isFluid(imageProps)) {
            setSmallImageDimensionState(imageRef.current, setSmallImage, imageProps);
        }

        setImageLoaded(true);
    };

    const handleImageLoadOrComplete = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
        if (!imageLoaded) {
            if (smallImage.onLoad) {
                smallImage.onLoad(e);
            }

            onImageComplete();
        }
    };

    const HintComponentOrNull = (
        activationInteractionHint === INTERACTIONS.click
        || activationInteractionHint === INTERACTIONS.hover
    ) ? (
        <HintComponent
            {...hintProps}
            hintTextMouse={hintProps?.hintTextMouse || `${capitalize(activationInteractionHint)} to Zoom`}
            hintTextTouch={hintProps?.hintTextTouch || 'Long-Touch to Zoom'}
            isMouseDetected={isMouseDetected}
            isTouchDetected={isTouchDetected}
            style={generateHintStyle(hintProps?.style)}
            onClick={lockedByHintInteraction ? handleHintClick : undefined}
            onTouchEnd={lockedByHintInteraction ? handleHintTouchEnd : undefined}
        />
        ) : null;

    const LensComponent = LensComponentProp || shouldUsePositiveSpaceLens ? PositiveSpaceLens : NegativeSpaceLens;

    useEffect(() => {
        if (imageRef.current?.complete && !imageLoaded) {
            onImageComplete();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <ImageComponent
                        {...imageProps}
                        alt={smallImage.alt}
                        ref={imageRef}
                        style={getSmallImageStyle(smallImage, imageProps.style)}
                        onLoad={handleImageLoadOrComplete}
                    />
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
                                    {...lensProps}
                                    ref={imageRef}
                                />
                            )}
                            {isInPlaceMode && !lockedByHintInteraction && (
                                <InPlaceMagnifyContainer
                                    containerDimensions={computedEnlargedImageContainerDimensions}
                                    cursorOffset={cursorOffset}
                                    fadeDurationInMs={fadeDurationInMs}
                                    imageComponent={magnifiedImageComponent}
                                    imageProps={magnifiedImageProps}
                                    isActive={isActive}
                                    isPositionOutside={isPositionOutside}
                                    position={position}
                                    sourceImageDimensions={imageToStrictDimensions(smallImage, imageRef)}
                                    {...magnifyContainerProps}
                                />
                            )}
                            {!isInPlaceMode && !lockedByHintInteraction && (
                                <MagnifyContainerPortal
                                    containerDimensions={computedEnlargedImageContainerDimensions}
                                    cursorOffset={cursorOffset}
                                    fadeDurationInMs={fadeDurationInMs}
                                    imageComponent={magnifiedImageComponent}
                                    imageProps={magnifiedImageProps}
                                    isActive={isActive}
                                    isPositionOutside={isPositionOutside}
                                    portalProps={portalProps}
                                    position={position}
                                    sourceImageDimensions={imageToStrictDimensions(smallImage, imageRef)}
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
