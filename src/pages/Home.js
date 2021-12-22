import React from 'react';

import styled from 'styled-components';
import { MdHome, MdPerson, MdFullscreen, MdList } from 'react-icons/md';
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

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      fullscreen: false,
    };

    // Reading image list
    const images = [
      data.home.file,
      ...Array.from(
        Object.keys(data.pages).map((page) => [page, data.pages[page].file])
      )
        .sort()
        .map((elem) => elem[1]),
      data.contact.file,
    ];
    this.pages = this.buildPages(images);

    this.homePage = 0;
    this.contactPage = this.pages.length - 1;
    this.contacts = [
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
  }

  buildPages = (images) => {
    // Building slider pages
    const isHorizontal = window.screen.availWidth > mediaQueryLimitPixels;

    const pages = [];

    pages.push(
      <Page
        content={<img src={data.home.file} alt="" />}
        mediaQueryLimitPixels={mediaQueryLimitPixels}
        widthOnWideScreenVW={widthOnWideScreenVW}
        widthOnStrechScreenVW={widthOnStrechScreenVW}
        heightOnWideScreenVH={heightOnWideScreenVH}
        heightOnStrechScreenVH={heightOnStrechScreenVH}
      />
    );

    const pagesContent = [
      <IndexPage data={data} setCounter={this.setCounter} />,
      <IndexPage data={data} setCounter={this.setCounter} />,
      ...images
        .slice(1, images.length - 1)
        .map((image) => <img src={image} alt="" />),
    ];

    const groupedPagesContent = [];
    for (let i = 0; i < pagesContent.length; i += 2) {
      groupedPagesContent.push([pagesContent[i], pagesContent[i + 1]]);
    }

    const content = isHorizontal ? groupedPagesContent : pagesContent;
    content.forEach((page) =>
      pages.push(
        <Page
          isDouble={isHorizontal}
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
        content={<img src={data.contact.file} alt="" />}
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
              <MdHome size="40" />
            </div>
            <div
              key="list-icon"
              role="button"
              tabIndex={0}
              onClick={() => this.setCounter(1)}
              onKeyDown={() => this.setCounter(1)}
            >
              <MdList size="40" />
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
              <MdPerson size="40" />
            </div>
            <div
              key="fullscreen-icon"
              role="button"
              tabIndex={0}
              onClick={() => this.setFullScreen(true)}
              onKeyDown={() => () => this.setFullScreen(true)}
            >
              <MdFullscreen size="40" />
            </div>
          </IconsMenu>
        </div>
        <div className="images-area">
          <ImagesSlider
            pages={this.pages}
            mediaQueryLimitPixels={mediaQueryLimitPixels}
            widthOnWideScreenVW={widthOnWideScreenVW}
            widthOnStrechScreenVW={widthOnStrechScreenVW}
            heightOnWideScreenVH={heightOnWideScreenVH}
            heightOnStrechScreenVH={heightOnStrechScreenVH}
            counter={counter}
            setCounter={this.setCounter}
            fullscreen={fullscreen}
            setFullScreen={this.setFullScreen}
          />
        </div>
        <div className="footer">
          <ContactsFooter contacts={this.contacts} />
        </div>
      </HomeLayout>
    );
  }
}
