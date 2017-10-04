import React from 'react';
import { connect } from 'react-redux';
import {
  addNavigationHelpers, StackNavigator, TabNavigator,
} from 'react-navigation';

import { MapScreen } from '../components';
import {
  NearbyScreen, MyAccountScreen, LocationScreen, SettingsScreen,
  IntroGuideScreen, RegisterScreen, LoginScreen,
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

const LoggedInScreen = StackNavigator({
  Tab: { screen: TabScreen },
  Location: { screen: LocationScreen },
  Map: { screen: MapScreen },
  Settings: { screen: SettingsScreen },
});

const LoggedOutScreen = StackNavigator(
  {
    IntroGuide: { screen: IntroGuideScreen },
    Register: { screen: RegisterScreen },
    Login: { screen: LoginScreen },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);

export const RootScreen = StackNavigator(
  {
    LoggedOut: { screen: LoggedOutScreen },
    LoggedIn: { screen: LoggedInScreen },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);

class App extends React.Component {
  render() {
    const { props } = this;

    return (
      <RootScreen
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
