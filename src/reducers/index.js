import { combineReducers } from 'redux';
import searchReducer from './search';
import resultsReducer from './results';

const rootReducer = combineReducers({
    searchReducer,
    resultsReducer
});

export default rootReducer;
