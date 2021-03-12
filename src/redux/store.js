import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import dataReducer from './reducers/data.reducer';
import userReducer from './reducers/user.reducer';
import uiReducer from './reducers/ui.reducer';

const rootReducer = combineReducers({
    data: dataReducer,
    user: userReducer,
    UI: uiReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    {},
    composeEnhancer(applyMiddleware(thunk))
);
export default store;
