/* eslint-disable */
import axios, { AxiosError } from 'axios';
import { camelizeKeys } from 'humps';
import qs from 'qs';

const GLOBAL_TIMEOUT = 5000;

const config = {
  baseURL: '/',
  timeout: GLOBAL_TIMEOUT,
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
    put: {
      'Content-Type': 'application/json',
    },
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: false }),
};

const fetch = axios.create(config);

fetch.interceptors.request.use(
  (config) => {
    if (config.params) {
      validateParameters(config.params);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const isJSONResponse = (headers) =>
  headers['content-type'] &&
  headers['content-type'].includes('application/json');

const handleErrorStatus = (status: number, data) => {
  const errorMessages: { [key: number]: string } = {
    400: data,
    401: 'unauthorised',
    404: '/not-found',
    500: '/server error',
  };
  console.error(errorMessages[status] || 'Unknown error');
};

fetch.interceptors.response.use(
  (response) => {
    if (isJSONResponse(response.headers)) {
      response.data = camelizeKeys(response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { data, status } = error.response;
      if (data) {
        error.response.data = camelizeKeys(data);
      }
      handleErrorStatus(status, data);
    }
    return Promise.reject(error);
  },
);

export { fetch };

const validateParameters = (params) => {
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') {
      if (isEmptyOrWhitespace(value)) {
        delete params[key];
      } else {
        params[key] = value.trim();
      }
    }
  }
};
const isEmptyOrWhitespace = (str: string): boolean =>
  !str || !str.trim().length;
