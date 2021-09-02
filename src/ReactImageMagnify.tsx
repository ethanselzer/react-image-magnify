import detectIt from 'detect-it';
import {
    ComponentProps,
    ComponentType,
    CSSProperties,
    Dispatch,
    HTMLProps,
    SetStateAction,
    SyntheticEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { RenderEnlargedImage } from 'src/RenderEnlargedImage';
import { NegativeSpaceLens } from 'src/lens/negative-space';
import { PositiveSpaceLens } from 'src/lens/positive-space';
import { DisplayUntilActive } from 'src/hint/DisplayUntilActive';
import { DefaultHint } from 'src/hint/DefaultHint';
import { getLensCursorOffset } from 'src/lib/lens';
import { getEnlargedImageContainerDimension } from 'src/lib/dimensions';
import { CursorPosition } from 'src/CursorPosition';
import {
    getContainerStyle,
    getSmallImageStyle,
} from 'src/lib/styles';
import { noop } from 'src/utils';
import {
    INPUT_TYPE,
    ENLARGED_IMAGE_POSITION,
    INTERACTIONS,
} from 'src/constants';
import type {
    LargeImageShape,
    SmallImageShape,
    EnlargedImagePosition,
    EnlargedImageContainerDimensions,
    Lens as LensPropTypes,
    StaticSmallImageShape,
    DetectedInputType,
    Interactions,
    HintPropTypes,
} from 'src/types';

// If hint click is enabled, don't enable other interactions until hint is clicked
// TODO switch to component-encapsulated props
// TODO is hint click is enabled, and user clicks away, disable zoom
// TODO move states to other components?

export interface PropTypes extends Omit<
ComponentProps<typeof CursorPosition>,
'activationInteractionMouse' | 'activationInteractionTouch' | 'children'
> {
    activationInteractionHint?: Interactions['hint'];
    activationInteractionMouse?: Interactions['click'] | Interactions['hover'];
    activationInteractionTouch?: Interactions['press'] | Interactions['tap'] | Interactions['touch'];
    hoverDelayInMs?: number;
    hoverOffDelayInMs?: number;
    fadeDurationInMs?: number;
    pressDuration?: number;
    pressMoveThreshold?: number;
    imageClassName?: string;
    imageStyle?: CSSProperties;
    lensStyle?: CSSProperties;
    lensComponent?: ComponentType<LensPropTypes>;
    shouldUsePositiveSpaceLens?: boolean;
    smallImage: SmallImageShape;
    largeImage: LargeImageShape;
    enlargedImageContainerClassName?: string;
    enlargedImageContainerStyle?: CSSProperties;
    enlargedImageClassName?: string;
    enlargedImageStyle?: CSSProperties;
    enlargedImageContainerDimensions?: EnlargedImageContainerDimensions;
    enlargedImagePosition?: EnlargedImagePosition['beside'] | EnlargedImagePosition['over'];
    enlargedImagePortalId?: string;
    imageComponent?: ComponentType<HTMLProps<HTMLImageElement>>;
    isEnlargedImagePortalEnabledForTouch?: boolean;
    hintComponent?: ComponentType<HintPropTypes>;
    hintTextMouse?: string;
    hintTextTouch?: string;
    isHintEnabled?: boolean;
    shouldHideHintAfterFirstActivation?: boolean;
}

function resolveSmallImage(
    smallImageProp: SmallImageShape,
    smallImageHeight?: number,
    smallImageWidth?: number,
): StaticSmallImageShape {
    const smallImage = !smallImageProp.isFluidWidth
        ? smallImageProp
        : {
            ...smallImageProp,
            isFluidWidth: true,
            width: smallImageWidth || smallImageProp.width || 0,
            height: smallImageHeight || smallImageHeight || 0,
        };

    if (!smallImage.onLoad) {
        smallImage.onLoad = noop;
    }

    return smallImage as StaticSmallImageShape;
}

function setSmallImageDimensionState(
    img: HTMLImageElement | null,
    setSmallImage: Dispatch<SetStateAction<StaticSmallImageShape>>,
    smallImageProp: SmallImageShape,
): void {
    if (img) {
        const { offsetHeight, offsetWidth } = img;

        setSmallImage(resolveSmallImage(smallImageProp, offsetHeight, offsetWidth));
    }
}

export const ReactImageMagnify = (props: PropTypes): JSX.Element => {
    // TODO convert a lot of these into per-compoonent rest props
    const {
        activationInteractionHint,
        activationInteractionMouse = INTERACTIONS.hover,
        activationInteractionTouch = INTERACTIONS.press,
        enlargedImageClassName,
        enlargedImageContainerClassName,
        enlargedImageContainerDimensions = {
            width: '100%',
            height: '100%',
        },
        enlargedImageContainerStyle,
        enlargedImagePosition,
        enlargedImagePortalId,
        enlargedImageStyle,
        fadeDurationInMs = 300,
        hintComponent: HintComponent = DefaultHint,
        hintTextMouse = 'Hover to Zoom',
        hintTextTouch = 'Long-Touch to Zoom',
        imageClassName,
        imageStyle,
        isEnabled = true,
        isEnlargedImagePortalEnabledForTouch = false,
        isHintEnabled = false,
        imageComponent: ImageComponent = 'img',
        largeImage,
        lensComponent: LensComponentProp,
        lensStyle,
        shouldHideHintAfterFirstActivation = true,
        shouldUsePositiveSpaceLens = false,
        smallImage: smallImageProp,
        style,
        ...rest
    } = props;
    const { primaryInput } = detectIt;

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
    const [smallImage, setSmallImage] = useState<StaticSmallImageShape>(resolveSmallImage(smallImageProp));
    const [isMouseDetected, setIsMouseDetected] = useState(primaryInput === INPUT_TYPE.mouse);
    const [isTouchDetected, setIsTouchDetected] = useState(primaryInput === INPUT_TYPE.touch);
    const [lockedByHintInteraction, setLockedByHintInteraction] = useState(
        isHintEnabled && activationInteractionHint === INTERACTIONS.hint,
    );

    const resizeHandler = useMemo(() => (): void => setSmallImageDimensionState(
        imageRef.current,
        setSmallImage,
        smallImageProp,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ), []);

    ///
    /// Derived data from state
    ///

    const { isFluidWidth } = smallImage;
    const enlargedImagePlacement = (enlargedImagePosition || isTouchDetected)
        ? ENLARGED_IMAGE_POSITION.over
        : ENLARGED_IMAGE_POSITION.beside;
    const isInPlaceMode = enlargedImagePlacement === ENLARGED_IMAGE_POSITION.over;
    const shouldShowLens = !isInPlaceMode && !isTouchDetected;
    const computedEnlargedImageContainerDimensions = {
        width: getEnlargedImageContainerDimension({
            containerDimension: enlargedImageContainerDimensions.width,
            smallImageDimension: smallImage.width,
            isInPlaceMode,
        }),
        height: getEnlargedImageContainerDimension({
            containerDimension: enlargedImageContainerDimensions.height,
            smallImageDimension: smallImage.height,
            isInPlaceMode,
        }),
    };
    const cursorOffset = getLensCursorOffset(
        smallImage,
        largeImage,
        computedEnlargedImageContainerDimensions,
    );
    const isZoomEnabled = isEnabled && !lockedByHintInteraction;

    ///
    /// Effects
    ///

    useEffect(() => {
        setSmallImage(resolveSmallImage(smallImageProp));
    }, [smallImageProp]);

    useEffect(() => {
        setLockedByHintInteraction(isHintEnabled && activationInteractionHint === INTERACTIONS.hint);
    }, [activationInteractionHint, isHintEnabled]);

    useEffect(() => {
        if (isFluidWidth) {
            setSmallImageDimensionState(imageRef.current, setSmallImage, smallImageProp);

            window.addEventListener('resize', resizeHandler);
        } else {
            window.removeEventListener('resize', resizeHandler);
        }

        return (): void => window.removeEventListener('resize', resizeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFluidWidth]);

    ///
    /// Handlers
    ///

    const handleSmallImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
        if (smallImage.onLoad) {
            smallImage.onLoad(e);
        }

        if (isFluidWidth) {
            setSmallImageDimensionState(imageRef.current, setSmallImage, smallImageProp);
        }
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

    const LensComponent = LensComponentProp || shouldUsePositiveSpaceLens ? PositiveSpaceLens : NegativeSpaceLens;

    return (
        <CursorPosition
            shouldStopTouchMovePropagation
            activationInteractionMouse={activationInteractionMouse}
            activationInteractionTouch={activationInteractionTouch}
            isEnabled={isZoomEnabled}
            style={getContainerStyle(smallImage, style)}
            onDetectedEnvironmentChanged={handleDetectedEnvironmentChanged}
            {...rest}
        >
            {({ position }): JSX.Element => (
                <>
                    <ImageComponent
                        {...smallImage}
                        alt={smallImage.alt}
                        className={imageClassName}
                        style={getSmallImageStyle(smallImage, imageStyle)}
                        ref={imageRef}
                        onLoad={handleSmallImageLoad}
                    />
                    {isHintEnabled && (
                        <DisplayUntilActive shouldHideAfterFirstActivation={shouldHideHintAfterFirstActivation}>
                            <HintComponent
                                isMouseDetected={isMouseDetected}
                                isTouchDetected={isTouchDetected}
                                hintTextMouse={hintTextMouse}
                                hintTextTouch={hintTextTouch}
                                onClick={lockedByHintInteraction ? handleHintClick : undefined}
                                onTouchEnd={lockedByHintInteraction ? handleHintTouchEnd : undefined}
                            />
                        </DisplayUntilActive>
                    )}
                    {shouldShowLens && (
                        <LensComponent
                            cursorOffset={cursorOffset}
                            fadeDurationInMs={fadeDurationInMs}
                            position={position}
                            smallImage={smallImage}
                            style={lensStyle}
                        />
                    )}
                    <RenderEnlargedImage
                        containerClassName={enlargedImageContainerClassName}
                        containerDimensions={computedEnlargedImageContainerDimensions}
                        containerStyle={enlargedImageContainerStyle}
                        cursorOffset={cursorOffset}
                        fadeDurationInMs={fadeDurationInMs}
                        imageClassName={enlargedImageClassName}
                        imageStyle={enlargedImageStyle}
                        largeImage={largeImage}
                        smallImage={smallImage}
                        position={position}
                        portalId={enlargedImagePortalId}
                        isPortalEnabledForTouch={isEnlargedImagePortalEnabledForTouch}
                        isTouchDetected={isTouchDetected}
                        isInPlaceMode={isInPlaceMode}
                    />
                </>
            )}
        </CursorPosition>
    );
};
