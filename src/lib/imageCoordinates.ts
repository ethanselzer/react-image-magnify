import { clamp } from 'src/lib/clamp';
import {
    getContainerToImageRatio,
    getSmallToLargeImageRatio,
} from 'src/lib/imageRatio';
import type {
    ContainerDimensions, LargeImageShape, Point, SmallImageShape,
} from 'src/types';

type LensModeEnlargedImageCoordinates = {
    containerDimensions: ContainerDimensions,
    cursorOffset: Point,
    largeImage: ContainerDimensions | LargeImageShape,
    position: Point,
    smallImage: ContainerDimensions | SmallImageShape,
};

type InPlaceEnlargedImageCoordinates = {
    containerDimensions: ContainerDimensions,
    largeImage: ContainerDimensions | LargeImageShape,
    position: Point,
}

function getMinCoordinates(
    container: ContainerDimensions,
    largeImage: ContainerDimensions | LargeImageShape,
): Point {
    return {
        x: ((largeImage.width - container.width) * -1),
        y: ((largeImage.height - container.height) * -1),
    };
}

function getMaxCoordinates(): Point {
    return {
        x: 0,
        y: 0,
    };
}

function clampImageCoordinates(
    imageCoordinates: Point,
    minCoordinates: Point,
    maxCoordinates: Point,
): Point {
    return {
        x: clamp(imageCoordinates.x, minCoordinates.x, maxCoordinates.x),
        y: clamp(imageCoordinates.y, minCoordinates.y, maxCoordinates.y),
    };
}

function getCursorPositionAdjustedForLens(
    position: Point,
    lensCursorOffset: Point,
): Point {
    return {
        x: position.x - lensCursorOffset.x,
        y: position.y - lensCursorOffset.y,
    };
}

export function getLensModeEnlargedImageCoordinates(params: LensModeEnlargedImageCoordinates): Point {
    const {
        containerDimensions,
        cursorOffset: lensCursorOffset,
        largeImage,
        position,
        smallImage,
    } = params;
    const adjustedPosition = getCursorPositionAdjustedForLens(position, lensCursorOffset);
    const ratio = getSmallToLargeImageRatio(smallImage, largeImage);
    const coordinates = {
        x: (Math.round(adjustedPosition.x * ratio.x) * -1),
        y: (Math.round(adjustedPosition.y * ratio.y) * -1),
    };
    const minCoordinates = getMinCoordinates(containerDimensions, largeImage);
    const maxCoordinates = getMaxCoordinates();

    return clampImageCoordinates(coordinates, minCoordinates, maxCoordinates);
}

export function getInPlaceEnlargedImageCoordinates(params: InPlaceEnlargedImageCoordinates): Point {
    const {
        containerDimensions,
        largeImage,
        position,
    } = params;
    const minCoordinates = getMinCoordinates(containerDimensions, largeImage);
    const maxCoordinates = getMaxCoordinates();
    const ratio = getContainerToImageRatio(containerDimensions, largeImage);
    const coordinates = {
        x: (Math.round(position.x * ratio.x) * -1),
        y: (Math.round(position.y * ratio.y) * -1),
    };

    return clampImageCoordinates(coordinates, minCoordinates, maxCoordinates);
}
