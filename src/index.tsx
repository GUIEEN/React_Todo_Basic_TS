import * as React from 'react';
import * as ReactDom from 'react-dom';

import { App } from './components/App';
import './styles/style.scss';

const ROOT = document.querySelector('.container');

ReactDom.render(<App />, ROOT);
