import React from 'react';
import { Router, Route } from 'react-router';

import FluidWidthSmallImage from './pages/FluidWidthSmallImage';
import FixedWidthSmallImage from './pages/FixedWidthSmallImage';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={FluidWidthSmallImage} />
        <Route path="/fixed" component={FixedWidthSmallImage} />
    </Router>
);

export default Routes;
