import React from 'react';
import { Router, Route } from 'react-router';

import Pointer from './pages/Pointer';
import PointerFluid from './pages/PointerFluid';
import Touch from './pages/Touch';
import TouchFluid from './pages/TouchFluid';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Pointer} />
        <Route path="/pointer/fluid" component={PointerFluid} />
        <Route path="/touch" component={Touch} />
        <Route path="/touch/fluid" component={TouchFluid} />
    </Router>
);

export default Routes;
