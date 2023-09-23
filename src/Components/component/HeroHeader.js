import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import '../../Styles/HeroHeader.css'
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
import { Modal, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
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
  const store = useSelector((state) => state.persisted.localJwtReducer);
  const doIt = useSelector((state) => state);
  const addedItems = useSelector(
    (state) => state.persisted.AddItems.cartItems
  );

  const Toggled = useSelector((state) => state.persisted.AddItems);
  const isToggled = Toggled[datat.data._id] || false;

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
      console.log("HeroH/155", err);
      return null;
    }

    const actionType = `TOGGLE_${datat.data._id}`;
    dispatch({
      type: actionType,
      payload: !isToggled,
    });
  };

  const HandleToggles = (ids) => {
    addToMyList(ids);
    setTimeout(() => {
      if(!isToggled){
      open();       
      }
    }, 500);
  };

  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 30%, #062343 70%), url(${datat.data.thumbnail})`,
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
              {datat.data.director}
            </Title>

            <Text className={classes.description} mt={100}>
              {datat.data.description}
            </Text>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
             <Button
  variant="gradient"
  gradient={{ from: "pink", to: "yellow" }}
  size="xl"
  className={classes.add}
  style={{
    width: "fit-content",
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Apply opacity to the background
  }}
  onClick={() => HandleToggles(datat.data._id)}
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
  <span style={{ zIndex: 2000, color: "white" }}>Add To Wishlist</span>
</Button>

              <Button
                variant="gradient"
                gradient={{ from: "pink", to: "yellow" }}
                size="xl"
                className={classes.control}
                mt={20}
                class="bg-black hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded"
                onClick={() => navigate(`/showdetails/${datat.data._id}`)}
                style={{marginTop:'20px',backgroundColor:
                "rgba(0, 0, 0, 0.3)"}}
              >
                More Details
              </Button>

              <div className='mantine' style={{ position: "absolute", top: "450px" }}>
                <Modal opened={opened} onClose={close} withCloseButton={false} centered >
                  Added To Whishlist
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
