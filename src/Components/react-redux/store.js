// import { configureStore } from "@reduxjs/toolkit";
// import {showDetailsReducer } from "./reducer";
// import {mainDataReducer} from '../reducers/MainData'
// import { AddItems } from "../reducers/AddItems";
// import { moreDetailsReducer } from "../reducers/addMore";
// import {regisReducer} from "../reducers/regisReducer"
// import loginReducer from "../reducers/loginReducer";
// import { resetPassword } from "../reducers/resetPassword";
// import {combineReducers } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage'
// import { persistReducer } from 'redux-persist'
// import {localJwtReducer} from '../reducers/localjwt'

// const persistConfig = {
//     key: 'root',
//     storage,
//   }

// const reducers=combineReducers({
//     showDetailsReducer:showDetailsReducer,
//     mainDataReducer,
//     AddItems:AddItems,
//     moreDetailsReducer,
//     loginReducer,
//     regisReducer,
//     resetPassword,
//     // localJwtReducer
// })


// // const store=configureStore({
// //     reducer:combinedReducers
// // })
// const persistedReducer = persistReducer(persistConfig, reducers)

// const store = configureStore({ reducer:persistedReducer })
// export default store

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

// import { combineReducers } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { configureStore } from '@reduxjs/toolkit';
// import { resetPassword } from '../reducers/resetPassword';
// import loginReducer from '../reducers/loginReducer';
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

// Other reducers that you don't want to persist can be kept outside of this combined reducer
// For example:
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