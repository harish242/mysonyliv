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
  const jwt=useSelector(state=>state.persisted.localJwtReducer.tokens)
  const miniStore = useSelector(
    (state) => state.showDetailsReducer
  );
  const manStore = useSelector((state) => state.others.mainDataReducer.showdata);
  var AllStore = useSelector((state) => state.persisted.AddItems.movie);
  console.log('home/25',manStore)

//   const movie=useSelector(state=>state.persisted.AddItems.movie)
//   // selectedShow = movie.find(item => item._id === id);
 const movie=manStore?.filter(item=>item.type==='movie')
 const trailer=manStore?.filter(item=>item.type==='trailer')
 const webseries=manStore?.filter(item=>item.type==='web series')
 const videosong=manStore?.filter(item=>item.type==='video song')
 const tvshow=manStore?.filter(item=>item.type==='tv show')
 const shortfilm=manStore?.filter(item=>item.type==='short film')
 const documentary=manStore?.filter(item=>item.type==='documentary')
 

 console.log('Home/37',movie)

// const tvshow=useSelector(state=>state.persisted.AddItems.movie)
// // const selectedShow = movie.find(item => item._id === id);



// const webseries=useSelector(state=>state.persisted.AddItems.webseries)
// // const selectedShow = movie.find(item => item._id === id);



// const documentary=useSelector(state=>state.persisted.AddItems.documentary)
// // const selectedShow = movie.find(item => item._id === id);


// const trailer=useSelector(state=>state.persisted.AddItems.trailer)
// // const selectedShow = movie.find(item => item._id === id);



// const videosong=useSelector(state=>state.persisted.AddItems.videosong)
// // const selectedShow = movie.find(item => item._id === id);



// const shortfilm=useSelector(state=>state.persisted.AddItems.shortfilm)

// const userdetails=useSelector(state=>state.persisted.AddItems.userdetails)
// console.log('Home/58',userdetails)

  
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
  // useEffect(()=>{
  //   try{
  //     (async()=>{
  //          const response=await fetch('https://academics.newtonschool.co/api/v1/user/updateProfileImage',{
  //           method:"PATCH",body:{"profileImage":file.png},headers:{'Authorization':`Bearer ${jwt}` }
  //          })
  //     })()
  //   }catch(err){
  //     console.log("home95",err)
  //   }
  // })
 

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
        {manStore&&manStore.map((item, index) => {
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
          {movie&&
            movie.map((item) => {
              return (
                <Carousel.Slide >
               
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
          {webseries &&
           webseries.map((item) => {
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
          {documentary &&
            documentary.map((item) => {
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
          {trailer &&
            trailer.map((item) => {
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
        <h1>VideoSong</h1>
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
          {videosong &&
            videosong.map((item) => {
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
          {shortfilm &&
            shortfilm.map((item) => {
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
          {tvshow &&
            tvshow.map((item) => {
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
