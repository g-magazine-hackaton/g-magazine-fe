/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-promise-executor-return */
import { dequal } from 'dequal';
import { fetch, RequestInit } from 'undici';

const lru = new Map();
const requestingPromises = new Map();

type RequestApiResponse<T> = Promise<T | Record<string, unknown> | void>;

const requestApi = <T>({
  method = 'GET',
  url,
  headers = { 'Content-Type': 'application/json' },
  data,
  params,
  cacheSeconds = 0,
}: {
  method?: string;
  url: string;
  headers?: RequestInit['headers'];
  data?: Record<string, unknown> | Array<Record<string, unknown>>;
  params?: Record<string, unknown>;
  cacheSeconds?: number;
}): RequestApiResponse<T> => {
  const controller = new AbortController();
  const queryString = Object.entries(params || {})
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
  const body = JSON.stringify(data);
  const requestKey = [method, url, JSON.stringify(headers), body].join(':');
  let isPromiseCacheTarget = true;

  const requestingPromise = requestingPromises.get(requestKey);
  if (requestingPromise) return requestingPromise;

  const request = new Promise((resolve) => {
    const cachedData = lru.get(requestKey);

    // cached data returned
    if (cachedData && cachedData.expires && Date.now() <= cachedData.expires) {
      isPromiseCacheTarget = false;
      return resolve(cachedData.response);
    }

    let isFetched = false;
    if (cacheSeconds) {
      setTimeout(() => {
        if (isFetched || !cachedData) return;
        isPromiseCacheTarget = false;
        return resolve(cachedData.response);
      }, 1000);
    }

    // timeout
    const timeout = 5000;
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
    timeoutId?.unref?.();

    // request
    fetch(`${url}${params ? `?${queryString}` : ''}`, {
      method,
      body,
      headers,
      signal: controller.signal,
    })
      .then((res) => res.json().catch(() => null))
      .then((response) => {
        if (response && cacheSeconds) {
          isFetched = true;
          const expires = Date.now() + cacheSeconds * 1000;
          if (cachedData && dequal(cachedData.response, response)) {
            cachedData.expires = expires;
          } else {
            lru.set(requestKey, {
              response,
              expires,
            });
          }
        }

        return resolve(response);
      })
      .catch((err) => {
        console.error(`API Error: [${method}, ${url}]`, err);

        if (cachedData) return resolve(cachedData.response);
        return resolve(null);
      })
      .finally(() => {
        clearTimeout(timeoutId);
        requestingPromises.delete(requestKey);
      });
  });

  if (isPromiseCacheTarget) requestingPromises.set(requestKey, request);

  return request as RequestApiResponse<T>;
};

export default requestApi;
