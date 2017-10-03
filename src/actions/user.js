import {
  createAction, createAsyncAction,
} from 'redux-action-tools';

import * as utils from '../utils';
import * as types from '../constants/action_types';


export const logout = createAction(
  types.LOGOUT,
);

export const login = createAsyncAction(
  types.LOGIN,
  () => utils.api('user/login'),
);

export const register = createAsyncAction(
  types.REGISTER,
  () => utils.api('user/register'),
);

export const fetchCurrentUser = createAsyncAction(
  types.FETCH_CURRENT_USER,
  () => utils.api('user/current'),
);

export const fetchBookmarks = createAsyncAction(
  types.FETCH_BOOKMARKS,
  user => utils.api(`user/${user.id}/bookmarks`),
);

export const fetchSettings = createAsyncAction(
  types.FETCH_SETTINGS,
  user => utils.api(`user/${user.id}/settings`),
);

export const changeNotificationSettings = createAsyncAction(
  types.CHANGE_NOTIFICATION_SETTINGS,
  ({ user, key, value }) => utils.api(`user/${user.id}/settings`, {
    key, value,
  }, 'post'),
);
