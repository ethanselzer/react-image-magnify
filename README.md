<h2 align="center">React Image Magnify</h2>
<br />

<p align="center">
    <b>A responsive React image zoom component for touch and mouse.</b>
</p>

<p align="center">
    <a href="https://circleci.com/gh/gooftroop/react-image-magnify/tree/master">
        <img src="https://circleci.com/gh/gooftroop/react-image-magnify/tree/master.svg?style=svg" alt="CircleCI" />
    </a>
    <a href="https://codeclimate.com/github/gooftroop/react-image-magnify/maintainability">
        <img src="https://api.codeclimate.com/v1/badges/4e91d32af87836dce581/maintainability" />
    </a>
    <a href="https://coveralls.io/github/gooftroop/react-image-magnify?branch=master">
        <img src="https://coveralls.io/repos/github/gooftroop/react-image-magnify/badge.svg?branch=master" />
    </a>
    <a href="https://www.npmjs.com/package/@blacklab/react-image-magnify">
        <img src="https://img.shields.io/npm/v/@blacklab/react-image-magnify.svg" />
    </a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
    </a>
    <a href="https://gooftroop.github.io/react-image-magnify">
        <img src="https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg" />
    </a>
</p>
<br />
<br />

## Installation
<hr />

```sh
npm install @blacklab/react-image-magnify
```
<br />

## Documentation
<hr />

**[View the docs here](https://gooftroop.github.io/react-image-magnify)**

[Storybook](https://gooftroop.github.io/react-image-magnify)

React Image Magnify is a React Component library that provides
* In-place and side-by-side image enlargement
* Positive or negative space guide lens options
* Interaction hint
* Configurable enlarged image dimensions
* Optional enlarged image external render
* Hover and click intent
* Long-press gesture
* Fade transitions
<br />
<br />

## Example usage
<hr />

```typescript
import ReactImageMagnify from 'react-image-magnify';

<ReactImageMagnify
    imageProps={{
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: watchImg300
    }}
    magnifiedImageProps={{
        src: watchImg1200,
        width: 1200,
        height: 1800
    }}
/>
```
<br />

## Changes
<hr />

Detailed release notes for a given version can be found [on our releases page](https://github.com/gooftroop/react-image-magnify/releases).
<br />
<br />

## Support
<hr />

Please [open an issue](https://github.com/gooftroop/react-image-magnify/issues).
<br />
<br />

## Contributing
<hr />

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch,
add commits, and [open a pull request](https://github.com/gooftroop/react-image-magnify/compare/).
<br />
<br />

#### Getting Started


```sh
git clone https://github.com/gooftroop/react-image-magnify.git
cd react-image-magnify
npm install
npm run storybook
```
<br />

## Contributors
<hr />

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
<br />
<br />

## License
<hr />

MIT
