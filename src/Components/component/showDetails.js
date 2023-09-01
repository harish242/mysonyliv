import React, { useState } from 'react';
import '../../Styles/showdetails.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { LiaCrownSolid } from 'react-icons/lia';
import { FiCheck } from 'react-icons/fi';
import { BsPlusLg } from 'react-icons/bs';
import { PiShareFat } from 'react-icons/pi';
import { Carousel } from '@mantine/carousel';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { Card, Image, Text } from "@mantine/core";
import axios from 'axios';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const showDetail = useSelector(state => state.others.mainDataReducer);
  const token = useSelector(state => state.persisted.localJwtReducer.tokens);

  const movie = useSelector(state => state.persisted.AddItems.movie);
  const tvshow = useSelector(state => state.persisted.AddItems.movie);
  const webseries = useSelector(state => state.persisted.AddItems.webseries);
  const documentary = useSelector(state => state.persisted.AddItems.documentary);
  const trailer = useSelector(state => state.persisted.AddItems.trailer);
  const videosong = useSelector(state => state.persisted.AddItems.videosong);
  const shortfilm = useSelector(state => state.persisted.AddItems.shortfilm);
  const manStore = useSelector(state => state.others.mainDataReducer.showdata);

  const showDetails = [
    ...movie, ...videosong, ...shortfilm, ...trailer, ...webseries, ...documentary, ...tvshow, ...manStore
  ];
  const selectedShow = showDetails.find(item => item._id === id);
  const dispatch = useDispatch();
  const Toggled = useSelector(state => state.persisted.AddItems);
  const isToggled = Toggled[id];

  const handleAddToWatchlist = async () => {
    try {
      const response = await axios.patch(
        `https://academics.newtonschool.co/api/v1/social_media/watchlist`,
        { 'showId': id },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "projectID": 'xybcw190kyb8',
          },
        }
      );
      if (response.status === 200) {
        dispatch({ type: `TOGGLE_${id}`, payload: !isToggled });
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <div className='show_container'>
      <div className='navbar_background'></div>
      <div className='show_body_container'>
        <div className='show_main_image'>
          <img src={selectedShow?.thumbnail} alt={selectedShow?.title} />
        </div>
        <div className='gradient_1'></div>
      </div>

      <div className='show_body_text'>
        <h1>{selectedShow?.title}</h1>
        <div className='show_body_text_p1'>
          <p>{selectedShow?.type}</p>
          <span className='dot'></span>
          <p>{selectedShow?.createdAt}</p>
          <span className='dot'></span>
          <p>{selectedShow?.keywords[0]}, {selectedShow?.keywords[1]}, {selectedShow?.keywords[2]}</p>
        </div>
        <div className='show_body_text_description'>
          <p>{selectedShow?.description}</p>
        </div>
        <div className='show_body_text_p2'>
          <span className='show_body_text_p2_1'>Director:</span>
          <span className='show_body_text_p2_2'>{selectedShow?.director}</span>
        </div>
        <div className='show_body_text_p2'>
          <span className='show_body_text_p2_1'>Cast:</span>
        </div>
      </div>
      <div className='show_body_button'>
        <Link to={`/video/${id}`}>
          <button className='show_body_watch' >
            <span className='show_body_watch_image'><img src='https://images.slivcdn.com/UI_icons/New_Final_Icons_30052020/web_play_icon.png?h=24&w=24&q=high&fr=webp' alt="Watch" /></span>
            <span className='show_body_watch_text'>Watch Free Preview</span>
          </button>
        </Link>
        <button className='show_body_subscribe'>
          <div className='show_body_subscribe_div1'>
            <span><LiaCrownSolid style={{ width: "30px", height: "30px" }} /></span>
            <span>Subscribe Now</span>
          </div>
          <div className='show_body_subscribe_div2'><span>Stream Live Sports and Ad-Free Originals</span></div>
        </button>
        <button className='show_body_list' onClick={handleAddToWatchlist}>
          {isToggled ? <span><FiCheck style={{ width: "23px", height: "23px", fontWeight: "700" }} /></span> : <span><BsPlusLg style={{ width: "23px", height: "23px", fontWeight: "700" }} /></span>}
          <span>My List</span>
        </button>
        <button className='show_body_share'>
          <span><PiShareFat style={{ width: "23px", height: "23px" }} /></span>
          <span>Share</span>
        </button>
      </div>

      <div className='show_carousel'>
        {selectedShow?.type === "movie" && movie?.length > 0 && (
          <>
            <h1>More Like This <span className='arrow_react_icon'><IoIosArrowForward /></span></h1>
            <Carousel
              height={400}
              slideSize="10%"
              slideGap="md"
              loop
              align="start"
              slidesToScroll={5}
            >
              {movie?.map(item => (
                <Carousel.Slide key={item._id} >
                  <Card
                    shadow="sm"
                    padding="xl"
                    component="a"
                    key={item._id}
                  >
                    <Card.Section>
                      <Link to={`/showdetails/${item._id}`}>
                        <Image
                          src={item.thumbnail}
                          height={260}
                          alt={item.title}
                          width={190}
                        />
                      </Link>
                    </Card.Section>
                  </Card>
                </Carousel.Slide>
              ))}
            </Carousel>
          </>
        )}
      </div>

      {/* Add more similar carousel sections for other show types (video song, documentary, tv show, short film, trailer, web series) */}
      <div className='show_carousel'>
      {selectedShow?.type === "video song" && videosong?.length > 0 && (
        <>
        <h1 >More Like This <span className='arrow_react_icon'><IoIosArrowForward /></span></h1>
        <Carousel
          height={400}
          slideSize="10%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={5}
        >
          {videosong?.map(item => (
            <Carousel.Slide key={item._id}>
              {/* <div  className="thumbnail_item">
                <Link to={`/showdetails/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </div> */}
               <Card
              shadow="sm"
              padding="xl"
              component="a"
              
              // href={item.video_url}
              // target="_self"
              key={item._id}
              onClick={()=>console.log('sd/203','i cliked')}
            >
              <Card.Section>
              <Link to={`/showdetails/${item._id}`}>
                <Image
                  src={item.thumbnail}
                  height={260}
                  alt="No way!"
                  width={190}
                />
                </Link>
              </Card.Section>
              
    
              {/* <Text weight={500} size="sm" mt="md">
                {item.title?.slice(0, 25)}
              </Text>           */}
            </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
        </>
      )}
      </div>
      <div className='show_carousel'>
      {selectedShow?.type === "documentary" && documentary?.length > 0 && (
        <>
        <h1>More Like This <span className='arrow_react_icon'><IoIosArrowForward /></span></h1>
        <Carousel
          height={400}
          slideSize="10%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={5}
        >
          {documentary?.map(item => (
            <Carousel.Slide key={item._id}>
              {/* <div  className="thumbnail_item">
                <Link to={`/showdetails/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </div> */}
               <Card
              shadow="sm"
              padding="xl"
              component="a"
              
              // href={item.video_url}
              // target="_self"
              key={item._id}
            >
              <Card.Section>
              <Link to={`/showdetails/${item._id}`}>
                <Image
                  src={item.thumbnail}
                  height={260}
                  alt="No way!"
                  width={190}
                />
                </Link>
              </Card.Section>
    
              {/* <Text weight={500} size="sm" mt="md">
                {item.title?.slice(0, 25)}
              </Text>           */}
            </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
        </>
      )}
      </div>
      <div className='show_carousel'>
      {selectedShow?.type === "tv show" && tvshow?.length > 0 && (
        <>
        <h1>More Like This <span className='arrow_react_icon'><IoIosArrowForward /></span></h1>
        <Carousel
          height={400}
          slideSize="10%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={5}
        >
          {tvshow?.map(item => (
            <Carousel.Slide key={item._id}>
              {/* <div  className="thumbnail_item">
                <Link to={`/showdetails/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </div> */}
               <Card
              shadow="sm"
              padding="xl"
              component="a"
              
              // href={item.video_url}
              // target="_self"
              key={item._id}
            >
              <Card.Section>
              <Link to={`/showdetails/${item._id}`}>
                <Image
                  src={item.thumbnail}
                  height={260}
                  alt="No way!"
                  width={190}
                />
                </Link>
              </Card.Section>
    
              {/* <Text weight={500} size="sm" mt="md">
                {item.title?.slice(0, 25)}
              </Text>           */}
            </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
        </>
      )}
      </div>
      <div className='show_carousel'>
      {selectedShow?.type === "short film" && shortfilm?.length > 0 && (
        <>
        <h1>More Like This <span className='arrow_react_icon'><IoIosArrowForward /></span></h1>
        <Carousel
          height={400}
          slideSize="10%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={5}
        >
          {shortfilm?.map(item => (
            <Carousel.Slide key={item._id}>
              {/* <div  className="thumbnail_item">
                <Link to={`/showdetails/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </div> */}
               <Card
              shadow="sm"
              padding="xl"
              component="a"
              
              // href={item.video_url}
              // target="_self"
              key={item._id}
            >
              <Card.Section>
              <Link to={`/showdetails/${item._id}`}>
                <Image
                  src={item.thumbnail}
                  height={260}
                  alt="No way!"
                  width={190}
                />
                </Link>
              </Card.Section>
    
              {/* <Text weight={500} size="sm" mt="md">
                {item.title?.slice(0, 25)}
              </Text>           */}
            </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
        </>
      )}
      </div>
      <div className='show_carousel'>
      {selectedShow?.type === "trailer" && trailer?.length > 0 && (
        <>
        <h1>More Like This <span className='arrow_react_icon'><IoIosArrowForward /></span></h1>
        <Carousel
          height={400}
          slideSize="10%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={5}
        >
          {trailer?.map(item => (
            <Carousel.Slide key={item._id}>
              {/* <div  className="thumbnail_item">
                <Link to={`/showdetails/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </div> */}
               <Card
              shadow="sm"
              padding="xl"
              component="a"
              
              // href={item.video_url}
              // target="_self"
              key={item._id}
            >
              <Card.Section>
              <Link to={`/showdetails/${item._id}`}>
                <Image
                  src={item.thumbnail}
                  height={260}
                  alt="No way!"
                  width={190}
                />
                </Link>
              </Card.Section>
    
              {/* <Text weight={500} size="sm" mt="md">
                {item.title?.slice(0, 25)}
              </Text>           */}
            </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
        </>
      )}
      </div>
      <div className='show_carousel'>
      {selectedShow?.type === "web series" && webseries?.length > 0 && (
        <>
        <h1>More Like This <span className='arrow_react_icon'><IoIosArrowForward /></span></h1>
        <Carousel
          height={400}
          slideSize="10%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={5}
        >
          {webseries?.map(item => (
            <Carousel.Slide key={item._id}>
              {/* <div  className="thumbnail_item">
                <Link to={`/showdetails/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </div> */}
               <Card
              shadow="sm"
              padding="xl"
              component="a"
              
              // href={item.video_url}
              // target="_self"
              key={item._id}
            >
              <Card.Section>
              <Link to={`/showdetails/${item._id}`}>
                <Image
                  src={item.thumbnail}
                  height={260}
                  alt="No way!"
                  width={190}
                />
                </Link>
              </Card.Section>
    
              {/* <Text weight={500} size="sm" mt="md">
                {item.title?.slice(0, 25)}
              </Text>           */}
            </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
        </>
      )}
      </div>
    </div>
  );
}

export default Show;
