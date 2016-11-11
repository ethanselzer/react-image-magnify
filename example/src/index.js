import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Routes from './router';
import './index.css';

ReactDOM.render(
  <Routes history={browserHistory}/>,
  document.getElementById('root')
);
