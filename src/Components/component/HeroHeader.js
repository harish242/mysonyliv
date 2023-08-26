import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  rem,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { FiCheck } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
// import { useState } from 'react'
import { Modal, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import axios from "axios";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    // backgroundImage:
    //   'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(data.thumbnail)',
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  content: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
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

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },
  whishlist: {
    color: "white",
    fontWeight: 500,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(28),
    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: rem(500),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
    },
  },
  add: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
}));

export function HeroImageRight(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const datat = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const Items=useSelector(state=>state.AddItems)
  // const store=useSelector(store=>store.resetPassword)
  const store = useSelector((state) => state.persisted.loginReducer);
  const [isToggled, setIsToggled] = useState(true);

  // console.log('Herohead/110',store.token)

  const { classes } = useStyles();
  const HandleClick = () => {
    navigate("/video", {
      state: {
        videoURL: datat.data.video_url,
      },
    });
  };

  const addToMyList = async (ab) => {
    try {
      const response = await axios.patch(
        `https://academics.newtonschool.co/api/v1/social_media/watchlist`,
        { showId: ab }, // Pass the showId in the request body
        {
          headers: {
            Authorization: `Bearer ${store.tokens}`,
            projectID: "xybcw190kyb8",
          },
        }
      );

      console.log("response/hh", response);
    } catch (err) {
      console.log("HeroH", err);
      return null;
    }
    setIsToggled(!isToggled);
  };
  const HandleToggles = () => {
    addToMyList(datat.data._id);
    setTimeout(()=>{
    open()
      
    },1000)

    // if(!isToggled){}
  };
  return (
    // onClick={()=>navigate(`/showdetails/${datat.data._id}`)}
    <div
      className={classes.root}
      style={{
        backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 30%, #062343 100%), url(${datat.data.thumbnail})`,
        height: 800,
      }}
    >
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              !{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "pink", to: "yellow" }}
              >
                {datat.data.title}
              </Text>{" "}
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isToggled && (
                <Modal opened={opened} onClose={close} withCloseButton={false}>
                  Added To Whishlist
                </Modal>
              )}

              <Button
                variant="gradient"
                gradient={{ from: "pink", to: "yellow" }}
                size="xl"
                className={classes.add}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                mt={51}
                style={{ marginRight: 100, marginTop: 90, zIndex: 1000 }}
                onClick={HandleToggles}
              >
                {isToggled ? (
                  <span>
                    <FiCheck
                      style={{
                        width: "23px",
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
                Add To Whishlist
              </Button>

              <div style={{ position: "relative", top: "45px" }}>
                <Button
                  variant="gradient"
                  gradient={{ from: "pink", to: "yellow" }}
                  size="xl"
                  className={classes.control}
                  mt={110}
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded"
                  // mb={110}
                  onClick={() => navigate(`/showdetails/${datat.data._id}`)}
                >
                  More Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
