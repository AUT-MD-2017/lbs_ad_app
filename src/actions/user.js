import { createAsyncAction } from 'redux-action-tools';

import * as utils from '../utils';
import * as types from '../constants/action_types';


export const fetchCurrentUser = createAsyncAction(
  types.FETCH_CURRENT_USER,
  () => utils.api('current_user'),
);
