import React, { Component } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import SpacedSpan from '../components/SpacedSpan';

import '../styles/examples.css';

import watchImg687 from '../images/wristwatch_687.jpg';
import watchImg1200 from '../images/wristwatch_1200.jpg';

export default class BasicExample extends Component {
    render() {
        return (
            <div className="fluid">
                <div className="fluid__image-container">
                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: watchImg687,
                        },
                        largeImage: {
                            src: watchImg1200,
                            width: 1200,
                            height: 1800
                        },
                        shouldUsePositiveSpaceLens: true
                    }} />
                </div>
                <div className="fluid__instructions">
                    <h3>Alternate Lens</h3>
                    <p>
                        Specify a positive space design
                        in place of the default negative space design.
                    </p>
                    <p>
                        Optionally override the default appearance by specifying a custom style, for example:
                    </p>
                    <pre>
                        lensStyle: &#123;<br />
                        &nbsp;&nbsp;background: 'hsla(0, 0%, 100%, .3)',<br />
                        &nbsp;&nbsp;border: '1px solid #ccc'<br />
                        &#125;
                    </pre>
                    <p>
                        Support for a custom lens is provided by
                        the <span className="code">lensComponent</span> prop.
                    </p>
                    <p>
                        Please see
                        <SpacedSpan>
                            <a href="https://github.com/ethanselzer/react-image-magnify/blob/master/example/src/components/Lens.js">
                                source code
                            </a>
                        </SpacedSpan>
                        for details.
                    </p>
                </div>
                <div style={{height: '500px'}} />
            </div>
        );
    }
}
