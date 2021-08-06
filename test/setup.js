import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import './support/jsdom'

configure({ adapter: new Adapter() });
