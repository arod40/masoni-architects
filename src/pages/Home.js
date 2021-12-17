import React from 'react';

// import Carousel from '../components/Carousel';

import styled from 'styled-components';
import { MdHome, MdPerson, MdFullscreen, MdList } from 'react-icons/md';
import pr1 from '../assets/pictures/pr1.jpg';
import pr2 from '../assets/pictures/pr2.jpg';
import pr3 from '../assets/pictures/pr3.jpg';
import pr4 from '../assets/pictures/pr4.jpg';
import pr5 from '../assets/pictures/pr5.jpg';
import IconsMenu from '../components/IconsMenu';
import ImagesSlider from '../components/ImagesSlider';

const mediaQueryLimitPixels = 600;
const wideScreenNavWidthVW = 10;
const wideScreenFooterHeightVH = 10;
const strechScreenNavHeight = 10;
const strechScreenFooterHeight = 10;

const HomeLayout = styled.div`
  display: grid;
  grid-template-rows: ${100 - wideScreenFooterHeightVH}vh ${wideScreenFooterHeightVH}vh;
  grid-template-columns: ${wideScreenNavWidthVW}vw ${100 -
    wideScreenNavWidthVW}vw;
  grid-template-areas:
    'menu images'
    'footer footer';
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .menu-bar {
    grid-area: menu;
    background-color: black;
    z-index: 100;
  }
  .footer {
    grid-area: footer;
    background-color: white;
  }
  .images-area {
    grid-area: images;
    background-color: black;
    margin: auto;
    height: ${100 - wideScreenFooterHeightVH}vh;
  }
  @media (max-width: ${mediaQueryLimitPixels}px) {
    grid-template-rows: ${strechScreenNavHeight}vh ${100 -
      strechScreenNavHeight -
      strechScreenFooterHeight}vh ${strechScreenFooterHeight}vh;
    grid-template-columns: 100vw;
    grid-template-areas:
      'menu '
      'images'
      'footer';
  }
`;

export default function Home() {
  const widthOnWideScreenVW = 100 - wideScreenNavWidthVW;
  const widthOnStrechScreenVW = 100;
  const heightOnWideScreenVH = 100 - strechScreenFooterHeight;
  const heightOnStrechScreenVH =
    100 - strechScreenNavHeight - strechScreenFooterHeight;
  return (
    <HomeLayout>
      <div className="menu-bar">
        <IconsMenu mediaQueryLimitPixels={mediaQueryLimitPixels}>
          <MdHome size="40" />
          <MdList size="40" />
          <MdPerson size="40" />
          <MdFullscreen size="40" />
        </IconsMenu>
      </div>
      <div className="images-area">
        <ImagesSlider
          images={[pr1, pr2, pr3, pr4, pr5]}
          mediaQueryLimitPixels={mediaQueryLimitPixels}
          widthOnWideScreenVW={widthOnWideScreenVW}
          widthOnStrechScreenVW={widthOnStrechScreenVW}
          heightOnWideScreenVH={heightOnWideScreenVH}
          heightOnStrechScreenVH={heightOnStrechScreenVH}
        />
      </div>
      <div className="footer" />
    </HomeLayout>
  );
}
