import { createReducer } from 'redux-action-tools';

import * as types from '../constants/action_types';


export const initialState = {
  current: 'nearby',
};

const reducer = createReducer()
  .when(types.CHANGE_NAVIGATION, (state, { payload }) => ({
    current: payload,
  }))

  .build(initialState);

export default reducer;
