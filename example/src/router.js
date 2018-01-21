import React from 'react';
import { Router, Route } from 'react-router';

import SideBySide from './pages/SideBySide';
import ReactSlick from './pages/ReactSlick';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={SideBySide} />
        <Route path="/react-slick" component={ReactSlick} />
    </Router>
);

export default Routes;
