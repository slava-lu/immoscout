import { all, call, put, takeEvery, select } from 'redux-saga/effects';

import { getApartmentMetaApi, getApartmentPriceTrendApi } from '../api/api';

const moduleName = 'apartment';

const SELECT_REGION = `${moduleName}/SELECT_REGION`;
const SELECT_ROOM = `${moduleName}/SELECT_ROOM`;

const GET_APARTMENT_META_TRIGGER = `${moduleName}/GET_APARTMENT_META_TRIGGER`;
const GET_APARTMENT_META_REQUEST = `${moduleName}/GET_APARTMENT_META_REQUEST`;
const GET_APARTMENT_META_SUCCESS = `${moduleName}/GET_APARTMENT_META_SUCCESS`;
const GET_APARTMENT_META_FAILURE = `${moduleName}/GET_APARTMENT_META_FAILURE`;

const GET_APARTMENT_PRICE_TREND_TRIGGER = `${moduleName}/GET_APARTMENT_PRICE_TREND_TRIGGER`;
const GET_APARTMENT_PRICE_TREND_REQUEST = `${moduleName}/GET_APARTMENT_PRICE_TREND_REQUEST`;
const GET_APARTMENT_PRICE_TREND_SUCCESS = `${moduleName}/GET_APARTMENT_PRICE_TREND_SUCCESS`;
const GET_APARTMENT_PRICE_TREND_FAILURE = `${moduleName}/GET_APARTMENT_PRICE_TREND_FAILURE`;

const initialState = {
  regions: [],
  regionSelected: 'MUC-15',
  rooms: [],
  roomsSelected: '3.0',
  defaultPage: 'price_trend',
  costStat: [],
  error: {}
};

export default function reducer(state = initialState, action) {
  const { type, error = {}, payload } = action;
  switch (type) {
    case SELECT_REGION:
      return { ...state, ...payload };
    case SELECT_ROOM:
      return { ...state, ...payload };
    case GET_APARTMENT_META_REQUEST:
      return { ...state };
    case GET_APARTMENT_META_SUCCESS:
      return { ...state, ...payload };
    case GET_APARTMENT_META_FAILURE:
      return { ...state, error };

    case GET_APARTMENT_PRICE_TREND_REQUEST:
      return { ...state };
    case GET_APARTMENT_PRICE_TREND_SUCCESS:
      return { ...state, ...payload };
    case GET_APARTMENT_PRICE_TREND_FAILURE:
      return { ...state, error };

    default:
      return state;
  }
}

const regionSelector = state => state.apartment.regionSelected;
const roomSelector = state => state.apartment.roomsSelected;

export const selectRegion = regionSelected => ({
  type: SELECT_REGION,
  payload: { regionSelected }
});

export const selectRoom = roomsSelected => ({
  type: SELECT_ROOM,
  payload: { roomsSelected }
});

export const requestApartmentMeta = () => ({
  type: GET_APARTMENT_META_TRIGGER,
});

export const requestApartmentPriceTrend = () => ({
  type: GET_APARTMENT_PRICE_TREND_TRIGGER,
});

const getApartmentMetaSaga = function* () {
  yield put({ type: GET_APARTMENT_META_REQUEST });
  try {
    const result = yield call(getApartmentMetaApi);
    if (result.response.ok) {
      const { regions, rooms } = result.data;

      yield put({ type: GET_APARTMENT_META_SUCCESS, payload: { regions, rooms } });
    } else {
      const { error } = result;
      yield put({ type: GET_APARTMENT_META_FAILURE, error });
    }
  } catch (error) {
    yield put({ type: GET_APARTMENT_META_FAILURE, error });
  }
};

const getApartmentPriceTrendSaga = function* () {
  yield put({ type: GET_APARTMENT_PRICE_TREND_REQUEST });
  try {
    const region = yield select(regionSelector);
    const room = yield select(roomSelector);
    const result = yield call(getApartmentPriceTrendApi, { region, room });
    if (result.response.ok) {
      const { costStat } = result.data;

      yield put({ type: GET_APARTMENT_PRICE_TREND_SUCCESS, payload: { costStat } });
    } else {
      const { error } = result;
      yield put({ type: GET_APARTMENT_PRICE_TREND_FAILURE, error });
    }
  } catch (error) {
    yield put({ type: GET_APARTMENT_PRICE_TREND_FAILURE, error });
  }
};

export const apartmentSagas = function* () {
  yield all([
    takeEvery(GET_APARTMENT_META_TRIGGER, getApartmentMetaSaga),
    takeEvery(GET_APARTMENT_PRICE_TREND_TRIGGER, getApartmentPriceTrendSaga),
  ]);
};
