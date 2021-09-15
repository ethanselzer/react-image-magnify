react-image-magnify
===

A responsive React image zoom component for touch and mouse.

Designed for shopping site product detail.

Features Include:
* In-place and side-by-side image enlargement
* Positive or negative space guide lens options
* Interaction hint
* Configurable enlarged image dimensions
* Optional enlarged image external render
* Hover and click intent
* Long-press gesture
* Fade transitions

## Status
[![CircleCI](https://circleci.com/gh/gooftroop/react-image-magnify/tree/master.svg?style=svg)](https://circleci.com/gh/gooftroop/react-image-magnify/tree/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/4e91d32af87836dce581/maintainability)](https://codeclimate.com/github/gooftroop/react-image-magnify/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/gooftroop/react-image-magnify/badge.svg?branch=master)](https://coveralls.io/github/gooftroop/react-image-magnify?branch=master)
[![npm](https://img.shields.io/npm/v/@blacklab/react-image-magnify.svg)](https://www.npmjs.com/package/@blacklab/react-image-magnify)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://gooftroop.github.io/react-image-magnify)

## Documentation
Read more in the [documentation](https://gooftroop.github.io/react-image-magnify)

## Peer Dependencies

- React 17

## Installation

```sh
npm install @blacklab/react-image-magnify
```

## Usage

```JavaScript
import ReactImageMagnify from 'react-image-magnify';
...
<ReactImageMagnify {...{
    imageProps: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: watchImg300
    },
    magnifiedImageProps: {
        src: watchImg1200,
        width: 1200,
        height: 1800
    }
}} />
...
```

For more usage, see the [Storybook](https://gooftroop.github.io/react-image-magnify)

## Support

Please [open an issue](https://github.com/ethanselzer/react-image-magnify/issues).

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch,
add commits, and [open a pull request](https://github.com/ethanselzer/react-image-magnify/compare/).

### Development

```sh
git clone https://github.com/gooftroop/react-image-magnify.git
cd react-image-magnify
npm install
npm run storybook
```

## Attribution

Thanks to the following community members for opening Issues and Pull Requests.

@damien916  
@colepatrickturner  
@andreatosatto90  
@nathanziarek  
@hombrew  
@smashercosmo  
@sk1e  
@vidries  
@ionutzp  
@sbloedel  
@spiderbites  
@Akarshit  
@eddy20vt  
@evannoronha  
@benjaminadk  
@nilsklimm  
@m4recek  
@yaser-ali-vp  
@carlgunderson  
@tojvan  
@kskonecka  
@Coriou 
@gooftroop 

You are awesome! ✨💫

## License

MIT
