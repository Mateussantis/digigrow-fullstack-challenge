import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles
import logo from "../../assets/logo.webp";
import { Container } from "./style";

const Slicker = () => {
  return (
    <Carousel
      // className='carrosel'
      width={500}
      showStatus={false}
      showArrows={false}
      autoPlay={true}
      interval={4000}
      infiniteLoop={true}
      showThumbs={false}
    >
      <Container>
        <img src={logo} />
      </Container>
      <Container>
        <img src={logo} />
      </Container>
    </Carousel>
  );
};

export default Slicker;