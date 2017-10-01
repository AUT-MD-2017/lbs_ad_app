import { NavigationActions } from 'react-navigation';
import { AppScreen } from '../containers/app';


const initialState = AppScreen.router.getStateForAction(
  NavigationActions.init(),
);

export default (state = initialState, action) => {
  const nextState = AppScreen.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
