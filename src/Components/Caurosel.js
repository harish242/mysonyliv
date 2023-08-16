import React from 'react'
import { Carousel } from '@mantine/carousel';
import {HeroImageRight} from './HeroHeader'

export function Demo() {
  return (
    <Carousel
      maw='100%'
      mx="auto"
      withIndicators
      height={600}
      dragFree
      slideGap="md"
      align="start"
    >
      <Carousel.Slide><HeroImageRight/></Carousel.Slide>
      {/* <Carousel.Slide>2</Carousel.Slide> */}
      {/* <Carousel.Slide>3</Carousel.Slide> */}
      {/* ...other slides */}
    </Carousel>
  );
}