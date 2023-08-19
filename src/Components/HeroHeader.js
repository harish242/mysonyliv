import React from 'react'
import {  useNavigate } from 'react-router';
import { createStyles, Container, Title, Text, Button, rem } from '@mantine/core';
import { useDispatch,useSelector } from 'react-redux';



const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#11284b',
    backgroundSize: 'cover',
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

//   console.log('HeroHeader/107',Items)

// const masthu=dispatch({type:'ADD_ITEM',payload:datat.data})

  const { classes } = useStyles();
  const HandleClick=()=>{
     navigate('/video',{state:{
        videoURL:datat.data.video_url
     }})
  }
  const addToMyList=(e)=>{
    // console.log('heroheader/116',datat)
    // navigate('/additem',{state:{
    //     masthu
    // }}) 
    const datas=JSON.parse(localStorage.getItem('show'))||[]
    dispatch({type:'ADD_ITEM',payload:datat.data})
    // localStorage.setItem('show',JSON.stringify(result)) 
    const updateData=[...datas,datat.data]
    localStorage.setItem('show',JSON.stringify(updateData)) 

  }
  return (
    <div className={classes.root}  style={{
        backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(${datat.data.thumbnail})`,height:600
      }}>
      <Container size="lg">
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
              mt={60}
              style={{marginRight:20,marginTop:90}}
              onClick={addToMyList}
            >
              {/* Get started */}
              +    Add To Whishlist
            </Button>
                
               
                
            {/* </Text> */}
             
             <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
              mt={60}
              onClick={HandleClick}
            >
              {/* Get started */}
              PLAY NOW
            </Button>
            
          
          </div>
        </div>
      </Container>
    </div>
  );
  
}