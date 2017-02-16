import React, { Component } from 'react';
import Head from 'next/head';
import { ReactImageMagnifyTouch } from 'react-image-magnify';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Head>
                    <title>React Image Magnify Touch</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <ReactImageMagnifyTouch {...{
                    style: {
                        margin: '20px auto 0'
                    },
                    fadeDurationInMs: 500,
                    largeImage: {
                        alt: 'Wrist watch face',
                        src: 'static/large-a.jpg',
                        width: 1200,
                        height: 1800
                    },
                    smallImage: {
                        alt: 'Wrist watch face',
                        src: 'static/large-a.jpg',
                        width: 300,
                        height: 450
                    }
                }} />
                <div style={{
                    margin: '0 20px',
                    height: '500px',
                    font: '16px Arial'
                }}>
                    <p>Press (long touch) image to magnify. Pan (drag) to traverse image.</p>
                    <p>Note the page can be scrolled when touch begins on image.</p>
                </div>
            </div>
        );
    }
}

export default App;
