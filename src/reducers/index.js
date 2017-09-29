import { combineReducers } from 'redux';

import location from './location';
import locations from './locations';


export default combineReducers({
  location,
  locations,
});
