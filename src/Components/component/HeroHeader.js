import React,{useEffect} from 'react'
import {  useNavigate } from 'react-router';
import { createStyles, Container, Title, Text, Button, rem } from '@mantine/core';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';



const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#11284b',
    backgroundSize: 'cover',
    backgroundRepeat:'no-repeat',
    backgroundPosition: 'center',
    // backgroundImage:
    //   'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(data.thumbnail)',
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  content: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(48),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },
  whishlist:{
     color:'white',
     fontWeight:500,
     lineHeight:1.05,
     maxWidth:rem(500),
     fontSize:rem(28),
     [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        fontSize: rem(34),
        lineHeight: 1.15,
      },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: rem(500),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
    },
  },
  add: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },
}));

export function HeroImageRight(props) {
    const datat=props
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const Items=useSelector(state=>state.AddItems)
    const store=useSelector(store=>store.resetPassword)
    // console.log('Herohead/110',store.token)

  const { classes } = useStyles();
  const HandleClick=()=>{
     navigate('/video',{state:{
        videoURL:datat.data.video_url
     }})
  }
  // console.log('hero/head/117',datat.data._id)
  const ids=datat.data._id
  // console.log('hh/121',ids)
 
  const addToMyList=async (ab)=>{
  // console.log('lastthing/123',ab)
  // console.log('hh/124',store.token)
  // console.log('hh/126',ids)

  // if(store.token){
    try{
    //   (async()=>{
    //       const response=await fetch(`https://academics.newtonschool.co/api/v1/social_media/watchlist/${ab}`,
    //      {method:"PATCH",headers:{'Authorization': `Bearer ${store.token}`,'projectid':'xybcw190kyb8'},body:JSON.stringify({'showId':ab})}
    //       )
    //       const resdata=await response.json()
    //       console.log('heroheader/130',resdata)
    //       console.log('i runned')
    //  })()
    const response = await axios.patch(
      `https://academics.newtonschool.co/api/v1/social_media/watchlist/${ab}`,
      { 'showId':ab }, // Pass the showId in the request body
      {
        headers: {
          Authorization: `Bearer ${store.token}`,
          projectId: 'xybcw190kyb8',
        },
      }
    );
    const favItems=response?.data.data.shows
    console.log('hh/147',favItems)
    if(favItems){
      dispatch({type:'ADD_ITEM',payload:favItems})

    }
  }catch(err){
    console.log('HeroH',datat)
   }
  // }
}
  return (
    // onClick={()=>navigate(`/showdetails/${datat.data._id}`)}
    <div className={classes.root}  style={{
        backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 30%, #062343 100%), url(${datat.data.thumbnail})`,height:800
      }} >
      <Container size="lg" >
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              !{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                {datat.data.title}
              </Text>{' '}
              {/* React components library */}
              {datat.data.director}
            </Title>

            <Text className={classes.description} mt={100}>
              {/* Build fully functional accessible web applications with ease – Mantine includes more
              than 100 customizable components and hooks to cover you in any situation */}
              {datat.data.description}
            </Text>
            {/* <Text className={classes.whishlist}> */}
           {}
            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.add}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              mt={60}
              style={{marginRight:20,marginTop:90,zIndex:1000}}
              onClick={()=>addToMyList(datat.data._id)}
            >
             
              +    Add To Whishlist
            </Button>              
               
                
            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
              mt={60}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={HandleClick}
            >
              
              PLAY NOW
            </Button>
            {}
            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
              mt={60}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              style={{marginLeft:'20px'}}
              onClick={()=>navigate(`/showdetails/${datat.data._id}`)}
            >
              
              More Details
            </Button>
            
          
          </div>
        </div>
      </Container>
    </div>
  );
            }
  
