import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router } from 'react-router-dom'
import history from './history'
import App from './client/App';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './client/store'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store} >
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
