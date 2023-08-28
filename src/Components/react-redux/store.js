

import { configureStore } from "@reduxjs/toolkit";
import {showDetailsReducer } from "./reducer";
import {mainDataReducer} from '../reducers/MainData'
import { AddItems } from "../reducers/AddItems";
import { moreDetailsReducer } from "../reducers/addMore";
import {regisReducer} from "../reducers/regisReducer"
import loginReducer from "../reducers/loginReducer";
import { resetPassword } from "../reducers/resetPassword";
import {combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import {localJwtReducer} from '../reducers/localjwt'


const persistConfig = {
  key: 'root',
  storage,
};

// Include only the reducers you want to persist
const selectedReducers = combineReducers({
  resetPassword,
  // loginReducer,
  localJwtReducer,
  AddItems,

});

const persistedReducer = persistReducer(persistConfig, selectedReducers);


const otherReducers = combineReducers({
  showDetailsReducer,
  mainDataReducer,
  moreDetailsReducer,
  regisReducer,
  loginReducer,
  // ... other reducers
});

const rootReducer = combineReducers({
  persisted: persistedReducer,
  others: otherReducers,
});

const store = configureStore({ reducer: rootReducer });

export default store;