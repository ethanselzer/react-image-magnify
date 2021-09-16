import { primaryInput } from 'detect-it';
import {
    CSSProperties,
    Dispatch,
    SetStateAction,
    SyntheticEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { MagnifyContainerPortal } from 'src/MagnifyContainerPortal';
import { MagnifyContainer } from 'src/MaginfyContainer';
import { NegativeSpaceLens } from 'src/lens/negative-space';
import { PositiveSpaceLens } from 'src/lens/positive-space';
import { DefaultHint } from 'src/hint/DefaultHint';
import { getLensCursorOffset } from 'src/lib/lens';
import { getEnlargedImageContainerDimension } from 'src/lib/dimensions';
import { CursorPosition } from 'src/CursorPosition';
import {
    getContainerStyle,
    getSmallImageStyle,
} from 'src/lib/styles';
import {
    capitalize, isFluid, isIntristic, noop,
} from 'src/utils';
import {
    INPUT_TYPE,
    MAGNIFIED_IMAGE_POSITION,
    INTERACTIONS,
    DEFAULT_MAGNIFY_CONTAINER_HEIGHT,
    DEFAULT_MAGNIFY_CONTAINER_WIDTH,
} from 'src/constants';
import type {
    ImageProps,
    StaticImageProps,
    DetectedInputType,
    PortalProps,
    ReactImageMagnifyProps,
} from 'src/types';
import { OutsideClickHandler } from 'src/OutsideClickHandler';

// TODO If hint click is enabled, don't enable other interactions until hint is clicked
// TODO is hint click is enabled, and user clicks away, disable zoom
// TODO move states to other components?
// TODO dont render large image or lens until image is loaded
// TODO allow for left, right, top, bottom

function shouldRenderPortal(portalProps: PortalProps | undefined, isTouchDetected: boolean): boolean {
    if (!portalProps?.id) {
        return false;
    }

    if (!isTouchDetected) {
        return true;
    }

    if (portalProps?.enableForTouch) {
        return true;
    }

    return false;
}

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
        magnifiedImagePosition,
        magnifiedImageProps,
        portalProps,
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

    const usePortal = shouldRenderPortal(portalProps, isTouchDetected);
    const enlargedImagePlacement = magnifiedImagePosition || (isTouchDetected
        ? MAGNIFIED_IMAGE_POSITION.over
        : MAGNIFIED_IMAGE_POSITION.beside);
    const isInPlaceMode = enlargedImagePlacement === MAGNIFIED_IMAGE_POSITION.over;
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

    const handleSmallImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
        if (smallImage.onLoad) {
            smallImage.onLoad(e);
        }

        if (isFluid(imageProps) || isIntristic(imageProps)) {
            setSmallImageDimensionState(imageRef.current, setSmallImage, imageProps);
        }

        setImageLoaded(true);
    };

    const handleDetectedEnvironmentChanged = (detectedInputType: DetectedInputType): void => {
        setIsMouseDetected(detectedInputType.isMouseDetected);
        setIsTouchDetected(detectedInputType.isTouchDetected);
    };

    const handleHintClick = (): void => {
        setLockedByHintInteraction(false);
    };

    const handleHintTouchEnd = (): void => {
        setLockedByHintInteraction(false);
    };

    const handleOutsideClick = (): void => {
        if (isZoomClickable) {
            setLockedByHintInteraction(true);
        }
    };

    const LensComponent = LensComponentProp || shouldUsePositiveSpaceLens ? PositiveSpaceLens : NegativeSpaceLens;

    return (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
            <CursorPosition
                shouldStopTouchMovePropagation
                activationInteractionMouse={activationInteractionMouse}
                activationInteractionTouch={activationInteractionTouch}
                isEnabled={isEnabled}
                style={getContainerStyle(smallImage, style, lockedByHintInteraction)}
                onDetectedEnvironmentChanged={handleDetectedEnvironmentChanged}
                {...rest}
            >
                {({ position, isActive, isPositionOutside }): JSX.Element => (
                    <>
                        <ImageComponent
                            {...imageProps}
                            alt={smallImage.alt}
                            style={getSmallImageStyle(smallImage, imageProps.style)}
                            ref={imageRef}
                            onLoad={handleSmallImageLoad}
                        />
                        {imageLoaded && (
                            <>
                                {(
                                    activationInteractionHint === INTERACTIONS.click
                                    || activationInteractionHint === INTERACTIONS.hover
                                ) && (
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
                                )}
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
                                {!usePortal && !lockedByHintInteraction && (
                                    <MagnifyContainer
                                        containerDimensions={computedEnlargedImageContainerDimensions}
                                        cursorOffset={cursorOffset}
                                        fadeDurationInMs={fadeDurationInMs}
                                        isActive={isActive}
                                        isPositionOutside={isPositionOutside}
                                        isInPlaceMode={isInPlaceMode}
                                        imageComponent={magnifiedImageComponent}
                                        imageProps={magnifiedImageProps}
                                        position={position}
                                        sourceImage={smallImage}
                                        {...magnifyContainerProps}
                                    />
                                )}
                                {usePortal && portalProps && !lockedByHintInteraction && (
                                    <MagnifyContainerPortal
                                        containerDimensions={computedEnlargedImageContainerDimensions}
                                        cursorOffset={cursorOffset}
                                        fadeDurationInMs={fadeDurationInMs}
                                        isActive={isActive}
                                        isPositionOutside={isPositionOutside}
                                        isInPlaceMode={isInPlaceMode}
                                        imageComponent={magnifiedImageComponent}
                                        imageProps={magnifiedImageProps}
                                        portalProps={portalProps}
                                        position={position}
                                        sourceImage={smallImage}
                                        {...magnifyContainerProps}
                                    />
                                )}
                            </>
                        )}
                    </>
                )}
            </CursorPosition>
        </OutsideClickHandler>
    );
};
