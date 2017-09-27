import { createReducer } from 'redux-action-tools';

import * as types from '../constants/action_types';


export const initialState = {
  items: [],
};

const reducer = createReducer()
  .when(types.FETCH_LOCATIONS)
  .done((state, { payload: { data } }) => {
    if (data.page === 1) {
      return {
        ...state,
        ...data,
      };
    }

    return {
      ...state,
      page: data.page,
      perPage: data.perPage,
      total: data.total,
      items: state.items.concat(data.items),
    };
  })

  .build(initialState);

export default reducer;
