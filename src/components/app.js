import { StackNavigator } from 'react-navigation';

import { NearbyScreen, LocationScreen } from '../containers';


const App = StackNavigator({
  Nearby: { screen: NearbyScreen },
  Location: { screen: LocationScreen },
});

export default App;
