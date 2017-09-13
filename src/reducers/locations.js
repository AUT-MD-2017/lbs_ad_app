import { createReducer } from 'redux-action-tools';

import * as types from '../constants/action_types';


export const initialState = {
  items: [],
};

const reducer = createReducer()
  .when(types.FETCH_LOCATIONS)
  .done((state, { payload: { data } }) => ({
    ...state,
    ...data,
  }))

  .build(initialState);

export default reducer;
