import React from 'react';
import { connect } from 'react-redux';
import {
  addNavigationHelpers, StackNavigator, TabNavigator,
} from 'react-navigation';

import { MapScreen } from '../components';
import {
  NearbyScreen, MyAccountScreen, LocationScreen,
} from '../containers';

import * as consts from '../constants';


const TabScreen = TabNavigator({
  Nearby: { screen: NearbyScreen },
  MyAccount: { screen: MyAccountScreen },
}, {
  tabBarOptions: {
    showIcon: true,
    activeTintColor: consts.RED,
    labelStyle: {
      height: 17,
      fontWeight: 'bold',
    },
    style: {
      height: 55,
      borderTopColor: consts.RED,
      borderTopWidth: 2,
    },
  },
});

export const AppScreen = StackNavigator({
  Tab: { screen: TabScreen },
  Location: { screen: LocationScreen },
  Map: { screen: MapScreen },
});

class App extends React.Component {
  render() {
    const { props } = this;

    return (
      <AppScreen
        screenProps={props.screenProps}
        navigation={addNavigationHelpers({
          dispatch: props.dispatch,
          state: props.nav,
        })}
      />
    );
  }
}

const mapStateToProps = ({ nav }) => ({
  nav,
});

export default connect(mapStateToProps)(App);
