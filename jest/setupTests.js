/* eslint-disable import/no-extraneous-dependencies */
const { configure } = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

configure({ adapter: new Adapter() });

global.console = {
    debug: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};
