import React from 'react';
import { Router, Route } from 'react-router';

import App from './pages/App';
import Touch from './pages/Touch';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App} />
        <Route path="/touch" component={Touch} />
    </Router>
);

export default Routes;
