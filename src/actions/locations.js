import axios from 'axios';
import { createAsyncAction } from 'redux-action-tools';

import * as types from '../constants/action_types';


export const fetchLocations = createAsyncAction(
  types.FETCH_LOCATIONS,

  ({ coords }) => {
    return axios.get('/api/locations', {
      lat: coords.latitude,
      lng: coords.longitude,
    });
  },
);
