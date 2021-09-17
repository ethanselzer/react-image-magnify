import { forwardRef } from 'react';

import { LensTop } from 'src/lens/negative-space/LensTop';
import { LensLeft } from 'src/lens/negative-space/LensLeft';
import { LensRight } from 'src/lens/negative-space/LensRight';
import { LensBottom } from 'src/lens/negative-space/LensBottom';
import type { LensProps } from 'src/types';

export const NegativeSpaceLens = forwardRef<HTMLImageElement, LensProps>((props: LensProps, ref): JSX.Element => {
    const {
        cursorOffset,
        fadeDurationInMs,
        isActive,
        isPositionOutside,
        position,
        style: userSpecifiedStyle,
        ...rest
    } = props;

    const compositLensStyle = {
        backgroundColor: 'rgba(0,0,0,.4)',
        ...userSpecifiedStyle,
    };

    return (
        <div {...rest}>
            <LensTop {...props} ref={ref} style={compositLensStyle} />
            <LensLeft {...props} ref={ref} style={compositLensStyle} />
            <LensRight {...props} ref={ref} style={compositLensStyle} />
            <LensBottom {...props} ref={ref} style={compositLensStyle} />
        </div>
    );
});

NegativeSpaceLens.displayName = 'NegativeSpaceLens';
