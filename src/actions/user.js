import {
  createAction, createAsyncAction,
} from 'redux-action-tools';

import * as utils from '../utils';
import * as types from '../constants/action_types';


export const setUserToken = createAction(
  types.SET_USER_TOKEN,
  token => token,
);

export const logout = createAction(
  types.LOGOUT,
);

export const login = createAsyncAction(
  types.LOGIN,
  ({ email, password }) => utils.api('user/login', {
    email, password,
  }),
);

export const register = createAsyncAction(
  types.REGISTER,
  ({ email, password }) => utils.api('user/register', {
    email, password,
  }),
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
