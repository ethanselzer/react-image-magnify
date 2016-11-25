import React, { Component } from 'react';
import Head from 'next/head';
import { ReactImageMagnify } from 'react-image-magnify'

class App extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>React Image Magnify</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div style={{
                    width: '400px',
                    margin: '20px 0 10px',
                    font: '21px Arial',
                    textAlign: 'center'
                }}>
                    Hover image to magnify
                </div>
                <ReactImageMagnify {...{
                    largeImage: {
                        alt: 'Wrist watch face',
                        src: 'static/large-a.jpg',
                        width: 1200,
                        height: 1800
                    },
                    smallImage: {
                        alt: 'Wrist watch face',
                        src: 'static/large-a.jpg',
                        width: 400,
                        height: 600
                    }
                }} />
            </div>
        );
    }
}

export default App;
