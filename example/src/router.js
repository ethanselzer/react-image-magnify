import React from 'react';
import { Router, Route } from 'react-router';

import SideBySide from './pages/SideBySide';
import ReactSlick from './pages/ReactSlick';
import EnlargedImageContainerDimensions from './pages/EnlargedImageContainerDimensions';
import FixedWidthSmallImage from './pages/FixedWidthSmallImage';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={SideBySide} />
        <Route path="/react-slick" component={ReactSlick} />
        <Route path="/dimensions" component={EnlargedImageContainerDimensions} />
        <Route path="/fixed" component={FixedWidthSmallImage} />
    </Router>
);

export default Routes;
