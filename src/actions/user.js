import { createAsyncAction } from 'redux-action-tools';

import * as utils from '../utils';
import * as types from '../constants/action_types';


export const fetchCurrentUser = createAsyncAction(
  types.FETCH_CURRENT_USER,
  () => utils.api('current_user'),
);

export const fetchBookmarks = createAsyncAction(
  types.FETCH_BOOKMARKS,
  user => utils.api(`user/${user.id}/bookmarks`),
);

export const fetchSettings = createAsyncAction(
  types.FETCH_SETTINGS,
  user => utils.api(`user/${user.id}/settings`),
);
