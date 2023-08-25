
import React, {useState} from 'react'
import '../../Styles/showdetails.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LiaCrownSolid } from 'react-icons/lia'
import { FiCheck } from 'react-icons/fi'
import { BsPlusLg } from 'react-icons/bs'
import { PiShareFat } from 'react-icons/pi'
import { Carousel } from '@mantine/carousel';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch } from 'react-redux';
import { Card, Image, Text } from "@mantine/core";

import axios from 'axios';

// import { addToWatchlist, removeFromWatchlist } from '../../Redux/Action';

const Show = () => {
  const { id } = useParams();
  const showDetails = useSelector(state => state.others.mainDataReducer.showdata);
  const token=useSelector(state=>state.resetPassword.token)
  const selectedShow = showDetails?.find(item => item._id === id);
  const movie = showDetails?.filter(item => item.type === 'movie');
  const videoSong = showDetails?.filter(item => item.type === 'video song');
  const documentry = showDetails?.filter(item => item.type === 'documentary');
  const tvShow = showDetails?.filter(item => item.type === 'tv show');
  const shortFilm = showDetails?.filter(item => item.type === 'short film');
  const trailer = showDetails?.filter(item => item.type === 'trailer');
  const webSeries = showDetails?.filter(item => item.type === 'web series');
  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(false);
  const handleAddToWatchlist = async() => {
    // dispatch(addToWatchlist(id));
    try{
    
      const response = await axios.patch(
        `https://academics.newtonschool.co/api/v1/social_media/watchlist`,
        { 'showId':id }, // Pass the showId in the request body
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "projectID": 'xybcw190kyb8',
          },
        }
      );
      console.log(response)
    }catch(err){
      console.log('my con',err)
      return null
    }
    setIsToggled(!isToggled); 
  };
  return (
    <div className='show_container'>
      <div className='navbar_background'></div>
      <div className='show_body_container'>
        <div className='show_main_image'>
          <img src={selectedShow?.thumbnail} />
        </div>
        <div className='gradient_1'></div>
        {/* <div className='gradient_2'></div> */}
      </div>

      {/* <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}> */}

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
          {/* <span className='show_body_text_p2_2'>{selectedShow?.cast[0]}, {selectedShow?.cast[1]}, {selectedShow?.cast[2]}</span> */}
        </div>
      </div>
      <div className='show_body_button'>
        <Link to={`/video/${id}`}>
        <button className='show_body_watch' >
          <span className='show_body_watch_image'><img src='https://images.slivcdn.com/UI_icons/New_Final_Icons_30052020/web_play_icon.png?h=24&w=24&q=high&fr=webp' /></span>
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
         {/* <button className='show_body_list'>
           <span><FiCheck style={{ width: "23px", height: "23px", fontWeight: "700" }} /></span>
           <span>My List</span>
         </button>  */}
          <button className='show_body_list' onClick={handleAddToWatchlist}>
          {isToggled ? <span><FiCheck style={{ width: "23px", height: "23px", fontWeight: "700" }} /></span> : <span><BsPlusLg style={{ width: "23px", height: "23px", fontWeight: "700" }} /></span>  }
          
          <span>My List</span>
        </button>
         
        <button className='show_body_share'>
          <span><PiShareFat style={{ width: "23px", height: "23px" }} /></span>
          <span>Share</span>
        </button>
      </div>
    


      <div className='show_carousel' style={{marginTop:'0px'}}>
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
              <div className="thumbnail_item">
                <Link to={`/showdetails/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} className='card-image' />
                </Link>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
        </>
      )}
      </div>
      <div className='show_carousel'>
      {selectedShow?.type === "video song" && videoSong?.length > 0 && (
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
          {videoSong?.map(item => (
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
                <Image
                  src={item.thumbnail}
                  height={260}
                  alt="No way!"
                  width={220}
                />
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
      {selectedShow?.type === "documentary" && documentry?.length > 0 && (
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
          {documentry?.map(item => (
            <Carousel.Slide key={item._id}>
              <div  className="thumbnail_item">
                <Link to={`/showdetails/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
        </>
      )}
      </div>
      <div className='show_carousel'>
      {selectedShow?.type === "tv show" && tvShow?.length > 0 && (
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
          {tvShow?.map(item => (
            <Carousel.Slide key={item._id}>
              <div  className="thumbnail_item">
                <Link to={`/showdetails/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
        </>
      )}
      </div>
      <div className='show_carousel'>
      {selectedShow?.type === "short film" && shortFilm?.length > 0 && (
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
          {shortFilm?.map(item => (
            <Carousel.Slide key={item._id}>
              <div  className="thumbnail_item">
                <Link to={`/showdetails/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </div>
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
              <div  className="thumbnail_item">
                <Link to={`/showdetails/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
        </>
      )}
      </div>
      <div className='show_carousel'>
      {selectedShow?.type === "web series" && webSeries?.length > 0 && (
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
          {webSeries?.map(item => (
            <Carousel.Slide key={item._id}>
              <div  className="thumbnail_item">
                <Link to={`/showdetails/${item._id}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
        </>
      )}
      </div>
    </div>

  )
}

export default Show;
