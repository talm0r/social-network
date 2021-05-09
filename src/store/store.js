import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../reducers/notes.reducer';
import userReducer from '../reducers/user.reducer';
import alertReducer from '../reducers/alert.reducer';
import authentication from '../reducers/authentication.reducer';



const store = configureStore({
    reducer: {
        user: userReducer,
        notes:notesReducer,
        auth: authentication,
        alerts: alertReducer,
    },
});

export default store;