import React from 'react';

import styled from 'styled-components';
import {
  MdHome,
  MdPerson,
  MdFullscreen,
  MdList,
  MdFullscreenExit,
} from 'react-icons/md';
import YAML from 'yaml';
import IconsMenu from '../components/IconsMenu';
import ImagesSlider from '../components/ImagesSlider';
import ContactsFooter from '../components/ContactsFooter';
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
const pagesRatio = 1.4143;

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
    .avatar {
      img {
        max-width: 40px;
        max-height: 40px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
  .footer {
    grid-area: footer;
  }
  .images-area {
    grid-area: images;
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
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
  }
`;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      genData: null,
      fullscreen: false,
      isWide: window.screen.availWidth > mediaQueryLimitPixels,
      screenWidthPX: window.innerWidth,
      screenHeightPX: window.innerHeight,
      currentPage: 0,
    };

    this.homePage = 0;
    this.indexPage = 1;

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('fullscreenchange', this.handleFullScreenChange);
  }

  componentDidMount() {
    fetch('assets/alessandro/data.yml')
      .then((response) => response.text())
      .then((yaml) => this.setState({ data: YAML.parse(yaml) }));

    fetch('assets/data.yml')
      .then((response) => response.text())
      .then((yaml) => this.setState({ genData: YAML.parse(yaml) }));
  }

  handleResize = () => {
    this.setState({
      screenWidthPX: window.innerWidth,
      screenHeightPX: window.innerHeight,
      isWide: window.screen.availWidth > mediaQueryLimitPixels,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      this.flipBook.flipNext();
    } else if (event.key === 'ArrowLeft') {
      this.flipBook.flipPrev();
    }
  };

  handleFullScreenChange = () => {
    this.setState((prevState, prevProps) => ({
      fullscreen: !prevState.fullscreen,
    }));
  };

  resolveAsset = (name, asset) => `assets/${name}/${asset}`;

  resolveGenAsset = (asset) => `assets/${asset}`;

  buildPages = (data, name, width, height) => {
    // Building slider pages
    const pages = [];

    // Processing data
    const images = [];
    const indexes = [];

    let lastPage = 1;

    for (let i = 0; i < data.projects.length; i += 1) {
      const project = data.projects[i];

      const projectData = {
        header: project.header,
        subheader: project.subheader,
        year: project.year,
        pages: [lastPage, lastPage + project.pictures.length - 1],
        thumbnail: this.resolveAsset(
          name,
          `${project.folder}/${project.thumbnail}`
        ),
      };
      indexes.push(projectData);
      lastPage += project.pictures.length;

      for (let j = 0; j < project.pictures.length; j += 1) {
        const picture = this.resolveAsset(
          name,
          `${project.folder}/${project.pictures[j]}`
        );
        images.push(picture);
      }
    }

    pages.push(
      <Page
        content={
          <img
            className="cantdownload"
            src={this.resolveAsset(name, data.cover_page)}
            alt=""
          />
        }
        maxWidth={width}
        maxHeight={height}
        pagesRatio={pagesRatio}
      />
    );

    const pagesContent = [
      <IndexPage
        indexes={indexes.slice(0, 10)}
        turnToPage={this.turnToPage}
        mediaQueryLimitPixels={mediaQueryLimitPixels}
        isTitlePage
        heightPX={height}
      />,
      <IndexPage
        indexes={indexes.slice(10)}
        turnToPage={this.turnToPage}
        mediaQueryLimitPixels={mediaQueryLimitPixels}
        heightPX={height}
      />,
      ...images.map((image) => (
        <img className="cantdownload" src={image} alt="" />
      )),
    ];

    pagesContent.forEach((page) =>
      pages.push(
        <Page
          content={page}
          maxWidth={width}
          maxHeight={height}
          pagesRatio={pagesRatio}
        />
      )
    );

    pages.push(
      <Page
        content={
          <img
            className="cantdownload"
            src={this.resolveAsset(name, data.contact_page)}
            alt=""
          />
        }
        maxWidth={width}
        maxHeight={height}
        pagesRatio={pagesRatio}
      />
    );

    return pages;
  };

  buildCoverPage = (data, width, height) => (
    <Page
      content={
        <img
          className="cantdownload"
          src={this.resolveGenAsset(data.cover)}
          alt=""
        />
      }
      maxWidth={width}
      maxHeight={height}
      pagesRatio={pagesRatio}
    />
  );

  vwToPixels = (vwUnits, screenWidthPX) =>
    Math.floor((screenWidthPX * vwUnits) / 100);

  vhToPixels = (vhUnits, screenHeightPX) =>
    Math.floor((screenHeightPX * vhUnits) / 100);

  computeBookPagesSize = (widthVW, heightVH, screenWidthPX, screenHeightPX) => {
    const widthPX = this.vwToPixels(widthVW, screenWidthPX);
    const heightPX = this.vhToPixels(heightVH, screenHeightPX);
    if (heightPX / widthPX > pagesRatio) {
      return [widthPX, widthPX * pagesRatio];
    }

    return [Math.floor(heightPX / pagesRatio), heightPX];
  };

  handleClickNext = () => {
    this.flipBook.flipNext();
  };

  handleClickPrev = () => {
    this.flipBook.flipPrev();
  };

  handleCurrentPageChange = (value) => this.setState({ currentPage: value });

  turnToPage = (page) => {
    this.flipBook.flip(page);
  };

  render() {
    const {
      data,
      genData,
      fullscreen,
      isWide,
      screenWidthPX,
      screenHeightPX,
      currentPage,
    } = this.state;

    const { name } = this.props;

    if (data && genData) {
      let widthVW = isWide ? widthOnWideScreenVW : widthOnStrechScreenVW;
      let heightVH = isWide ? heightOnWideScreenVH : heightOnStrechScreenVH;

      if (!fullscreen) {
        widthVW -= 5;
        heightVH -= 5;
      }

      const [widthPX, heightPX] = this.computeBookPagesSize(
        isWide ? Math.floor(widthVW / 2) : widthVW,
        heightVH,
        screenWidthPX,
        screenHeightPX
      );

      const pages = this.buildPages(data, name, widthPX, heightPX);

      this.contactPage = pages.length - 1;

      let menuChildren = [];
      if (name === 'generic') {
        menuChildren = [
          <div className="avatar">
            <a href="/alessandro">
              <img src={this.resolveGenAsset(genData.pfp.alessandro)} alt="" />
            </a>
          </div>,
          <div className="avatar">
            <a href="/andrea">
              <img src={this.resolveGenAsset(genData.pfp.andrea)} alt="" />
            </a>
          </div>,
          <div className="avatar">
            <a href="/massimo">
              <img src={this.resolveGenAsset(genData.pfp.massimo)} alt="" />
            </a>
          </div>,
        ];
      } else {
        menuChildren = [
          <div
            key="home-icon"
            role="button"
            tabIndex={0}
            onClick={() => {
              this.turnToPage(this.homePage);
            }}
            onKeyDown={() => {
              this.turnToPage(this.homePage);
            }}
          >
            <MdHome />
          </div>,
          <div
            key="list-icon"
            role="button"
            tabIndex={0}
            onClick={() => this.turnToPage(this.indexPage)}
            onKeyDown={() => this.turnToPage(this.indexPage)}
          >
            <MdList />
          </div>,
          <div
            key="person-icon"
            role="button"
            tabIndex={0}
            onClick={() => {
              this.turnToPage(this.contactPage);
            }}
            onKeyDown={() => {
              this.turnToPage(this.contactPage);
            }}
          >
            <MdPerson />
          </div>,
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
            }}
            onKeyDown={() => () => {
              if (fullscreen) {
                document.exitFullscreen();
              } else {
                document.body.requestFullscreen();
              }
            }}
          >
            {fullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
          </div>,
        ];
      }

      return (
        <HomeLayout>
          <div className="menu-bar">
            <IconsMenu mediaQueryLimitPixels={mediaQueryLimitPixels}>
              {menuChildren}
            </IconsMenu>
          </div>
          <div className="images-area">
            {name !== 'generic' ? (
              <ImagesSlider
                pages={pages}
                width={isWide ? 2 * widthPX : widthPX}
                pageWidth={widthPX}
                height={heightPX}
                currentPage={currentPage}
                home={this}
                handleClickNext={this.handleClickNext}
                handleClickPrev={this.handleClickPrev}
                handleCurrentPageChange={this.handleCurrentPageChange}
              />
            ) : (
              <div
                style={{
                  width: widthPX,
                  height: heightPX,
                  'background-color': 'var(--white)',
                }}
              >
                {this.buildCoverPage(genData, widthPX, heightPX)}
              </div>
            )}
          </div>
          <div className="footer">
            {name !== 'generic' && (
              <ContactsFooter
                contacts={[data.contacts]}
                mediaQueryLimitPixels={mediaQueryLimitPixels}
              />
            )}
          </div>
        </HomeLayout>
      );
    }
    return null;
  }
}
