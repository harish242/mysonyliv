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
  }

const reducers=combineReducers({
    showDetailsReducer:showDetailsReducer,
    mainDataReducer,
    AddItems:AddItems,
    moreDetailsReducer,
    loginReducer,
    regisReducer,
    resetPassword,
    // localJwtReducer
})


// const store=configureStore({
//     reducer:combinedReducers
// })
const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({ reducer:persistedReducer })
export default store