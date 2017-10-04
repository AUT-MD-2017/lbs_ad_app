import _ from 'lodash';
import { createReducer } from 'redux-action-tools';

import * as types from '../constants/action_types';


export const initialState = {
  bookmarks: [],
  settings: {},
};

const normalHandler = (state, { payload: { data } }) => ({
  ...state,
  ...data,
});

const reducer = createReducer()
  .when(types.SET_USER_TOKEN, (state, { payload }) => {
    return {
      ...state,
      token: payload,
    };
  })

  .when(types.LOGOUT, () => {
    return initialState;
  })

  .when(types.LOGIN)
  .done(normalHandler)

  .when(types.REGISTER)
  .done(normalHandler)

  .when(types.FETCH_CURRENT_USER)
  .done(normalHandler)

  .when(types.FETCH_CURRENT_USER)
  .done(normalHandler)

  .when(types.FETCH_BOOKMARKS)
  .done((state, { payload: { data } }) => ({
    ...state,
    bookmarks: data.data,
  }))

  .when(types.FETCH_SETTINGS)
  .done((state, { payload: { data } }) => {
    return _.merge({}, state, {
      settings: data,
    });
  })

  .when(types.CHANGE_NOTIFICATION_SETTINGS, (state, { payload: {
    key, value,
  } }) => {
    const newState = _.cloneDeep(state);
    newState.settings.notification[key] = value;
    return newState;
  })

  .build(initialState);

export default reducer;
