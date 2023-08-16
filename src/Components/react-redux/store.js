import { configureStore } from "@reduxjs/toolkit";
import {showDetailsReducer } from "./reducer";
import {mainDataReducer} from '../reducers/MainData'
import { AddItems } from "../reducers/AddItems";

const combinedReducers={
    showDetailsReducer,
    mainDataReducer,
    AddItems
}

const store=configureStore({
    reducer:combinedReducers
})
export default store