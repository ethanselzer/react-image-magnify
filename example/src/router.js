import React from 'react';
import { Router, Route } from 'react-router';

import FluidWidthSmallImage from './pages/FluidWidthSmallImage';
import FixedWidthSmallImage from './pages/FixedWidthSmallImage';
import InPlaceLargeImage from './pages/InPlaceLargeImage';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={FluidWidthSmallImage} />
        <Route path="/fixed" component={FixedWidthSmallImage} />
        <Route path="/in-place" component={InPlaceLargeImage} />
    </Router>
);

export default Routes;
