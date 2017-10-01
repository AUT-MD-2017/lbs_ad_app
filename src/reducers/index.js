import { combineReducers } from 'redux';

import location from './location';
import locations from './locations';
import user from './user';
import nav from './nav';


export default combineReducers({
  location,
  locations,
  user,
  nav,
});
