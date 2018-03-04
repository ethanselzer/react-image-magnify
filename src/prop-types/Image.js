import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import objectAssign from 'object-assign';

const BaseImageShape = {
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
    sizes: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func
}

export const LargeImageShape = PropTypes.shape(
    objectAssign(
        {},
        BaseImageShape,
        {
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired
        }
    )
);

export const SmallImageShape = PropTypes.shape(
    objectAssign(
        {},
        BaseImageShape,
        {
            isFluidWidth: PropTypes.bool,
            width: requiredIf(PropTypes.number, props => !props.isFluidWidth),
            height: requiredIf(PropTypes.number, props => !props.isFluidWidth)
        }
    )
);
