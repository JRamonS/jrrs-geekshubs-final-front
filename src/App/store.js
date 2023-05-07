import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';
import userSlice from '../pages/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import detailSlice from '../pages/detailSlice';
import petSlice from '../pages/petSlice';
import appointmentSlice from '../pages/appointmentSlice';

const reducers = combineReducers({
    user: userSlice,
    detail: detailSlice,
    pet: petSlice,
    appointment: appointmentSlice,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});
