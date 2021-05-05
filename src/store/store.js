import { configureStore, current } from '@reduxjs/toolkit';
import notesReducer from '../reducers/notes.reducer';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import rootReducer from '../reducers';
import userReducer from '../reducers/user.reducer';
import alertReducer from '../reducers/alert.reducer';
import { authentication } from '../reducers/authentication.reducer';

const loggerMiddleware = createLogger();


// export const store = createStore(
//     rootReducer,
//     applyMiddleware(
//         thunkMiddleware,
//         loggerMiddleware
//     )
// );

const store = configureStore({
    reducer: {
        user: userReducer,
        notes:notesReducer,
        auth: authentication,
        alerts: alertReducer,
    },


});

export default store;