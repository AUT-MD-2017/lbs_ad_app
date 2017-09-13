import { StackNavigator } from 'react-navigation';

import { MainScreen, ProfileScreen } from '../containers';


const App = StackNavigator({
  Main: { screen: MainScreen },
  Profile: { screen: ProfileScreen },
});

export default App;
