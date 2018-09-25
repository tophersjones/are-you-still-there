import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router } from 'react-router-dom'
import history from './history'
import App from './client/App';
import { Provider } from 'react-redux'
import { store } from './client/store/'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store} >
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
