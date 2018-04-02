import React from 'react';
import { Router, Route } from 'react-router';

import Basic from './pages/Basic';
import ResponsiveImages from './pages/ResponsiveImages';
import Hint from './pages/Hint';
import ReactSlick from './pages/ReactSlick';
import EnlargedImageContainerDimensions from './pages/EnlargedImageContainerDimensions';
import FixedWidthSmallImage from './pages/FixedWidthSmallImage';
import ExternalEnlargedImage from './pages/ExternalEnlargedImage';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Basic} />
        <Route path="/responsive-images" component={ResponsiveImages} />
        <Route path="/hint" component={Hint} />
        <Route path="/react-slick" component={ReactSlick} />
        <Route path="/dimensions" component={EnlargedImageContainerDimensions} />
        <Route path="/fixed" component={FixedWidthSmallImage} />
        <Route path="/external" component={ExternalEnlargedImage} />
    </Router>
);

export default Routes;
