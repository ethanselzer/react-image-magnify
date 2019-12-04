import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import objectAssign from 'object-assign';

var BaseImageShape = {
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
    sizes: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func
};

export var LargeImageShape = PropTypes.shape(objectAssign({}, BaseImageShape, {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
}));

export var SmallImageShape = PropTypes.shape(objectAssign({}, BaseImageShape, {
    isFluidWidth: PropTypes.bool,
    width: requiredIf(PropTypes.number, function (props) {
        return !props.isFluidWidth;
    }),
    height: requiredIf(PropTypes.number, function (props) {
        return !props.isFluidWidth;
    })
}));