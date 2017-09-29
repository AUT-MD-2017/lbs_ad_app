import { createAsyncAction } from 'redux-action-tools';

import * as utils from '../utils';
import * as types from '../constants/action_types';


export const resetLocation = () => ({
  type: types.RESET_LOCATION,
});

export const fetchLocation = createAsyncAction(
  types.FETCH_LOCATION,

  ({ id }) => utils.api(`location/${id}`),
);
