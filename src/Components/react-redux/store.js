import { configureStore } from "@reduxjs/toolkit";
import {showDetailsReducer } from "./reducer";
import {mainDataReducer} from '../reducers/MainData'
import { AddItems } from "../reducers/AddItems";
import { moreDetailsReducer } from "../reducers/addMore";
import {regisReducer} from "../reducers/regisReducer"
import loginReducer from "../reducers/loginReducer";
import { resetPassword } from "../reducers/resetPassword";

const combinedReducers={
    showDetailsReducer:showDetailsReducer,
    mainDataReducer,
    AddItems:AddItems,
    moreDetailsReducer,
    loginReducer,
    regisReducer,
    resetPassword:resetPassword
}

const store=configureStore({
    reducer:combinedReducers
})
export default store