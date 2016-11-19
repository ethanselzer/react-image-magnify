import React, { Component } from 'react';
import Head from 'next/head';
import ReactImageMagnifyTouch from '../src/ReactImageMagnifyTouch';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageWidth: 0,
            imageHeight: 0
        };
    }

    componentDidMount() {
        const rect = document.documentElement.getBoundingClientRect();
        const screenWidth = rect.width;
        const imageWidth = screenWidth - 300;

        this.setState({
            imageWidth,
            imageHeight: imageWidth + (imageWidth / 2)
        });
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
                    enlargedImageContainerStyle: {
                        left: '0px',
                        border: 'none',
                        margin: '0px'
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
                    width: '300px',
                    height: '2000px',
                    margin: '0 auto',
                    font: '22px Arial'
                }}>
                    <p>Press (long touch) image to magnify. Pan (drag) to traverse image.</p>
                    <p>Note the page can be scrolled when touch begins on image.</p>
                </div>
            </div>
        );
    }
}

export default App;
