import React,{useEffect,useState} from "react";
import { MantineProvider, Text } from "@mantine/core";
import Home from "./Components/component/Home";
import { BrowserRouter, Routes, Route, useLocation,useNavigate,Navigate } from "react-router-dom";
import LayOut from './Components/component/Layout'
import { VideoDetails } from "./Components/component/VideoDetails";
import { Subscription } from "./Components/component/Subscription";
import ActionDetails from '../src/Components/react-redux/action'
import { CheckingCom } from "./Components/component/checkingStore";
import AddedItems from "./Components/component/addedItems";
import { Regis } from "./Components/component/Registration";
import  Login from "./Components/component/login";
import { MoreDetails } from "./Components/component/MoreDetails";
import { useDispatch, useSelector } from "react-redux";
import ResetPassword from "./Components/component/resetPassword";
import Show from '../src/Components/component/showDetails'
import Accordions from "./Components/otherComfol/accodrian";
import { LogOut } from "./Components/component/logout";
import axios from 'axios';
// import { useHistory } from "react-router-dom";


export default function App() {
  let pathName=window.location.href
  const dispatch=useDispatch()
  // const history = useHistory();
  const token=useSelector(state=>state.persisted.localJwtReducer.tokens)

  const categories = [
    { name: "Movie", type: "movie", class: "class_movie" },
    { name: "Video Song", type: "video song", class: "class_video_song" },
    { name: "Web Series", type: "web series", class: "class_web_series" },
    { name: "Documentary", type: "documentary", class: "class_documentry" },
    { name: "TV Show", type: "tv show", class: "class_tv_show" },
    { name: "Trailer", type: "trailer", class: "class_trailer" },
    { name: "Short Film", type: "short film", class: "class_short_film" },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0].type);

  useEffect(() => {
    const fetchData = async () => {
      for(let i=0;i<categories.length;i++){
        const showId=categories[i].type
        try {
          const response = await axios.get(
            `https://academics.newtonschool.co/api/v1/ott/show?filter={"type" : "${showId}"}`,
            {
              headers: {
                projectId: "sjp136jp4txm",
              },
            }
          );
          console.log('App/49',response)
          dispatch({ type: showId, payload: response.data.data });

        }catch(err){
          console.log(err)
        }
        // fetchData()
      }
    
    }
    fetchData()
    
  },[])
  useEffect(() => {
    try {
      (async () => {
        const response = await fetch(
            "https://academics.newtonschool.co/api/v1/ott/show",
          { method: "GET", headers: { projectid: "xybcw190kyb8" } }
        );
        const datas = await response.json();
       
        dispatch({type:'SUCCESS',payload:datas.data})
        console.log('App/69',datas.data)

      })();
    } catch (e) {
      console.log(e);
    }
  },[]);

  return (
   
       <BrowserRouter>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ primaryShade: 0 }}>
    <Routes>
    <Route path='/' element={<Regis/>}/>
      <Route path='/login' element={<Login/>}/>

      {token ? (
                        <>
                           
                            {/* Add more protected routes here */}
                            <Route path="/home" element={<LayOut><Home/></LayOut>}/>
      <Route path='/video/:id' element={<LayOut><VideoDetails /></LayOut>}/>
      <Route path='/subscription' element={<LayOut><Subscription/></LayOut>}/>
      <Route path='/data' element={<LayOut><ActionDetails/></LayOut>}/>
      <Route path='/check' element={<LayOut><CheckingCom/></LayOut>}/>
      <Route path='additem' element={<LayOut><AddedItems/></LayOut>}/>
     
      <Route path='/detailsmore' element={<LayOut><MoreDetails/></LayOut>}/>
      <Route path='/resetpass' element={<ResetPassword/>}/>
      <Route path='/showdetails/:id' element={<LayOut><Show/></LayOut>}/>
      <Route path='/accod' element={<Accordions/>}/>
      <Route path='/logout' element={<LogOut/>}/>
                        </>
                    ) : (
<Route path="/*" element={<Navigate to="/login" />} />
                        
                    )}

    </Routes>     
    </MantineProvider>
    </BrowserRouter>
   
  );
}
