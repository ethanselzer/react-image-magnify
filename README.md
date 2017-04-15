# react-image-magnify

A responsive React image zoom component for desktop and mobile.

Supports hover intnet, long-press gesture, and fade transitions.

## Demo
[Desktop](https://ethanselzer.github.io/react-image-magnify/#/pointer/fluid)

[Touch](https://ethanselzer.github.io/react-image-magnify/#/touch/fluid)

<img src="https://raw.githubusercontent.com/ethanselzer/react-image-magnify/master/images/qrcode_touch_fluid.png" width="75" height="75" alt="Touch Demo"/>

## Status
[![CircleCI](https://img.shields.io/circleci/project/github/ethanselzer/react-image-magnify.svg)](https://circleci.com/gh/ethanselzer/react-image-magnify)
[![npm](https://img.shields.io/npm/v/react-image-magnify.svg)](https://www.npmjs.com/package/react-image-magnify)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

```sh
npm install --save react-image-magnify
```

## Usage
```JavaScript
import { ReactImageMagnifyTouch } from 'react-image-magnify';
...
<ReactImageMagnifyTouch {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: watchImg1200,
        srcSet: [
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

### Desktop Only
| Prop                          | Type   | Required | Default | Description                                                |
|-------------------------------|--------|----------|---------|------------------------------------------------------------|
| `hoverDelayInMs`              | Number | No       | 250     | Milliseconds to delay hover trigger.                       |
| `hoverOffDelayInMs`           | Number | No       | 150     | Milliseconds to delay hover-off trigger.                   |
| `lensStyle`                   | Object | No       |         | Style applied to tinted lens.                      |
| `enlargedImagePosition`       | String | No       | beside  | Enlarged image position. Can be 'beside' or 'over'.        |

### Touch Only
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
cd react-image-magnify/example
npm install
npm start
```
If your default browser does not start automatically, open a new browser window and go to localhost:3000

Navigate to /touch/fluid or /pointer/fluid for fluid width examples.
Navigate to /touch for fixed width.

## Development

```ssh
git clone https://github.com/ethanselzer/react-image-magnify.git
cd react-image-magnify
npm install
npm run #See available commands
```

The [Example Project](#example-project) may be used in development of react-image-magnify. At this time, the command `npm run prepublsih`
must be run from the root of the project each time you want your changes to be reflected in the example.

If you experience [ReferenceError: Unknown plugin "'transform-es2015-modules-umd'"](https://github.com/ethanselzer/react-image-magnify/issues/1) 
when running `prepublish` you may try running `prepublish-cjs`.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch,
add commits, and [open a pull request](https://github.com/ethanselzer/react-image-magnify/compare/).

## License

MIT
