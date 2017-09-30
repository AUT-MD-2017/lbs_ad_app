import { combineReducers } from 'redux';

import location from './location';
import locations from './locations';
import user from './user';


export default combineReducers({
  location,
  locations,
  user,
});
