import { StackNavigator } from 'react-navigation';

import { MapScreen } from '.';
import { NearbyScreen, LocationScreen } from '../containers';


const App = StackNavigator({
  Nearby: { screen: NearbyScreen },
  Location: { screen: LocationScreen },
  Map: { screen: MapScreen },
});

export default App;
