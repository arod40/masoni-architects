import React from 'react';

import styled from 'styled-components';
import {
  MdHome,
  MdPerson,
  MdFullscreen,
  MdList,
  MdFullscreenExit,
} from 'react-icons/md';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import IconsMenu from '../components/IconsMenu';
import ImagesSlider from '../components/ImagesSlider';
import ContactsFooter from '../components/ContactsFooter';
import data from '../assets/data';
import Page from '../components/Page';
import IndexPage from '../components/IndexPage';

const mediaQueryLimitPixels = 600;
const wideScreenNavWidthVW = 10;
const wideScreenFooterHeightVH = 10;
const strechScreenNavHeight = 10;
const strechScreenFooterHeight = 10;

const widthOnWideScreenVW = 100 - wideScreenNavWidthVW;
const widthOnStrechScreenVW = 100;
const heightOnWideScreenVH = 100 - strechScreenFooterHeight;
const heightOnStrechScreenVH =
  100 - strechScreenNavHeight - strechScreenFooterHeight;

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

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      fullscreen: false,
      isWide: window.screen.availWidth > mediaQueryLimitPixels,
    };

    // Reading image list
    this.images = [
      data.homepage.file,
      ...Array.from(
        Object.keys(data.pages).map((page) => [page, data.pages[page].file])
      )
        .sort()
        .map((elem) => elem[1]),
      data.contactpage.file,
    ];

    this.homePage = 0;
    this.indexPage = 1;

    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ isWide: window.screen.availWidth > mediaQueryLimitPixels });
  };

  buildPages = (images) => {
    const { isWide } = this.state;
    // Building slider pages
    const pages = [];

    pages.push(
      <Page
        content={<img src={data.homepage.file} alt="" />}
        mediaQueryLimitPixels={mediaQueryLimitPixels}
        widthOnWideScreenVW={widthOnWideScreenVW}
        widthOnStrechScreenVW={widthOnStrechScreenVW}
        heightOnWideScreenVH={heightOnWideScreenVH}
        heightOnStrechScreenVH={heightOnStrechScreenVH}
      />
    );

    const indexablePages = Object.keys(data.pages)
      .filter((page) => data.pages[page].index)
      .map((page) => data.pages[page]);

    //   Dictionary to jump correctly when clicking index entries
    const pageToCounter = [0];
    if (isWide) {
      for (let i = 1; i < images.length; i += 1) {
        pageToCounter.push(Math.floor((i + 1) / 2) + 1);
      }
    } else {
      for (let i = 1; i < images.length; i += 1) {
        pageToCounter.push(i + 2);
      }
    }

    const pagesContent = [
      <IndexPage
        indexes={indexablePages.slice(0, 7)}
        setCounter={this.setCounter}
        mediaQueryLimitPixels={mediaQueryLimitPixels}
        isTitlePage
        pageToCounter={pageToCounter}
      />,
      <IndexPage
        indexes={indexablePages.slice(7)}
        setCounter={this.setCounter}
        mediaQueryLimitPixels={mediaQueryLimitPixels}
        pageToCounter={pageToCounter}
      />,
      ...images
        .slice(1, images.length - 1)
        .map((image) => <img src={image} alt="" />),
    ];

    const groupedPagesContent = [];
    for (let i = 0; i < pagesContent.length; i += 2) {
      groupedPagesContent.push([pagesContent[i], pagesContent[i + 1]]);
    }

    const content = isWide ? groupedPagesContent : pagesContent;
    content.forEach((page) =>
      pages.push(
        <Page
          isDouble={isWide}
          content={page}
          mediaQueryLimitPixels={mediaQueryLimitPixels}
          widthOnWideScreenVW={widthOnWideScreenVW}
          widthOnStrechScreenVW={widthOnStrechScreenVW}
          heightOnWideScreenVH={heightOnWideScreenVH}
          heightOnStrechScreenVH={heightOnStrechScreenVH}
        />
      )
    );

    pages.push(
      <Page
        content={<img src={data.contactpage.file} alt="" />}
        mediaQueryLimitPixels={mediaQueryLimitPixels}
        widthOnWideScreenVW={widthOnWideScreenVW}
        widthOnStrechScreenVW={widthOnStrechScreenVW}
        heightOnWideScreenVH={heightOnWideScreenVH}
        heightOnStrechScreenVH={heightOnStrechScreenVH}
      />
    );

    return pages;
  };

  setCounter = (value) => {
    this.setState({ counter: value });
  };

  setFullScreen = (value) => {
    this.setState({ fullscreen: value });
  };

  render() {
    const { counter, fullscreen } = this.state;

    const pages = this.buildPages(this.images);
    this.contactPage = pages.length - 1;
    return (
      <HomeLayout>
        <div className="menu-bar">
          <IconsMenu mediaQueryLimitPixels={mediaQueryLimitPixels}>
            <div
              key="home-icon"
              role="button"
              tabIndex={0}
              onClick={() => {
                this.setCounter(this.homePage);
              }}
              onKeyDown={() => {
                this.setCounter(this.homePage);
              }}
            >
              <MdHome />
            </div>
            <div
              key="list-icon"
              role="button"
              tabIndex={0}
              onClick={() => this.setCounter(this.indexPage)}
              onKeyDown={() => this.setCounter(this.indexPage)}
            >
              <MdList />
            </div>
            <div
              key="person-icon"
              role="button"
              tabIndex={0}
              onClick={() => {
                this.setCounter(this.contactPage);
              }}
              onKeyDown={() => {
                this.setCounter(this.contactPage);
              }}
            >
              <MdPerson />
            </div>
            <div
              key="fullscreen-icon"
              role="button"
              tabIndex={0}
              onClick={() => {
                if (fullscreen) {
                  document.exitFullscreen();
                } else {
                  document.body.requestFullscreen();
                }
                this.setFullScreen(!fullscreen);
              }}
              onKeyDown={() => () => {
                if (fullscreen) {
                  document.exitFullscreen();
                } else {
                  document.body.requestFullscreen();
                }
                this.setFullScreen(!fullscreen);
              }}
            >
              {fullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
            </div>
          </IconsMenu>
        </div>
        <div className="images-area">
          <ImagesSlider
            pages={pages}
            mediaQueryLimitPixels={mediaQueryLimitPixels}
            widthOnWideScreenVW={widthOnWideScreenVW}
            widthOnStrechScreenVW={widthOnStrechScreenVW}
            heightOnWideScreenVH={heightOnWideScreenVH}
            heightOnStrechScreenVH={heightOnStrechScreenVH}
            counter={counter}
            setCounter={this.setCounter}
          />
        </div>
        <div className="footer">
          <ContactsFooter
            contacts={data.contacts}
            mediaQueryLimitPixels={mediaQueryLimitPixels}
          />
        </div>
      </HomeLayout>
    );
  }
}
