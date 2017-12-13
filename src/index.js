import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer.js';
import ATMItemList from './containers/ATMItemList';
import './css/index.css';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><ATMItemList/></BrowserRouter>
  </Provider>,document.getElementById('root')
)
