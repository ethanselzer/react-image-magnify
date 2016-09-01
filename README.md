# react-image-magnify

A React component displaying side by side enlarged image view, with tinted control-image mask.

Intended for desktop, but will be updated with touch experience soon.

Supports arbitrary image sizes. Scales magnification automatically.

Supports delaying hover and hover-off, which can help reduce unintentional triggering.


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

### Props API

`className` : String [optional] - A CSS class to be applied to the container element rendered by react-image-magnify.

`style` : Object [optional] - Style to be applied to the container element rendered by react-image-magnify.

`hoverDelayInMs` : Number [optional] - Milliseconds to delay hover trigger. Defaults to 250.

`hoverOffDelayInMs` : Number [optional] - Milliseconds to delay hover-off trigger. Defaults to 150.

`fadeDurationInMs` : Number [optional] - Milliseconds duration of magnified image fade in/fade out. Defaults to 300.

`smallImage` : Object - Image struct.

`largeImage` : Object - Image struct.

Image struct shape:
```
{
    alt: String,
    src: String,
    width: Number,
    height: Number
}
```

## Support

Please [open an issue](https://github.com/ethanselzer/react-image-zoom/issues).

## Development

```ssh
git clone https://github.com/ethanselzer/react-image-zoom.git
cd react-image-zoom
npm install
```
See available commands:
```ssh
npm run
```

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch,
add commits, and [open a pull request](https://github.com/ethanselzer/react-image-zoom/compare/).

## License

MIT
