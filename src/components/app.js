import { StackNavigator, TabNavigator } from 'react-navigation';

import { MapScreen } from '.';
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

const App = StackNavigator({
  Tab: { screen: TabScreen },
  Location: { screen: LocationScreen },
  Map: { screen: MapScreen },
});

export default App;
