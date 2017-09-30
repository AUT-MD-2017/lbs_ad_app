import { createReducer } from 'redux-action-tools';

import * as types from '../constants/action_types';


export const initialState = {};

const reducer = createReducer()
  .when(types.FETCH_CURRENT_USER)
  .done((state, { payload: { data } }) => data)

  .build(initialState);

export default reducer;
