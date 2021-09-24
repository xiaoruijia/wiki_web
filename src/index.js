import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Router from "./router/router"
import 'rsuite/dist/styles/rsuite-default.css';
import 'highlight.js/styles/a11y-dark.css';

ReactDOM.render(
    <Router/>,
    document.getElementById('root')
);
