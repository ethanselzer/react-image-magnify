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
        id: 'portal',
        style: {
            position: 'absolute',
            top: '1rem',
            left: `${200 + 16 + 8}px`,
        },
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
        id: 'portal',
        style: {
            position: 'absolute',
            top: '1rem',
            left: `${200 + 16 + 8}px`,
        },
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
        id: 'portal',
        style: {
            position: 'absolute',
            top: '1rem',
            left: `${200 + 16 + 8}px`,
        },
    },
};
