import { createAsyncAction } from 'redux-action-tools';

import * as utils from '../utils';
import * as types from '../constants/action_types';


export const fetchLocations = createAsyncAction(
  types.FETCH_LOCATIONS,

  ({ coords, query }) => {
    return utils.api('locations', {
      lat: coords.latitude,
      lng: coords.longitude,
      ...query,
    });
  },
);
