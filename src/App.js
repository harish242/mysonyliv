import React from "react";
import { MantineProvider, Text } from "@mantine/core";
import Home from "../src/Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from './Components/Layout'
import { VideoDetails } from "./Components/VideoDetails";
import { Subscription } from "./Components/Subscription";
import { Provider } from "react-redux";
import ActionDetails from '../src/Components/react-redux/action'
import store from '../src/Components/react-redux/store'
import { CheckingCom } from "./Components/component/checkingStore";

export default function App() {
  return (
    <Provider store={store}>
       <BrowserRouter>
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <Routes>
      <Route path="/" element={<LayOut><Home/></LayOut>}/>
      <Route path='/video' element={<LayOut><VideoDetails /></LayOut>}/>
      <Route path='/subscription' element={<LayOut><Subscription/></LayOut>}/>
      <Route path='/data' element={<LayOut><ActionDetails/></LayOut>}/>
      <Route path='/check' element={<LayOut><CheckingCom/></LayOut>}/>
    </Routes>     
    </MantineProvider>
    </BrowserRouter>
    </Provider>
   
  );
}
