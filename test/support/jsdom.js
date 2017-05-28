const jsdom = require('jsdom');
const baseMarkup = '<!DOCTYPE html><html><head><title></title></head><body></body></html>';
const { JSDOM } = jsdom;
const { window } = new JSDOM(baseMarkup);

global.window = window;
global.document = window.document;
global.HTMLElement = global.window.HTMLElement;
global.MouseEvent = global.window.MouseEvent;
global.navigator = {
    userAgent: 'node.js'
};
