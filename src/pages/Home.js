import React, { useState } from 'react';

import styled from 'styled-components';
import { MdHome, MdPerson, MdFullscreen, MdList } from 'react-icons/md';
import IconsMenu from '../components/IconsMenu';
import ImagesSlider from '../components/ImagesSlider';
import ContactsFooter from '../components/ContactsFooter';
import data from '../assets/data';

const mediaQueryLimitPixels = 600;
const wideScreenNavWidthVW = 10;
const wideScreenFooterHeightVH = 10;
const strechScreenNavHeight = 10;
const strechScreenFooterHeight = 10;
let images = [
  data.home.file,
  ...Array.from(
    Object.keys(data.pages).map((page) => [page, data.pages[page].file])
  )
    .sort()
    .map((elem) => elem[1]),
  data.contact.file,
];
// Leaving room for index pages
images = [images[0], undefined, undefined, ...images.slice(1)];
const homePage = 0;
const contactPage = images.length - 1;
const contacts = [
  {
    name: 'Alessandro Masoni',
    email: 'example1@gmail.com',
    phone: '1824812945',
  },
  {
    name: 'Alessandro Masoni',
    email: 'example2@gmail.com',
    phone: '1824812945',
  },
];

const HomeLayout = styled.div`
  display: grid;
  grid-template-rows: ${100 - wideScreenFooterHeightVH}vh ${wideScreenFooterHeightVH}vh;
  grid-template-columns: ${wideScreenNavWidthVW}vw ${100 -
    wideScreenNavWidthVW}vw;
  grid-template-areas:
    'menu images'
    'menu footer';
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
  }
  .images-area {
    grid-area: images;
    margin: auto;
    height: ${100 - wideScreenFooterHeightVH}vh;
    width: ${100 - wideScreenNavWidthVW}vw;
    overflow-y: auto;
  }
  .fade-enter {
    opacity: 0;
    transform: scale(0.96);
  }
  .fade-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: 300ms ease-in;
    transition-property: transform, opacity;
  }
  .fade-exit {
    transform: scale(1);
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transform: scale(0.96);
    transition: 200ms ease-in;
    transition-property: transform, opacity;
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
    .images-area {
      height: ${100 - strechScreenNavHeight - strechScreenFooterHeight}vh;
      width: 100vw;
    }
  }
`;

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [fullscreen, setFullScreen] = useState(false);

  const widthOnWideScreenVW = 100 - wideScreenNavWidthVW;
  const widthOnStrechScreenVW = 100;
  const heightOnWideScreenVH = 100 - strechScreenFooterHeight;
  const heightOnStrechScreenVH =
    100 - strechScreenNavHeight - strechScreenFooterHeight;

  return (
    <HomeLayout>
      <div className="menu-bar">
        <IconsMenu mediaQueryLimitPixels={mediaQueryLimitPixels}>
          <div
            key="home-icon"
            role="button"
            tabIndex={0}
            onClick={() => {
              setCounter(homePage);
            }}
            onKeyDown={() => {
              setCounter(homePage);
            }}
          >
            <MdHome size="40" />
          </div>
          <div
            key="list-icon"
            role="button"
            tabIndex={0}
            onClick={() => setCounter(1)}
            onKeyDown={() => setCounter(1)}
          >
            <MdList size="40" />
          </div>
          <div
            key="person-icon"
            role="button"
            tabIndex={0}
            onClick={() => {
              setCounter(contactPage);
            }}
            onKeyDown={() => {
              setCounter(contactPage);
            }}
          >
            <MdPerson size="40" />
          </div>
          <div
            key="fullscreen-icon"
            role="button"
            tabIndex={0}
            onClick={() => setFullScreen(true)}
            onKeyDown={() => () => setFullScreen(true)}
          >
            <MdFullscreen size="40" />
          </div>
        </IconsMenu>
      </div>
      <div className="images-area">
        <ImagesSlider
          images={images}
          mediaQueryLimitPixels={mediaQueryLimitPixels}
          widthOnWideScreenVW={widthOnWideScreenVW}
          widthOnStrechScreenVW={widthOnStrechScreenVW}
          heightOnWideScreenVH={heightOnWideScreenVH}
          heightOnStrechScreenVH={heightOnStrechScreenVH}
          counter={counter}
          setCounter={setCounter}
          fullscreen={fullscreen}
          setFullScreen={setFullScreen}
          pagesData={data}
        />
      </div>
      <div className="footer">
        <ContactsFooter contacts={contacts} />
      </div>
    </HomeLayout>
  );
}
