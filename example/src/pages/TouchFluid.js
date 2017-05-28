import React, { Component } from 'react';
import ReactImageMagnifyTouch from '../pkg-lnk/ReactImageMagnifyTouch';

import './App.css';

import watchImg355 from '../images/wristwatch_355.jpg';
import watchImg481 from '../images/wristwatch_481.jpg';
import watchImg584 from '../images/wristwatch_584.jpg';
import watchImg687 from '../images/wristwatch_687.jpg';
import watchImg770 from '../images/wristwatch_770.jpg';
import watchImg861 from '../images/wristwatch_861.jpg';
import watchImg955 from '../images/wristwatch_955.jpg';
import watchImg1033 from '../images/wristwatch_1033.jpg';
import watchImg1112 from '../images/wristwatch_1112.jpg';
import watchImg1192 from '../images/wristwatch_1192.jpg';
import watchImg1200 from '../images/wristwatch_1200.jpg';

class App extends Component {
    get srcSet() {
        return [
            `${watchImg355} 355w`,
            `${watchImg481} 481w`,
            `${watchImg584} 584w`,
            `${watchImg687} 687w`,
            `${watchImg770} 770w`,
            `${watchImg861} 861w`,
            `${watchImg955} 955w`,
            `${watchImg1033} 1033w`,
            `${watchImg1112} 1112w`,
            `${watchImg1192} 1192w`,
            `${watchImg1200} 1200w`,
        ].join(', ');
    }

    render() {
        return (
            <div className="touch-fluid">
                <div className="touch-fluid__image-container">
                    <ReactImageMagnifyTouch {...{
                        largeImage: {
                            alt: '',
                            src: watchImg1200,
                            width: 1200,
                            height: 1800
                        },
                        smallImage: {
                            isFluidWidth: true,
                            alt: 'Wristwatch by Ted Baker London',
                            src: watchImg1200,
                            srcSet: this.srcSet,
                            sizes: '(min-width: 480px) 30vw, 80vw'
                        }
                    }} />
                </div>
                <div className="touch-fluid__instructions">
                    <p className="App-intro">Press (long touch) image to magnify. Pan (drag) to traverse image.</p>
                    <p className="App-intro">Note the page can be scrolled when touch begins on image.</p>
                </div>
                <div style={{height: '1000px'}} />
            </div>
        );
    }
}

export default App;
