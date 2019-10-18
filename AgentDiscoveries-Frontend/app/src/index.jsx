import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/app';

import '../sass/styles.scss'; // Import so that webpack loads all of the sass

ReactDOM.render(
    <App />,
    document.getElementById('react-root')
);

