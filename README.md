# react-image-magnify

A React component displaying side by side enlarged image view, with tinted control-image mask.

Intended for desktop, but will be updated with touch experience soon.

Supports arbitrary image sizes. Scales magnification automatically.

Supports delaying hover and hover-off, which can help reduce unintentional triggering.

## Demo
[Basic demo](http://www.webpackbin.com/N18FshAaW)

See ReactImageMagnify.js tab.

## Installation

```sh
npm install --save react-image-magnify
```

## Usage

```JSX
import ReactImageMagnify from 'react-image-magnify';
...
<ReactImageMagnify {...{
    largeImage: {
        alt: 'large image description goes here',
        src: 'https://example.com/large/image.jpg',
        width: 1200,
        height: 1800
    },
    smallImage: {
        alt: 'small image description goes here',
        src: 'https://example.com/small/image.jpg',
        width: 400,
        height: 600
    }
}}/>
...
```

## Props API

| Prop                          | Type   | Required | Default | Description                                                |
|-------------------------------|--------|----------|---------|------------------------------------------------------------|
| `smallImage`                  | Object | Yes      |         | Small image information. See `Image Struct` below.         |
| `largeImage`                  | Object | Yes      |         | Large image information. See `Image Struct` below.         |
| `className`                   | String | No       |         | CSS class applied to root container element.               |
| `style`                       | Object | No       |         | Style applied to root container element.                   |
| `hoverDelayInMs`              | Number | No       | 250     | Milliseconds to delay hover trigger.                       |
| `hoverOffDelayInMs`           | Number | No       | 150     | Milliseconds to delay hover-off trigger.                   |
| `fadeDurationInMs`            | Number | No       | 300     | Milliseconds duration of magnified image fade in/fade out. |
| `imageStyle`                  | Object | No       |         | Style applied to small image element.                      |
| `lensStyle`                   | Object | No       |         | Style applied to tinted lens element.                      |
| `enlargedImageContainerStyle` | Object | No       |         | Style applied to enlarged image container element.         |
| `enlargedImageStyle`          | Object | No       |         | Style applied to enlarged image element.                   |

### Image Struct
```
{
    alt: String,
    src: String,
    width: Number,
    height: Number
}
```

## Support

Please [open an issue](https://github.com/ethanselzer/react-image-magnify/issues).

## Development

```ssh
git clone https://github.com/ethanselzer/react-image-magnify.git
cd react-image-magnify
npm install
```
See available commands:
```ssh
npm run
```

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch,
add commits, and [open a pull request](https://github.com/ethanselzer/react-image-magnify/compare/).

## License

MIT
