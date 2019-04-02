import { makeApiCall } from '../utils/makeApiCall';
import { API_BASE_URL } from '../config/consts';

// makeApiCall( url, method, body, queryObj, contentType)

export const getApartmentMetaApi = () => makeApiCall(`${API_BASE_URL}/meta`, 'GET');
export const getApartmentPriceTrendApi = queryObj => makeApiCall(`${API_BASE_URL}/cost-trend`, 'GET', null, queryObj);