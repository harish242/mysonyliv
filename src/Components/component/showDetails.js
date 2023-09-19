import React, { useState, useEffect } from "react";
import "../../Styles/showdetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { LiaCrownSolid } from "react-icons/lia";
import { FiCheck } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";
import { Carousel } from "@mantine/carousel";
import { IoIosArrowForward } from "react-icons/io";
import { Card, Image } from "@mantine/core";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import Demo from './matladu'


const Show = () => {
  // ...
  const [detail, setDetail] = useState("");
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();
  const showDetail = useSelector((state) => state.others.mainDataReducer);
  // const showDetails=showDetail?.showdata
  console.log("sD/27", detail);

  const token = useSelector((state) => state.persisted.localJwtReducer.tokens);
  console.log("sd/24", token);

  // let selectedShow=null

  const movie = useSelector((state) => state.persisted.AddItems.movie);
  // selectedShow = movie.find(item => item._id === id);

  const tvshow = useSelector((state) => state.persisted.AddItems.tvshow);
  // const selectedShow = movie.find(item => item._id === id);

  const webseries = useSelector((state) => state.persisted.AddItems.webseries);
  // const selectedShow = movie.find(item => item._id === id);

  const documentary = useSelector(
    (state) => state.persisted.AddItems.documentary
  );
  // const selectedShow = movie.find(item => item._id === id);

  const trailer = useSelector((state) => state.persisted.AddItems.trailer);
  // const selectedShow = movie.find(item => item._id === id);

  const videosong = useSelector((state) => state.persisted.AddItems.videosong);
  // const selectedShow = movie.find(item => item._id === id);

  const shortfilm = useSelector((state) => state.persisted.AddItems.shortfilm);
  // const selectedShow = movie.find(item => item._id === id);
  const manStore = useSelector(
    (state) => state.others.mainDataReducer.showdata
  );

  const showDetails = [
    ...movie,
    ...videosong,
    ...shortfilm,
    ...trailer,
    ...webseries,
    ...documentary,
    ...tvshow,
    ...manStore,
  ];
  const selectedShow = showDetails.find((item) => item._id === id);

  console.log("sd/73", movie);

  // const movie = showDetails?.filter(item => item.type === 'movie');
  // const videoSong = showDetails?.filter(item => item.type === 'video song');
  // const documentry = showDetails?.filter(item => item.type === 'documentary');
  // const tvShow = showDetails?.filter(item => item.type === 'tv show');
  // const shortFilm = showDetails?.filter(item => item.type === 'short film');
  // const trailer = showDetails?.filter(item => item.type === 'trailer');
  // const webSeries = showDetails?.filter(item => item.type === 'web series');
  const dispatch = useDispatch();
  // const [isToggled, setIsToggled] = useState(false);
  const Toggled = useSelector((state) => state.persisted.AddItems);
  const isToggled = Toggled[id];
  const handleAddToWatchlist = async () => {
    // dispatch(addToWatchlist(id));
    // setIsToggled(!isToggled);
    setTimeout(() => {
      if (!isToggled) {
        open();
      }
    }, 500);

    try {
      const response = await axios.patch(
        `https://academics.newtonschool.co/api/v1/social_media/watchlist`,
        { showId: id }, // Pass the showId in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "xybcw190kyb8",
          },
        }
      );
      console.log("sD/58", response);
      if (response.status == 200) {
        dispatch({ type: `TOGGLE_${id}`, payload: !isToggled });
      }
    } catch (err) {
      console.log("my con", err);
      return null;
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/ott/show/${id}`,
          {
            headers: { projectID: "xybcw190kyb8" },
          }
        );
        const datai = await response.json();
        console.log("showD/125", datai);
        const finalD = datai.data;

        setDetail(finalD);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  return (
    <>
    <main className="show-container">
      <div
        className="con"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginTop:'45px'
        }}
      >
        <div className="show-content" >
          <div className="show-header">
            <h1 style={{color:'#f2bc04'}}>{detail?.title}</h1>
            <p className="show-type" style={{color:'#735a19'}}>{detail?.type}</p>
            <p className="show-created-at" style={{color:'#735a19'}}>{detail?.createdAt}</p>
            {detail?.keywords && detail.keywords.length >= 3 && (
              <p className="show-keywords" style={{color:'#735a19'}}>
                {detail.keywords[0]}, {detail.keywords[1]}, {detail.keywords[2]}
              </p>
            )}
          </div>
          <div className="show-description" >
            <p style={{color:'#f2bc04'}}>{detail?.description}</p>
          </div>
          <div className="show-details" style={{color:'#735a19'}}>
            <div className="show-director">
              <span className="show-details-title" style={{color:'#f2bc04'}}>Director:</span>
              <span className="show-details-value" style={{color:'#735a19'}}>{detail?.director}</span>
            </div>
            <div className="show-cast" style={{color:'#f2bc04'}}>
              <span className="show-details-title" style={{color:'#f2bc04'}}>Cast:</span>
              <div className="show-cast-list">
                {detail?.cast?.map((item) => (
                  <span className="show-cast-item" key={item} style={{color:'#735a19'}}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="show-buttons" style={{color:'#f2bc04'}}>
            <button
              className="show-button watch-button"
              onClick={() => {
                navigate(`/video/${id}`, { state: detail });
              }}
            >
              <img
                src="https://images.slivcdn.com/UI_icons/New_Final_Icons_30052020/web_play_icon.png?h=24&w=24&q=high&fr=webp"
                alt="Play Icon"
                className="play-icon"
              />
              Watch Free Preview
            </button>
            <button
              className="show-button list-button"
              onClick={handleAddToWatchlist}
            >
              {isToggled ? (
                <FiCheck className="check-icon" />
              ) : (
                <BsPlusLg className="plus-icon" />
              )}
              My List
            </button>
            <button
              className="show-button subscribe-button"
              onClick={() => navigate("/subscription")}
              style={{marginTop:'10px'}}
            >
              {/* <div className="subscribe-button"> */}
              <div className="subscribe-button-content">
                <LiaCrownSolid className="crown-icon" />
                Subscribe Now
              </div>
              <div className="subscribe-description">
                Stream Live Sports and Ad-Free Originals
              </div>
              {/* </div> */}
            </button>
            {/* <div style={{display:'flex'}}> */}

            {/* </div> */}

            <div className="modal-container">
              <Modal opened={opened} onClose={close} withCloseButton={false}>
                Added To Wishlist
              </Modal>
            </div>
          </div>
        </div>
        <div
          className="show-background-image"
          // style={{
           
          //   // backgroundSize:'cover'
          // }}
        >
          <img src={detail?.thumbnail} />
        </div>
      </div>

      {/* Render carousels for different types of content */}
      
      
    
    </main>
    <div className="carousel-section">
      {detail && detail?.type === "movie" && movie?.length > 0 && (
        <div
          className={`carousel-container`}
          style={{ margin: "0px", padding: "0px", position: "relative" }}
        >
          <h1
       
            className="head"
          >
            Movies
          </h1>
          <Carousel
              withIndicators
              height={250}
              slideSize="15%"
              slideGap="md"
              loop
              align="start"
              slidesToScroll={8}
          >
            {movie &&
              movie?.map((item) => (
                <Carousel.Slide key={item._id}>
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
                          width={178}
                        />
                      </Card.Section>
                    </Card>
                  </div>
                </Carousel.Slide>
              ))}
          </Carousel>
        </div>
      )}
      {detail && detail?.type === "web series" && webseries?.length > 0 && (
        <div
          className={`carousel-container`}
          style={{ padding: "0px", margin: "0px" }}
        >
          <h1
        
            className="head"
          >
            Web Series
          </h1>
          <Carousel
            withIndicators
            height={250}
            slideSize="15%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={8}
          >
            {webseries &&
              webseries?.map((item) => (
                <Carousel.Slide key={item._id}>
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
                          width={178}
                        />
                      </Card.Section>
                    </Card>
                  </div>
                </Carousel.Slide>
              ))}
          </Carousel>
        </div>
      )}
      {detail && detail?.type === "trailer" && trailer?.length > 0 && (
        <div className={`carousel-container`}>
          <h1
        
            className="head"
          >
            Trailer
          </h1>
          <Carousel
            withIndicators
            height={250}
            slideSize="15%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={8}
          >
            {trailer &&
              trailer?.map((item) => (
                <Carousel.Slide key={item._id}>
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
                          width={178}
                        />
                      </Card.Section>
                    </Card>
                  </div>
                </Carousel.Slide>
              ))}
          </Carousel>
        </div>
      )}
      {detail && detail?.type === "short film" && shortfilm?.length > 0 && (
        <div className={`carousel-container`}>
          <h1
         
            className="head"
          >
            Short film
          </h1>
          <Carousel
            withIndicators
            height={250}
            slideSize="15%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={8}
          >
            {shortfilm &&
              shortfilm?.map((item) => (
                <Carousel.Slide key={item._id}>
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
                          width={178}
                        />
                      </Card.Section>
                    </Card>
                  </div>
                </Carousel.Slide>
              ))}
          </Carousel>
        </div>
      )}
      {detail && detail?.type === "tv show" && tvshow?.length > 0 && (
        <div className={`carousel-container`}>
          <h1
         
            className="head"
          >
            Tv Show
          </h1>
          <Carousel
            withIndicators
            height={250}
            slideSize="15%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={8}
          >
            {tvshow &&
              tvshow?.map((item) => (
                <Carousel.Slide key={item._id}>
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
                          width={178}
                        />
                      </Card.Section>
                    </Card>
                  </div>
                </Carousel.Slide>
              ))}
          </Carousel>
        </div>
      )}
      {detail && detail?.type === "documentary" && documentary?.length > 0 && (
        <div className={`carousel-container`}>
          <h1
          
            className="head"
          >
            Documentary
          </h1>
          <Carousel
            withIndicators
            height={250}
            slideSize="15%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={8}
          >
            {documentary &&
              documentary?.map((item) => (
                <Carousel.Slide key={item._id}>
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
                          width={178}
                        />
                      </Card.Section>
                    </Card>
                  </div>
                </Carousel.Slide>
              ))}
          </Carousel>
        </div>
      )}
      {detail && detail?.type === "video song" && videosong?.length > 0 && (
        <div className={`carousel-container`} style={{ background: "black" }}>
          <h1
          
            className="head"
          >
            Video Songs
          </h1>
          <Carousel
            withIndicators
            height={250}
            slideSize="15%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={2}
          >
            {videosong &&
              videosong?.map((item) => (
                <Carousel.Slide key={item._id}>
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
                         width={178}
                        />
                      </Card.Section>
                    </Card>
                  </div>
                </Carousel.Slide>
              ))}
          </Carousel>
        </div>
      )}
      </div>
    </>
  );
};

export default Show;
