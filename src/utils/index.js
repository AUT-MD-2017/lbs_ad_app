import axios from 'axios';

const { API_ADDRESS } = require('../constants');


export const api = (
  name, params = {}, method = 'get',
) => axios[method](`${API_ADDRESS}${name}`, {
  params,
});
