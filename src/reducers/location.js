import { createReducer } from 'redux-action-tools';

import * as types from '../constants/action_types';


export const initialState = {};

const reducer = createReducer()
  .when(types.RESET_LOCATION)
  .done(() => {
    return initialState;
  })

  .when(types.FETCH_LOCATION)
  .done((state, { payload: { data } }) => {
    return data;
  })

  .when(types.ADD_BOOKMARK, state => ({
    ...state,
    isCollected: true,
  }))

  .when(types.REMOVE_BOOKMARK, state => ({
    ...state,
    isCollected: false,
  }))

  .build(initialState);

export default reducer;
