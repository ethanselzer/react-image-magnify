import {
    ComponentProps, useEffect, useRef, useState,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createPortal } from 'react-dom';
import { EnlargedImage } from 'src/EnlargedImage';

export interface PropTypes extends ComponentProps<typeof EnlargedImage> {
    isPortalEnabledForTouch: boolean,
    isTouchDetected: boolean,
    portalId?: string
}

export const RenderEnlargedImage = (props: PropTypes): JSX.Element => {
    const {
        isPortalEnabledForTouch,
        isTouchDetected,
        portalId,
        ...rest
    } = props;
    const portalRef = useRef<HTMLElement>(document.createElement('div'));
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        if (portalId) {
            portalRef.current.id = portalId;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isPortalRendered = !!portalId && (!isTouchDetected || isPortalEnabledForTouch) || false;

    return (
        <>
            {isMounted && isPortalRendered && createPortal(
                <EnlargedImage {...rest} isPortalRendered={isPortalRendered} />,
                portalRef.current,
            )}
            {isMounted && !isPortalRendered && (
                <EnlargedImage {...rest} isPortalRendered={isPortalRendered} />
            )}
        </>
    );
};
