import { PropTypes } from 'react';

export default PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
    sizes: PropTypes.string,
    width: PropTypes.number.required,
    height: PropTypes.number.required
});
