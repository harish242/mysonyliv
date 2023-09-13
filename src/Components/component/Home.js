import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HeroImageRight } from "./HeroHeader";
import { Carousel } from "@mantine/carousel";
import { useDispatch, useSelector } from "react-redux";
import '../../Styles/home.css'
import { Card, Image, Text } from "@mantine/core";
import store from "../react-redux/store";

const Home = () => {
  const [datai, setData] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const manStore = useSelector((state) => state.others.mainDataReducer.showdata);
  // const movie=useSelector
  const movie=useSelector(state=>state.persisted.AddItems.movie)
  // selectedShow = movie.find(item => item._id === id);


const tvshow=useSelector(state=>state.persisted.AddItems.tvshow)
// const selectedShow = movie.find(item => item._id === id);



const webseries=useSelector(state=>state.persisted.AddItems.webseries)
// const selectedShow = movie.find(item => item._id === id);



const documentary=useSelector(state=>state.persisted.AddItems.documentary)
// const selectedShow = movie.find(item => item._id === id);


const trailer=useSelector(state=>state.persisted.AddItems.trailer)
// const selectedShow = movie.find(item => item._id === id);



const videosong=useSelector(state=>state.persisted.AddItems.videosong)
// const selectedShow = movie.find(item => item._id === id);



const shortfilm=useSelector(state=>state.persisted.AddItems.shortfilm)
// const selectedShow = movie.find(item => item._id === id);
// const manStore=useSelector(state=>state.others.mainDataReducer.showdata)
  const str=useSelector(state=>state)
  console.log('home/16',str)
  console.log('home/15',manStore)

  useEffect(() => {
    try {
      (async () => {
        const response = await fetch(
          "https://academics.newtonschool.co/api/v1/ott/show?page=2&limit=10",
          { method: "GET", headers: { projectid: "xybcw190kyb8" } }
        );
        const datas = await response.json();
        setData(datas.data);
        dispatch({ type: "FETCH_SHOW_DETAILS_SUCCESS", payload: datas.data });
      })();
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  const handleVideo = (index) => {
    navigate("/video", {
      state: {
        data: datai[index],
      },
    });
  };

  return (
    <>
   <div className="main-container">

      <Carousel
        maw="100%"
        mx="auto"
        withIndicators
        height={600}
        dragFree
        slideGap="md"
        align="start"
      >
        {movie && movie.map((item, index) => (
          <Carousel.Slide key={item._id}>
            <HeroImageRight data={item} navigate={navigate} />
          </Carousel.Slide>
        ))}
      </Carousel>

      <div className="carousel-section">
        <CarouselSection title="Movies" items={movie} navigate={navigate} />
        <CarouselSection title="Web Series" items={webseries} navigate={navigate} />
        <CarouselSection title="Documentary" items={documentary} navigate={navigate} />
        <CarouselSection title="Trailer" items={trailer} navigate={navigate} />
        <CarouselSection title="Video Song" items={videosong} navigate={navigate} />
        <CarouselSection title="Short Film" items={shortfilm} navigate={navigate} />
        <CarouselSection title="TV Shows" items={tvshow} navigate={navigate} />
      </div>
      </div>
    </>
    
  );
};

const CarouselSection = ({ title, items, navigate }) => {
  console.log('home/76',items)
  return (
    <div className={`carousel-container`}>
      <h1 style={{color:'white',paddingLeft:'15px',paddingBottom:'5px'}}>{title}</h1>
    <Carousel
      withIndicators
      height={250}
      slideSize="15%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={8}
    >
      {items && items.map((item) => (
        <Carousel.Slide key={item._id}>
          {/* Wrap the Card component with a div */}
          <div className="hover-card">
            
            <Card
              shadow="sm"
              padding="xl"
              component="a"
              key={item._id}
              onClick={() => navigate(`/showdetails/${item._id}`)}
            >
              <Card.Section>
                <Image
                  src={item.thumbnail}
                  height={235}
                  alt="No way!"
                  width='100%'
                />
              </Card.Section>
            </Card>
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  
  </div>
  );
};

export default Home;
