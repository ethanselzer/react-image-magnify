import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ReactImageMagnify } from 'src/ReactImageMagnify';

export default {
    title: 'Using React Portal',
    component: ReactImageMagnify,
} as ComponentMeta<typeof ReactImageMagnify>;

const Template: ComponentStory<typeof ReactImageMagnify> = (args) => <ReactImageMagnify {...args} />;

export const MagnifyOnHoverWithNoHint = Template.bind({});
MagnifyOnHoverWithNoHint.args = {
    imageProps: {
        alt: 'example small image',
        src: 'https://picsum.photos/id/1018/200',
    },
    magnifiedImageProps: {
        src: 'https://picsum.photos/id/1018/800',
        height: 600,
        width: 600,
    },
    portalProps: {
        horizontalOffset: 10,
    },
};

export const MagnifyOnHoverWithHint = Template.bind({});
MagnifyOnHoverWithHint.args = {
    activationInteractionHint: 'hover',
    imageProps: {
        alt: 'example small image',
        src: 'https://picsum.photos/id/1018/200',
    },
    magnifiedImageProps: {
        src: 'https://picsum.photos/id/1018/800',
        height: 600,
        width: 600,
    },
    portalProps: {
        horizontalOffset: 10,
    },
};

export const MagnifyOnHintClick = Template.bind({});
MagnifyOnHintClick.args = {
    activationInteractionHint: 'click',
    imageProps: {
        alt: 'example small image',
        src: 'https://picsum.photos/id/1018/200',
    },
    magnifiedImageProps: {
        src: 'https://picsum.photos/id/1018/800',
        height: 600,
        width: 600,
    },
    portalProps: {
        id: 'portal-test-id',
        horizontalOffset: 10,
    },
};

export const MixedImageDimensions = Template.bind({});
MixedImageDimensions.args = {
    imageProps: {
        alt: 'example small image',
        src: 'https://picsum.photos/id/1018/200',
        height: '100%',
        width: 200,
    },
    magnifiedImageProps: {
        src: 'https://picsum.photos/id/1018/800',
        height: 600,
        width: 600,
    },
    portalProps: {
        id: 'portal-test-id',
        horizontalOffset: 10,
    },
};

export const FluidImageDimensions = Template.bind({});
FluidImageDimensions.args = {
    imageProps: {
        alt: 'example small image',
        src: 'https://picsum.photos/id/1018/200',
        height: '25%',
        width: '25%',
    },
    magnifiedImageProps: {
        src: 'https://picsum.photos/id/1018/800',
        height: 600,
        width: 600,
    },
    portalProps: {
        id: 'portal-test-id',
        horizontalOffset: 10,
    },
};

export const MagnifiedImageContainerDimensions = Template.bind({});
MagnifiedImageContainerDimensions.args = {
    imageProps: {
        alt: 'example small image',
        src: 'https://picsum.photos/id/1018/200',
    },
    magnifiedImageProps: {
        src: 'https://picsum.photos/id/1018/800',
        height: 600,
        width: 600,
    },
    magnifyContainerProps: {
        height: 300,
        width: 300,
    },
    portalProps: {
        id: 'portal-test-id',
        horizontalOffset: 10,
    },
};

export const MagnifiedImageContainerScaling = Template.bind({});
MagnifiedImageContainerScaling.args = {
    imageProps: {
        alt: 'example small image',
        src: 'https://picsum.photos/id/1018/200',
    },
    magnifiedImageProps: {
        src: 'https://picsum.photos/id/1018/800',
        height: 800,
        width: 800,
    },
    magnifyContainerProps: {
        scale: 2,
    },
    portalProps: {
        id: 'portal-test-id',
        horizontalOffset: 10,
    },
};
