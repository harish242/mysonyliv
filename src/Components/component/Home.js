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
      <Carousel
        maw="100%"
        mx="auto"
        withIndicators
        height={600}
        dragFree
        slideGap="md"
        align="start"
      >
        {manStore && manStore.map((item, index) => (
          <Carousel.Slide key={item._id}>
            <HeroImageRight data={item} navigate={navigate} />
          </Carousel.Slide>
        ))}
      </Carousel>

      <div className="carousel-section">
        <CarouselSection title="Movies" items={manStore?.filter(item => item.type === 'movie')} navigate={navigate} />
        <CarouselSection title="Web Series" items={manStore?.filter(item => item.type === 'web series')} navigate={navigate} />
        <CarouselSection title="Documentary" items={manStore?.filter(item => item.type === 'documentary')} navigate={navigate} />
        <CarouselSection title="Trailer" items={manStore?.filter(item => item.type === 'trailer')} navigate={navigate} />
        <CarouselSection title="Video Song" items={manStore?.filter(item => item.type === 'video song')} navigate={navigate} />
        <CarouselSection title="Short Film" items={manStore?.filter(item => item.type === 'short film')} navigate={navigate} />
        <CarouselSection title="TV Shows" items={manStore?.filter(item => item.type === 'tv show')} navigate={navigate} />
      </div>
    </>
  );
};

const CarouselSection = ({ title, items, navigate }) => {
  return (
    <div className="carousel-container">
      <h1>{title}</h1>
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
                  width={160}
                />
              </Card.Section>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
