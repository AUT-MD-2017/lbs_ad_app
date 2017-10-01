import { createReducer } from 'redux-action-tools';

import * as types from '../constants/action_types';


export const initialState = {};

const reducer = createReducer()
  .when(types.FETCH_CURRENT_USER)
  .done((state, { payload: { data } }) => ({
    ...state,
    ...data,
  }))

  .when(types.FETCH_BOOKMARKS)
  .done((state, { payload: { data } }) => ({
    ...state,
    bookmarks: data,
  }))

  .build(initialState);

export default reducer;
