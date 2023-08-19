import React,{useEffect} from "react";
import { MantineProvider, Text } from "@mantine/core";
import Home from "../src/Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from './Components/Layout'
import { VideoDetails } from "./Components/VideoDetails";
import { Subscription } from "./Components/Subscription";
import ActionDetails from '../src/Components/react-redux/action'
import { CheckingCom } from "./Components/component/checkingStore";
import AddedItems from "./Components/component/addedItemDetails";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch=useDispatch()
  useEffect(() => {
    try {
      (async () => {
        const response = await fetch(
            "https://academics.newtonschool.co/api/v1/ott/show",
          { method: "GET", headers: { projectid: "xybcw190kyb8" } }
        );
        const datas = await response.json();
       
        dispatch({type:'SUCCESS',payload:datas.data})

      })();
    } catch (e) {
      console.log(e);
    }
  },[]);
  return (
   
       <BrowserRouter>
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <Routes>
      <Route path="/" element={<LayOut><Home/></LayOut>}/>
      <Route path='/video' element={<LayOut><VideoDetails /></LayOut>}/>
      <Route path='/subscription' element={<LayOut><Subscription/></LayOut>}/>
      <Route path='/data' element={<LayOut><ActionDetails/></LayOut>}/>
      <Route path='/check' element={<LayOut><CheckingCom/></LayOut>}/>
      <Route path='additem' element={<LayOut><AddedItems/></LayOut>}/>
    </Routes>     
    </MantineProvider>
    </BrowserRouter>
   
  );
}
