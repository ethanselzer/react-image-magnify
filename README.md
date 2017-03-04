# react-image-magnify

A React image magnification component for desktop and touch.

Supports arbitrary image sizes and fade-transitions. Scales magnification automatically.

Desktop displays side by side enlarged image view, with tinted control-image mask.
Supports hover intent.

Touch displays in place enlarged image view.
Supports press to pan. Does not interfere with scrolling.

## Demo
[Desktop](https://ethanselzer.github.io/react-image-magnify)

[Touch](https://ethanselzer.github.io/react-image-magnify/#/touch)

<img src="https://raw.githubusercontent.com/ethanselzer/react-image-magnify/master/images/qrcode.png" width="75" height="75" alt="Touch Demo"/>

## Status
[![CircleCI](https://img.shields.io/circleci/project/github/ethanselzer/react-image-magnify.svg)](https://circleci.com/gh/ethanselzer/react-image-magnify)
[![npm](https://img.shields.io/npm/v/react-image-magnify.svg)](https://www.npmjs.com/package/react-image-magnify)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

```sh
npm install --save react-image-magnify
```

## Usage
### Desktop

```JSX
import { ReactImageMagnify } from 'react-image-magnify';
...
<ReactImageMagnify {...{
    largeImage: {
        alt: 'Example description',
        src: 'https://example.com/large/image.jpg',
        width: 1200,
        height: 1800
    },
    smallImage: {
        alt: 'Example description',
        src: 'https://example.com/small/image.jpg',
        width: 400,
        height: 600
    }
}}/>
...
```
### Touch

```JavaScript
import { ReactImageMagnifyTouch } from 'react-image-magnify';
...
<ReactImageMagnifyTouch {...{
    largeImage: {
        alt: 'Example description',
        src: 'https://example.com/large/image.jpg',
        width: 1200,
        height: 1800
    },
    smallImage: {
        alt: 'Example description',
        src: 'https://example.com/small/image.jpg',
        width: 400,
        height: 600
    }
}}/>
...
```

## Props API

### Desktop and Touch
| Prop                          | Type   | Required | Default | Description                                                |
|-------------------------------|--------|----------|---------|------------------------------------------------------------|
| `smallImage`                  | Object | Yes      |         | Small image information. See `Image Struct` below.         |
| `largeImage`                  | Object | Yes      |         | Large image information. See `Image Struct` below.         |
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
| `pressDuration`               | Number | No       | 500     | Milliseconds to delay press activation (long touch).       |
| `pressMoveThreshold`          | Number | No       | 5       | Pixels of movement allowed during press activation.        |
| `enlargedImagePosition`       | String | No       | over    | Enlarged image position. Can be 'beside' or 'over'.        |

### Image Struct
```
{
    alt: String,
    src: String,
    srcSet: String,
    width: Number,
    height: Number
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

Navigate to /touch for an example of the touch specific version.

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
