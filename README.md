# react-image-magnify

A responsive React image zoom component for touch and mouse.

Supports hover intnet, long-press gesture, and fade transitions.

Use for shopping sites or anywhere image detail is desired.

## Status
[![CircleCI](https://img.shields.io/circleci/project/github/ethanselzer/react-image-magnify.svg)](https://circleci.com/gh/ethanselzer/react-image-magnify) [![Coverage Status](https://coveralls.io/repos/github/ethanselzer/react-image-magnify/badge.svg?branch=master)](https://coveralls.io/github/ethanselzer/react-image-magnify?branch=master)
[![npm](https://img.shields.io/npm/v/react-image-magnify.svg)](https://www.npmjs.com/package/react-image-magnify)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Demo
[Responsive Example](https://ethanselzer.github.io/react-image-magnify/#/)

[Fixed Width Example](https://ethanselzer.github.io/react-image-magnify/#/fixed)

<img src="https://raw.githubusercontent.com/ethanselzer/react-image-magnify/master/images/qrcode.png" width="50" height="50" alt="demo"/>

Experiment with react-image-magnify [live on CodePen](https://codepen.io/ethanselzer/full/oePMNY/).
Use the Change View button to select editing mode or for different layout options.
Use the Fork button to save your changes.


## Installation

```sh
npm install --save react-image-magnify
```

## Usage
If you are upgrading from v1x to v2x, please see the [release notes](https://github.com/ethanselzer/react-image-magnify/releases/tag/v2.0.0).

```JavaScript
import ReactImageMagnify from 'react-image-magnify';
...
<ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: watchImg1200,
        srcSet: [
            `${watchImg687} 687w`,
            `${watchImg770} 770w`,
            `${watchImg861} 861w`,
            `${watchImg955} 955w`,
            `${watchImg1033} 1033w`,
            `${watchImg1112} 1112w`,
            `${watchImg1192} 1192w`,
            `${watchImg1200} 1200w`,
        ].join(', ');,
        sizes: '(min-width: 480px) 30vw, 80vw'
    },
    largeImage: {
        alt: '',
        src: watchImg1200,
        width: 1200,
        height: 1800
    }
}} />
...
```
See more usage examples in the [example project](https://github.com/ethanselzer/react-image-magnify/tree/master/example/src/pages).

If you would like more information on responsive images, please try these resources:  
[https://cloudfour.com/thinks/responsive-images-101-definitions/](https://cloudfour.com/thinks/responsive-images-101-definitions/)  
[https://bitsofco.de/the-srcset-and-sizes-attributes/](https://bitsofco.de/the-srcset-and-sizes-attributes/)

## Props API

### Desktop and Touch
| Prop                          | Type   | Required | Default | Description                                                |
|-------------------------------|--------|----------|---------|------------------------------------------------------------|
| `smallImage`                  | Object | Yes      |         | Small image information. See [Small Image](#small-image) below.         |
| `largeImage`                  | Object | Yes      |         | Large image information. See [Large Image](#large-image) below.         |
| `className`                   | String | No       |         | CSS class applied to root container element.               |
| `style`                       | Object | No       |         | Style applied to root container element.                   |
| `fadeDurationInMs`            | Number | No       | 300     | Milliseconds duration of magnified image fade in/fade out. |
| `imageClassName`              | String | No       |         | CSS class applied to small image element.                  |
| `imageStyle`                  | Object | No       |         | Style applied to small image element.                      |
| `enlargedImageContainerClassName`| String | No    |         | CSS class applied to enlarged image container element.     |
| `enlargedImageContainerStyle` | Object | No       |         | Style applied to enlarged image container element.         |
| `enlargedImageClassName`      | String | No       |         | CSS class applied to enlarged image element.               |
| `enlargedImageStyle`          | Object | No       |         | Style applied to enlarged image element.                   |

### Mouse Specific
| Prop                          | Type   | Required | Default | Description                                                |
|-------------------------------|--------|----------|---------|------------------------------------------------------------|
| `hoverDelayInMs`              | Number | No       | 250     | Milliseconds to delay hover trigger.                       |
| `hoverOffDelayInMs`           | Number | No       | 150     | Milliseconds to delay hover-off trigger.                   |
| `lensStyle`                   | Object | No       |         | Style applied to tinted lens.                      |
| `enlargedImagePosition`       | String | No       | beside  | Enlarged image position. Can be 'beside' or 'over'.        |

### Touch Specific
| Prop                          | Type   | Required | Default | Description                                                |
|-------------------------------|--------|----------|---------|------------------------------------------------------------|
| `isActivatedOnTouch`          | Boolean| No       | false   | Activate magnification immediately on touch. May impact scrolling.|
| `pressDuration`               | Number | No       | 500     | Milliseconds to delay long-press activation (long touch).       |
| `pressMoveThreshold`          | Number | No       | 5       | Pixels of movement allowed during long-press activation.        |
| `enlargedImagePosition`       | String | No       | over    | Enlarged image position. Can be 'beside' or 'over'.        |

### Small Image
```
{
    alt: String,
    isFluidWidth: Boolean, (default false)
    src: String, (required)
    srcSet: String,
    sizes: String,
    width: Number, (required if isFluidWidth is not set)
    height: Number (required if isFluidWidth is not set)
}
```

### Large Image
```
{
    alt: String,
    src: String, (required)
    srcSet: String,
    sizes: String,
    width: Number, (required)
    height: Number (required)
}
```

## Support

Please [open an issue](https://github.com/ethanselzer/react-image-magnify/issues).

## Example Project
```ssh
git clone https://github.com/ethanselzer/react-image-magnify.git
cd react-image-magnify
yarn
yarn run build
cd example
yarn
yarn start
```

If your default browser does not start automatically, open a new browser window and go to localhost:3000

## Development

```ssh
git clone https://github.com/ethanselzer/react-image-magnify.git
cd react-image-magnify
yarn
npm run #See available commands
```

The [Example Project](#example-project) may be used in development.

To rebuild the source automatically when changes are made, run `yarn run build-watch`.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch,
add commits, and [open a pull request](https://github.com/ethanselzer/react-image-magnify/compare/).

## Attribution

Thanks to the following community members for opening GitHub Issues and Pull Requests. Your input is very much appreciated!

@damien916  
@colepatrickturner  
@andreatosatto90  
@nathanziarek  
@hombrew  
@smashercosmo

You are awesome! ✨💫

## License

MIT
