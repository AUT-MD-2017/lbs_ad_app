import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import App from './components/app';
import * as consts from './constants';


const logger = createLogger({
  level: 'info',
});

let middlewares = [thunk];

if (__DEV__) {
  middlewares = [...middlewares, logger];
}

const middleware = applyMiddleware(...middlewares);
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

class LbsAdApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <App screenProps={{
          tintColor: consts.LIGHT_BLUE,
        }}
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('lbs_ad_app', () => LbsAdApp);
