import PropTypes from 'prop-types';
import { ENLARGED_IMAGE_POSITION } from '../constants';

export const EnlargedImagePosition = PropTypes.oneOf([
    ENLARGED_IMAGE_POSITION.beside,
    ENLARGED_IMAGE_POSITION.over
]);

export const EnlargedImageContainerDimensions = PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
});

export const ContainerDimensions = PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
});
