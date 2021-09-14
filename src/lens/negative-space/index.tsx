import { LensTop } from 'src/lens/negative-space/LensTop';
import { LensLeft } from 'src/lens/negative-space/LensLeft';
import { LensRight } from 'src/lens/negative-space/LensRight';
import { LensBottom } from 'src/lens/negative-space/LensBottom';
import type { Lens as LensPropTypes } from 'src/types';

export function NegativeSpaceLens(props: LensPropTypes): JSX.Element {
    const {
        cursorOffset,
        fadeDurationInMs,
        isActive,
        isPositionOutside,
        position,
        smallImage,
        style: userSpecifiedStyle,
        ...rest
    } = props;

    const compositLensStyle = {
        backgroundColor: 'rgba(0,0,0,.4)',
        ...userSpecifiedStyle,
    };

    return (
        <div {...rest}>
            <LensTop {...props} style={compositLensStyle} />
            <LensLeft {...props} style={compositLensStyle} />
            <LensRight {...props} style={compositLensStyle} />
            <LensBottom {...props} style={compositLensStyle} />
        </div>
    );
}
