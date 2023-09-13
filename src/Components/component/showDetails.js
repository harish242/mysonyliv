import React, { useState,useEffect } from "react";
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

const Show = () => {
  const [detail,setDetail]=useState('')
  const { id } = useParams();
  const navigate = useNavigate();
  const showDetail = useSelector((state) => state.others.mainDataReducer);
  // const showDetails=showDetail?.showdata
  // console.log('sD/24',showDetails)

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
  console.log("sd/62", movie);

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
  useEffect(()=>{
    (async()=>{
     try{
      const response=await fetch(`https://academics.newtonschool.co/api/v1/ott/show/${id}`,{
        headers:{projectID:'xybcw190kyb8'}
      })
      const datai=await response.json()
      console.log('showD/107',datai)
      const finalD=datai.data

      setDetail(finalD)
     }catch(err){
      console.log(err)
     }
    })()
  },[id])

  return (
    <main style={{ backgroundColor: "black" }}>
      <div className="show_container"   style={{
                backgroundImage: `url(${detail?.thumbnail})`,
                backgroundSize: "cover",
                height: "90vh",
                margin: "0px",
                padding: "0px",

              }}>
        <div style={{ width: "100%", height: "90%" }}>
          <div className="show_body_container" style={{ width: "100%" }}>
            <div
              className="show_main_image"
            
            >
              <div className="show_body_text">
                <h1
                  style={{
                    color: "#d9be39",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  {detail?.title}
                </h1>
                <div className="show_body_text_p1">
                  <p
                    style={{
                      color: "#d9be39",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    {detail?.type}
                  </p>
                  <span className="dot"></span>
                  <p style={{ color: "#d9be39" }}>{detail?.createdAt}</p>
                  <span className="dot"></span>
                  {detail?.keywords && detail.keywords.length >= 3 && (
    <p style={{ color: "#d9be39", fontWeight: "bold" }}>
      {detail.keywords[0]}, {detail.keywords[1]}, {detail.keywords[2]}
    </p>
  )}
                </div>
                <div className="show_body_text_description">
                  <p style={{ color: "#d9be39", fontWeight: "bold" }}>
                    {detail?.description}
                  </p>
                </div>
                <div className="show_body_text_p2">
                  <span
                    className="show_body_text_p2_1"
                    style={{
                      color: "#d9be39",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    Director:
                  </span>
                  <span
                    className="show_body_text_p2_2"
                    style={{
                      color: "#d9be39",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    {detail?.director}
                  </span>
                </div>
                <div className="show_body_text_p2">
                  <span
                    className="show_body_text_p2_1"
                    style={{
                      color: "#d9be39",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Cast:
                    {detail?.cast?.map((item) => (
                      <span>{item}</span>
                    ))}
                  </span>
                </div>
              </div>
              <div
                className="show_body_button"
                style={{ fontWeight: "bold",position:'relative',top:'10px' }}
              >
                <div>
                  <button
                    className="show_body_watch"
                    onClick={() => {
                      console.log("Button clicked");
                      navigate(`/video/${id}`,{state:detail});
                    }}
                  >
                    <span className="show_body_watch_image">
                      <img
                        src="https://images.slivcdn.com/UI_icons/New_Final_Icons_30052020/web_play_icon.png?h=24&w=24&q=high&fr=webp"
                        alt="Play Icon"
                      />
                    </span>
                    <span className="show_body_watch_text">
                      Watch Free Preview
                    </span>
                  </button>
                  <button
                    className="show_body_subscribe"
                    style={{
                      marginTop: "20px",
                      position: "relative",
                      left: "-2px",
                    }}
                  >
                    <div
                      className="show_body_subscribe_div1"
                      onClick={() => navigate("/subscription")}
                    >
                      <span>
                        <LiaCrownSolid
                          style={{ width: "20px", height: "10px" }}
                        />
                      </span>
                      <span>Subscribe Now</span>
                    </div>
                    <div className="show_body_subscribe_div2">
                      <span>Stream Live Sports and Ad-Free Originals</span>
                    </div>
                  </button>
                  <button
                    className="show_body_list"
                    onClick={handleAddToWatchlist}
                  >
                    {isToggled ? (
                      <span>
                        <FiCheck
                          style={{
                            width: "30px",
                            height: "23px",
                            fontWeight: "700",
                          }}
                        />
                      </span>
                    ) : (
                      <span>
                        <BsPlusLg
                          style={{
                            width: "23px",
                            height: "23px",
                            fontWeight: "700",
                          }}
                        />
                      </span>
                    )}
                    <span>My List</span>
                  </button>
                </div>
                {/* <div><br/></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {detail&&detail?.type === "movie" && movie?.length > 0 && (
        <div
          className={`carousel-container`}
          style={{ margin: "0px", padding: "0px", position: "relative" }}
        >
          <h1
            style={{
              color: "white",
              paddingLeft: "20px",
              paddingBottom: "5px",
              margin: "0px",
            }}
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
      )}
      {detail&&detail?.type  === "web series" && webseries?.length > 0 && (
        <div
          className={`carousel-container`}
          style={{ padding: "0px", margin: "0px" }}
        >
          <h1
            style={{
              color: "white",
              paddingLeft: "20px",
              paddingBottom: "5px",
              margin: "0px",
            }}
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
      )}
      {detail&&detail?.type  === "trailer" && trailer?.length > 0 && (
        <div className={`carousel-container`}>
          <h1
            style={{
              color: "white",
              paddingLeft: "20px",
              paddingBottom: "5px",
              margin: "0px",
            }}
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
      )}
      {detail&&detail?.type  === "short film" && shortfilm?.length > 0 && (
        <div className={`carousel-container`}>
          <h1
            style={{
              color: "white",
              paddingLeft: "20px",
              paddingBottom: "5px",
              margin: "0px",
            }}
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
      )}
      {detail&&detail?.type  === "tv show" && tvshow?.length > 0 && (
        <div className={`carousel-container`}>
          <h1
            style={{
              color: "white",
              paddingLeft: "20px",
              paddingBottom: "5px",
              margin: "0px",
            }}
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
      )}
      {detail&&detail?.type  === "documentary" && documentary?.length > 0 && (
        <div className={`carousel-container`}>
          <h1
            style={{
              color: "white",
              paddingLeft: "20px",
              paddingBottom: "5px",
              margin: "0px",
            }}
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
      )}
      {detail&&detail?.type === "video song" && videosong?.length > 0 && (
        <div className={`carousel-container`} style={{ background: "black" }}>
          <h1
            style={{
              color: "white",
              paddingLeft: "20px",
              paddingBottom: "5px",
              margin: "0px",
            }}
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
            slidesToScroll={8}
          >
            {videosong &&
              videosong?.map((item) => (
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
      )}
    </main>
  );
};

export default Show;
