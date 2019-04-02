import { combineReducers } from 'redux';
// import { reducer as form } from 'redux-form';

import apartment from '../modules/apartment';

const reducer = combineReducers({
  apartment,
});

export default reducer;