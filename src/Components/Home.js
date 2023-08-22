import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HeroImageRight } from "../Components/HeroHeader";
import { Carousel } from '@mantine/carousel';
import { useDispatch, useSelector } from "react-redux";
// import { CheckingCom } from "./component/checkingStore";
import { VideoSong } from "./component/video_song";


const Home = () => {
  const [datai, setData] = useState([]);
    const navigate = useNavigate();
  const dispatch=useDispatch()
  const randomNumber = Math.floor(Math.random() * 100);
  const n = randomNumber - 10;
  // console.log(randomNumber);
  const MainStore=useSelector(state=>state)
  console.log('store/20',MainStore)

  useEffect(() => {
    try {
      (async () => {
        const response = await fetch(
          //   "https://academics.newtonschool.co/api/v1/ott/show",
          "https://academics.newtonschool.co/api/v1/ott/show?page=2&limit=10",
          { method: "GET", headers: { projectid: "xybcw190kyb8" } }
        );
        const datas = await response.json();
        // console.log('home/24',datas.data[0].thumbnail);
        setData(datas.data);
        dispatch({type:'FETCH_SHOW_DETAILS_SUCCESS',payload:datas.data})
      })();
    } catch (e) {
      console.log(e);
    }
  }, []);

    const handleVideo = (index) => {
      // navigate('/video')
      console.log("Home/92", datai[index]);
      navigate("/video", {
        state: {
          data: datai[index],
        },
      });
    };
    

  
    return (
        <>
        <Carousel
          maw='100%'
          mx="auto"
          withIndicators
          height={600}
          dragFree
          slideGap="md"
          align="start"
        >
         {datai.map((item,index)=>{
           return <Carousel.Slide key={item._id} onClick={()=>navigate('/detailsmore',{state:{id:item._id}})}><HeroImageRight data={item}/></Carousel.Slide>
         })} 
          {/* <Carousel.Slide>2</Carousel.Slide> */}
          {/* <Carousel.Slide>3</Carousel.Slide> */}
          {/* ...other slides */}
          {/* <ActionDetails/> */}
          {/* <CheckingCom/> */}
        </Carousel>
        {/* <div style={{height:'300px',width:'100%',backgroundColor:'#151515'}}></div> */}
        {/* <VideoSong/> */}
        </>
        

      );
  
};
export default Home;
