import React from 'react';
import { Router, Route } from 'react-router';

import Home from './pages/Home';
import Basic from './pages/Basic';
import ResponsiveImages from './pages/ResponsiveImages';
import Hint from './pages/Hint';
import ReactSlickIntegration from './pages/ReactSlickIntegration';
import EnlargedImageContainerDimensions from './pages/EnlargedImageContainerDimensions';
import Lens from './pages/Lens';
import FixedWidthSmallImage from './pages/FixedWidthSmallImage';
import ExternalEnlargedImage from './pages/ExternalEnlargedImage';
import Support from './pages/Support';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Home} />
        <Route path="/basic" component={Basic} />
        <Route path="/responsive-images" component={ResponsiveImages} />
        <Route path="/hint" component={Hint} />
        <Route path="/react-slick" component={ReactSlickIntegration} />
        <Route path="/dimensions" component={EnlargedImageContainerDimensions} />
        <Route path="/lens" component={Lens} />
        <Route path="/fixed" component={FixedWidthSmallImage} />
        <Route path="/external" component={ExternalEnlargedImage} />
        <Route path="/support" component={Support} />
    </Router>
);

export default Routes;
