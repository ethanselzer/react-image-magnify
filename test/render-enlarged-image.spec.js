import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import RenderEnlargedImage from '../src/RenderEnlargedImage';

describe('RenderEnlargedImage', () => {
    let shallowWrapper = getShallowWrapper();

    function getShallowWrapper(props) {
        return shallow(<RenderEnlargedImage {...props} />);
    }

    beforeEach(() => {
        shallowWrapper = getShallowWrapper();
    });

    describe('Component is Not Mounted', () => {
        it('renders null', () => {
            shallowWrapper.setState({isMounted: false});

            expect(shallowWrapper.find('EnlargedImage').length).to.equal(0);
        });
    });

    describe('Component is Mounted', () => {
        it('sets isMounted state', () => {
            expect(shallowWrapper.state('isMounted')).to.be.true;
        });

        it('sets instance portalElement property', () => {
            sinon.stub(ReactDOM, 'createPortal');
            sinon.stub(document, 'getElementById').callsFake(id => id);
            shallowWrapper.setProps({ portalId: 'foo' });
            const instance = shallowWrapper.instance();

            instance.componentDidMount();

            expect(instance.portalElement).to.equal('foo');
            ReactDOM.createPortal.restore();
            document.getElementById.restore();
        });

        describe('Mouse Input', () => {
            it('renders internally if portalId prop is not implemented', () => {
                expect(shallowWrapper.find('EnlargedImage').length).to.equal(1);
            });

            it('renders to portal if protalId prop is implemented', () => {
                sinon.stub(ReactDOM, 'createPortal');
                shallowWrapper.setProps({ portalId: 'foo' });

                expect(ReactDOM.createPortal.called).to.be.true;
                ReactDOM.createPortal.restore();
            });
        });

        describe('Touch Input', () => {
            it('renders internally, ignoring portalId implementation by default', () => {
                shallowWrapper.setProps({
                    portalId: 'foo',
                    isTouchDetected: true
                });

                expect(shallowWrapper.find('EnlargedImage').length).to.equal(1);
            });

            it('renders to portal when isPortalEnabledForTouch is set', () => {
                sinon.stub(ReactDOM, 'createPortal');
                shallowWrapper.setProps({
                    isTouchDetected: true,
                    isPortalEnabledForTouch: true,
                    portalId: 'foo'
                });

                expect(ReactDOM.createPortal.called).to.be.true;
                ReactDOM.createPortal.restore();
            })
        });
    });
});
