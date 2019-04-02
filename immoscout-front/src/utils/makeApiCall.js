import { call } from 'redux-saga/effects';
import queryString from 'query-string';

import { fetchData } from './fetchData';

const getOptions = (method, body, contentType) => {
  return (
    {
      method,
      mode: 'cors',
      cache: 'default',
      redirect: 'follow',
      headers: {
        'Content-Type': contentType || 'application/json',
        'Accept': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    }
  );
};

// Query string should be passed as an object
export const makeApiCall = function* (originalUrl, method, body, queryObj, contentType) {
  let fullUrl = originalUrl;

  if (queryObj) {
    const { url, query } = queryString.parseUrl(originalUrl);
    fullUrl = `${url}?${queryString.stringify({ ...query, ...queryObj })}`;
  }

  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  const methodUpper = method.toUpperCase();
  if (!allowedMethods.includes(methodUpper)) {
    throw new Error(`${methodUpper} is not allowed`);
  }

  try {
    const options = getOptions(method, body, contentType);
    return yield call(fetchData, fullUrl, options);
  } catch (error) {
    return {
      response: {
        ok: false,
      },
      error,
    };
  }
};