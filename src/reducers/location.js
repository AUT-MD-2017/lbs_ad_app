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

  .build(initialState);

export default reducer;
