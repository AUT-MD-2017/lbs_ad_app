import _ from 'lodash';
import { createReducer } from 'redux-action-tools';

import * as types from '../constants/action_types';


export const initialState = {
  bookmarks: [],
  settings: {},
};

const reducer = createReducer()
  .when(types.FETCH_CURRENT_USER)
  .done((state, { payload: { data } }) => ({
    ...state,
    ...data,
  }))

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

  .build(initialState);

export default reducer;
