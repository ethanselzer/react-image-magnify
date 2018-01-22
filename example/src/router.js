import React from 'react';
import { Router, Route } from 'react-router';

import SideBySide from './pages/SideBySide';
import ReactSlick from './pages/ReactSlick';
import Issue22 from './pages/Issue22';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={SideBySide} />
        <Route path="/react-slick" component={ReactSlick} />
        <Route path="/issue22" component={Issue22} />
    </Router>
);

export default Routes;
