import PropTypes from 'prop-types';
import Point from './Point';
import { SmallImageShape } from './Image';

export default {
    cursorOffset: Point,
    fadeDurationInMs: PropTypes.number,
    isActive: PropTypes.bool,
    isPositionOutside: PropTypes.bool,
    position: Point,
    smallImage: SmallImageShape,
    style: PropTypes.object
};