import { StackNavigator, TabNavigator } from 'react-navigation';

import { MapScreen } from '.';
import {
  NearbyScreen, MyAccountScreen, LocationScreen,
} from '../containers';

import * as consts from '../constants';


const Tabs = TabNavigator({
  Nearby: { screen: NearbyScreen },
  MyAccount: { screen: MyAccountScreen },
}, {
  tabBarOptions: {
    showIcon: true,
    activeTintColor: consts.LIGHT_BLUE,
    labelStyle: {
      height: 17,
      fontWeight: 'bold',
    },
    style: {
      height: 55,
      borderTopColor: consts.LIGHT_BLUE,
      borderTopWidth: 2,
    },
  },
});

const App = StackNavigator({
  Tabs: { screen: Tabs },
  Location: { screen: LocationScreen },
  Map: { screen: MapScreen },
});

export default App;
