import { clamp } from 'src/lib/clamp';
import {
    getContainerToImageRatio,
    getSmallToLargeImageRatio,
} from 'src/lib/imageRatio';
import type {
    ContainerDimensions, MagnifiedImageProps, Point, ImageProps, StaticImageProps,
} from 'src/types';

function getMinCoordinates(
    container: ContainerDimensions,
    largeImage: ContainerDimensions | MagnifiedImageProps,
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

export function getLensModeMagnifiedImageCoordinates(
    containerDimensions: ContainerDimensions,
    cursorOffset: Point,
    magnifiedImage: ContainerDimensions | MagnifiedImageProps,
    position: Point,
    image: ContainerDimensions | ImageProps,
): Point {
    const adjustedPosition = getCursorPositionAdjustedForLens(position, cursorOffset);
    const ratio = getSmallToLargeImageRatio(image as StaticImageProps, magnifiedImage);
    const coordinates = {
        x: (Math.round(adjustedPosition.x * ratio.x) * -1),
        y: (Math.round(adjustedPosition.y * ratio.y) * -1),
    };
    const minCoordinates = getMinCoordinates(containerDimensions, magnifiedImage);
    const maxCoordinates = getMaxCoordinates();

    return clampImageCoordinates(coordinates, minCoordinates, maxCoordinates);
}

export function getInPlaceMagnifiedImageCoordinates(
    containerDimensions: ContainerDimensions,
    magnifiedImage: ContainerDimensions | MagnifiedImageProps,
    position: Point,
): Point {
    const minCoordinates = getMinCoordinates(containerDimensions, magnifiedImage);
    const maxCoordinates = getMaxCoordinates();
    const ratio = getContainerToImageRatio(containerDimensions, magnifiedImage);
    const coordinates = {
        x: (Math.round(position.x * ratio.x) * -1),
        y: (Math.round(position.y * ratio.y) * -1),
    };

    return clampImageCoordinates(coordinates, minCoordinates, maxCoordinates);
}
