import { NavigationActions } from 'react-navigation';
import { AppScreen } from '../containers/app';


// redux integration:
// https://reactnavigation.org/docs/guides/redux
// https://github.com/react-community/react-navigation/issues/1919#issuecomment-313564195
const initialState = AppScreen.router.getStateForAction(
  NavigationActions.init(),
);

const getRouteName = (state) => {
  while (state.routes) {
    state = state.routes[state.index];
  }
  return state.routeName;
};

export default (state = initialState, action) => {
  const nextState = AppScreen.router.getStateForAction(action, state);

  if (nextState) {
    return {
      ...nextState,
      routeName: getRouteName(nextState),
    };
  }

  return state;
};
