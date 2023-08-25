import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HeroImageRight } from "./HeroHeader";
import { Carousel } from "@mantine/carousel";
import { useDispatch, useSelector } from "react-redux";
import '../../Styles/home.css'
import { Card, Image, Text } from "@mantine/core";
import store from "../react-redux/store";

const Home = () => {
  const [datai, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const randomNumber = Math.floor(Math.random() * 100);
  const n = randomNumber - 10;
  // console.log(randomNumber);
  const store = useSelector((state) => state);
  console.log("store/20", store);
  const miniStore = useSelector(
    (state) => state.showDetailsReducer
  );
  const manStore = useSelector((state) => state.mainDataReducer);
  var AllStore = useSelector((state) => state.others.mainDataReducer.showdata);

  
  // console.log("Home/23", AllStore);
  // console.log("Home/22", miniStore);

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
        dispatch({ type: "FETCH_SHOW_DETAILS_SUCCESS", payload: datas.data });
      })();
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  const handleVideo = (index) => {
    // navigate('/video')
    // console.log("Home/92", datai[index]);
    navigate("/video", {
      state: {
        data: datai[index],
      },
    });
  };
  // if(store){
  //   const reduFunc=store.mainDataReducer.showdata.reduce((acc,curr)=>{
  //     const found=acc.find(item=>item.type===curr.type)
  //     if(!found){
  //       acc.push(curr)
  //     }
  //     return acc
  //   },[])
  //   console.log('Home/56',reduFunc)
  // }
  if (AllStore) {
    var moviesData = AllStore.reduce((acc, curr) => {
      if (curr.type === "movie") {
        acc.push(curr);
      }
      return acc;
    }, []);
    // console.log("Home/chec/71", moviesData);
  }
  if (AllStore) {
    var webSeriesData = AllStore.reduce((acc, curr) => {
      if (curr.type === "web series") {
        acc.push(curr);
      }
      return acc;
    }, []);
    // console.log("Home/wbS", webSeriesData);
  }
  const documentaryDetails =
    AllStore && AllStore.filter((item) => item.type === "documentary");
  // console.log("Home/doc/82", documentaryDetails);
  if(AllStore){
  var videoSongDetails=AllStore.reduce((acc,curr)=>{
          if(curr.type==="video song"){
            acc.push(curr)
          }
          return acc
  },[])
  // console.log('Home/vsD/91',videoSongDetails)

  }
  if(AllStore){
    var trailerDetails=AllStore.reduce((acc,curr)=>{
      if(curr.type==="trailer"){
        acc.push(curr)
      }
      return acc
    },[])
  }
  if(AllStore){
    var shortFlimData=AllStore.reduce((acc,curr)=>{
      if(curr.type==='short film'){
        acc.push(curr)
      }
      return acc
    },[])
  }
  if(AllStore){
    var tvData=AllStore.reduce((acc,curr)=>{
      if(curr.type==='tv show'){
        acc.push(curr)
      }
      return acc
    },[])
  }

  return (
    <>
      <Carousel
        maw="100%"
        mx="auto"
        withIndicators
        height={600}
        dragFree
        slideGap="md"
        align="start"
      >
        {datai.map((item, index) => {
          return (
            <Carousel.Slide key={item._id}>
              <HeroImageRight data={item} />
            </Carousel.Slide>
          );
        })}
        {/* <Carousel.Slide>2</Carousel.Slide> */}
        {/* <Carousel.Slide>3</Carousel.Slide> */}
        {/* ...other slides */}
        {/* <ActionDetails/> */}
        {/* <CheckingCom/> */}
      </Carousel>
      <div style={{backgroundColor:'black',overflow:'hidden',paddingLeft:'60px'}}>
      <div
        style={{
          
          backgroundColor: "#151515",
          color: "white",
          
        }}

      >
        <h1>Movies </h1>
        <Carousel
          
          height={250}
          slideSize="10%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={6}
          
         
        >
          {moviesData &&
            moviesData.map((item) => {
              return (
                <Carousel.Slide >
                  {/* <div className="card" onClick={()=>navigate(`/showdetails/${item._id}`)}>
                  <img src={item.thumbnail} className="card-image"/>

                  </div> */}
                    <Card
              shadow="sm"
              padding="xl"
              component="a"
              
              // href={item.video_url}
              // target="_self"
              key={item._id}
              onClick={()=>navigate(`/showdetails/${item._id}`)}
            >
              <Card.Section>
                <Image
                  src={item.thumbnail}
                  height={235}
                  alt="No way!"
                  width={160}
                />
              </Card.Section>
    
              {/* <Text weight={500} size="sm" mt="md">
                {item.title?.slice(0, 25)}
              </Text>           */}
            </Card>
                </Carousel.Slide>
              );
            })}
        </Carousel>
      </div>
      <div
        style={{
          height: "350px",
          width: "100%",
          backgroundColor: "#151515",
          color: "white",
        }}
      >
        <h1>Web Series</h1>
        <Carousel
          withIndicators
          height={250}
          // slideSize="33.333333%"
          slideSize="15%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={8}
        >
          {webSeriesData &&
            webSeriesData.map((item) => {
              return (
                <Carousel.Slide>
                  <div className="card" onClick={()=>navigate(`/showdetails/${item._id}`)}>
                  <img className='card-image' src={item.thumbnail} />

                  </div>
                </Carousel.Slide>
              );
            })}
        </Carousel>
      </div>
      <div
        style={{
          height: "350px",
          width: "100%",
          backgroundColor: "#151515",
          color: "white",
        }}
      >
        <h1>Documentary</h1>
        <Carousel
          withIndicators
          height={250}
          // slideSize="33.333333%"
          slideSize="15%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={8}
        >
          {documentaryDetails &&
            documentaryDetails.map((item) => {
              return (
                <Carousel.Slide>
                  <div className='card' onClick={()=>navigate(`/showdetails/${item._id}`)}>
                  <img className='card-image' src={item.thumbnail} />

                  </div>
                </Carousel.Slide>
              );
            })}
        </Carousel>
      </div>
      <div
        style={{
          height: "350px",
          width: "100%",
          backgroundColor: "#151515",
          color: "white",
        }}
      >
        <h1>Trailer</h1>
        <Carousel
          withIndicators
          height={250}
          // slideSize="33.333333%"
          slideSize="15%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={8}
        >
          {trailerDetails &&
            trailerDetails.map((item) => {
              return (
                <Carousel.Slide>
                  <div className='card' onClick={()=>navigate(`/showdetails/${item._id}`)}>
                  <img className='card-image' src={item.thumbnail} />

                  </div>
                </Carousel.Slide>
              );
            })}
        </Carousel>
      </div>
      <div
        style={{
          height: "350px",
          width: "100%",
          backgroundColor: "#151515",
          color: "white",
        }}
      >
        <h1>videoSongDetails</h1>
        <Carousel
          withIndicators
          height={250}
          // slideSize="33.333333%"
          slideSize="15%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={8}
        >
          {videoSongDetails &&
            videoSongDetails.map((item) => {
              return (
                <Carousel.Slide>
                  <div className="card" onClick={()=>navigate(`/showdetails/${item._id}`)}>
                  <img className="card-image"src={item.thumbnail} />

                  </div>
                </Carousel.Slide>
              );
            })}
        </Carousel>
      </div>
      <div
        style={{
          height: "350px",
          width: "100%",
          backgroundColor: "#151515",
          color: "white",
        }}
      >
        <h1>Short film</h1>
        <Carousel
          withIndicators
          height={250}
          // slideSize="33.333333%"
          slideSize="15%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={8}
        >
          {shortFlimData &&
            shortFlimData.map((item) => {
              return (
                <Carousel.Slide>
                  <div className="card" onClick={()=>navigate(`/showdetails/${item._id}`)}>
                  <img className="card-image" src={item.thumbnail} />

                  </div>
                </Carousel.Slide>
              );
            })}
        </Carousel>
      </div>
      <div
        style={{
          height: "350px",
          width: "100%",
          backgroundColor: "#151515",
          color: "white",
        }}
      >
        <h1>Tv shows</h1>
        <Carousel
          withIndicators
          height={250}
          // slideSize="33.333333%"
          slideSize="15%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={8}
        >
          {tvData &&
            tvData.map((item) => {
              return (
                <Carousel.Slide>
                  <div className="card" onClick={()=>navigate(`/showdetails/${item._id}`)}>
                  <img className="card-image" src={item.thumbnail} />
                  
                  </div>
                </Carousel.Slide>
              );
            })}
        </Carousel>
      </div>
      </div>
    </>
  );
};
export default Home;
