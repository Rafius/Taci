import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import ATMItemList from './containers/ATMItemList';
const json = require('./mock.json'); // load resume file

ReactDOM.render(<ATMItemList jsonObj={json}/>, document.getElementById('root'));
