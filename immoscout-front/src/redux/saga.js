import { all } from 'redux-saga/effects';

import { apartmentSagas } from '../modules/apartment';

const rootSaga = function* () {
  yield all([
    apartmentSagas()
  ]);
};

export default rootSaga;
