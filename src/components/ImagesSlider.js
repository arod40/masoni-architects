import React from 'react';
import styled from 'styled-components';
import {
  MdFullscreenExit,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const IndexCardStyle = styled.div`
  padding: 1%;
  margin: 1% 1%;
  .card-grid {
    display: grid;
    grid-template-areas:
      'thumbnail header pages'
      'thumbnail subheader pages';
  }
  .thumbnail {
    grid-area: thumbnail;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header {
    grid-area: header;
    margin: 0 10% 0 5%;
  }
  .subheader {
    grid-area: subheader;
    margin: 0 10% 0 5%;
  }
  .pages {
    grid-area: pages;
  }
  img {
    max-width: 20vw;
    object-fit: contain;
  }
`;

function IndexCard(props) {
  const { pages, header, year, subheader, thumbnail, setCounter } = props;

  return (
    <IndexCardStyle
      role="button"
      tabIndex={0}
      onClick={() => {
        setCounter(pages[0]);
      }}
      onKeyDown={() => {
        setCounter(pages[0]);
      }}
    >
      <div className="card-grid">
        {/* <div className="thumbnail">
          <img src={thumbnail} alt="" />
        </div> */}
        <div className="header">
          {header}-{year}
        </div>
        <div className="subheader">{subheader}</div>
        <div className="pages">
          {pages.length > 1
            ? `${pages[0].toString()}-${pages[pages.length - 1]}`
            : pages[0]}
        </div>
      </div>
    </IndexCardStyle>
  );
}

const IndexPageStyle = styled.div`
  h1 {
    text-align: center;
    margin: 2% 0;
  }
  height: 100%;
  width: 100%;
`;

function IndexPage(props) {
  const { data, setCounter } = props;
  return (
    <IndexPageStyle>
      <h1> Index </h1>
      <ul style={{ display: 'block' }}>
        {Object.keys(data.pages)
          .filter((page) => data.pages[page].index)
          .map((page) => {
            const pageData = data.pages[page];
            return (
              <li key={page}>
                <IndexCard
                  thumbnail={pageData.file}
                  year={pageData.year}
                  subheader={pageData.subheader}
                  pages={pageData.pages}
                  setCounter={setCounter}
                />
              </li>
            );
          })}
      </ul>
    </IndexPageStyle>
  );
}

const PageStyle = styled.div`
  max-height: ${(props) => props.heightOnWideScreenVH - 2}vh;
  max-width: ${(props) => props.widthOnWideScreenVW - 2}vw;
  width: ${(props) => props.widthOnWideScreenVW - 2}vw;
  height: ${(props) => (props.widthOnWideScreenVW - 2) * 0.6}vw;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  .image-wrapper {
    width: 50%;
    height: 100%;
    display: flex;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .image-wrapper.left {
    justify-content: flex-end;
  }
  .image-wrapper.right {
    justify-content: flex-start;
  }
  .image-wrapper.center {
    justify-content: center;
  }

  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    max-height: ${(props) => props.heightOnStrechScreenVH - 2}vh;
    max-width: ${(props) => props.widthOnStrechScreenVW}vw;
    width: ${(props) => props.widthOnStrechScreenVW - 2}vw;
    height: ${(props) => props.widthOnStrechScreenVW * 1.2}vw;

    .image-wrapper {
      width: 100%;
    }
  }
`;

function Page(props) {
  const {
    pagesData,
    isHorizontal,
    isIndex,
    counter,
    setCounter,
    images,
    fullscreen,
    mediaQueryLimitPixels,
    widthOnWideScreenVW,
    widthOnStrechScreenVW,
    heightOnWideScreenVH,
    heightOnStrechScreenVH,
  } = props;

  if (isHorizontal) {
    return (
      <PageStyle
        mediaQueryLimitPixels={mediaQueryLimitPixels}
        widthOnWideScreenVW={widthOnWideScreenVW}
        widthOnStrechScreenVW={widthOnStrechScreenVW}
        heightOnWideScreenVH={heightOnWideScreenVH}
        heightOnStrechScreenVH={heightOnStrechScreenVH}
      >
        {isIndex ? (
          <div className="two-images">
            <IndexPage data={pagesData} setCounter={setCounter} />
            <IndexPage data={pagesData} setCounter={setCounter} />
          </div>
        ) : (
          <div className="two-images">
            <div className="image-wrapper left">
              <img
                src={images[counter].src}
                alt=""
                className={fullscreen ? 'fullscreen' : ''}
              />
            </div>
            {counter !== 0 && counter !== images.length - 1 ? (
              <div className="image-wrapper right">
                <img
                  src={images[counter + 1].src}
                  alt=""
                  className={fullscreen ? 'fullscreen' : ''}
                />
              </div>
            ) : (
              <div />
            )}
          </div>
        )}
      </PageStyle>
    );
  }

  return (
    <PageStyle
      mediaQueryLimitPixels={mediaQueryLimitPixels}
      widthOnWideScreenVW={widthOnWideScreenVW}
      widthOnStrechScreenVW={widthOnStrechScreenVW}
      heightOnWideScreenVH={heightOnWideScreenVH}
      heightOnStrechScreenVH={heightOnStrechScreenVH}
    >
      <div className="image-wrapper center">
        {isIndex ? (
          <IndexPage data={pagesData} setCounter={setCounter} />
        ) : (
          <img
            src={images[counter].src}
            alt=""
            className={fullscreen ? 'fullscreen' : ''}
          />
        )}
      </div>
    </PageStyle>
  );
}

const SliderStyles = styled.div`
  position: relative;
  .slider {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: ${(props) => props.heightOnWideScreenVH}vh;
  }
  .two-images {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
  img.fullscreen {
    max-height: 100vh;
    width: 100vw;
    z-index: 200;
  }
  .fullscreen-modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    background-color: black;
    z-index: 200;
    display: flex;
    padding-bottom: 60px;
    align-items: center;
    justify-content: center;
  }
  .hidden {
    display: none;
  }
  .exitfullscreen-icon {
    position: fixed;
    bottom: 10px;
    right: 10px;
    color: white;
    transition: 0.25s ease;
    &:hover {
      transform: scale(1.3);
      transform: translateY(-1em);
      filter: drop-shadow(3px 5px 2px rgb(255 255 255 / 0.4));
    }
    z-index: 200;
  }
  .arrows {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: ${(props) => props.widthOnWideScreenVW}vw;
    top: 50%;
    position: absolute;
    z-index: 100;
  }
  .arrows.fullscreen {
    z-index: 300;
    position: fixed;
    top: 50%;
    left: 0;
    width: 100vw;
  }
  .arrow.back {
    visibility: ${(props) => (props.counter === 0 ? 'hidden' : 'visible')};
  }
  .arrow.forward {
    visibility: ${(props) =>
      props.counter === props.lastPage ? 'hidden' : 'visible'};
  }
  .icon {
    color: white;
    opacity: 0.5;
    filter: drop-shadow(2px 2px 2px rgb(0 0 0));
    transition: 0.25s ease;
    &:hover {
      transform: scale(1.3);
      transform: translateY(-1em);
    }
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

  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    .slider {
      height: ${(props) => props.heightOnStrechScreenVH}vh;
    }
    .arrows {
      width: ${(props) => props.widthOnStrechScreenVW}vw;
    }
    .icon {
      &:hover {
        transform: translateY(0);
      }
    }
  }
`;

export default class ImagesSlider extends React.Component {
  constructor(props) {
    super(props);

    const { images } = this.props;
    this.cacheImages = Array.from(
      images.map((image) => {
        const img = new Image();
        img.src = image;
        return img;
      })
    );
  }

  render() {
    const {
      counter,
      setCounter,
      mediaQueryLimitPixels,
      widthOnWideScreenVW,
      widthOnStrechScreenVW,
      heightOnWideScreenVH,
      heightOnStrechScreenVH,
      fullscreen,
      setFullScreen,
      pagesData,
    } = this.props;

    const isHorizontal = window.screen.availWidth > mediaQueryLimitPixels;
    const isIndex = counter === 1 || counter === 2;
    const numberOfPages = this.cacheImages.length;
    const incrementBack = !isHorizontal || counter === 1 ? 1 : 2;
    const incrementForward =
      !isHorizontal || counter === numberOfPages - 2 || counter === 0 ? 1 : 2;
    return (
      <SliderStyles
        widthOnWideScreenVW={widthOnWideScreenVW}
        widthOnStrechScreenVW={widthOnStrechScreenVW}
        heightOnWideScreenVH={heightOnWideScreenVH}
        heightOnStrechScreenVH={heightOnStrechScreenVH}
        mediaQueryLimitPixels={mediaQueryLimitPixels}
        counter={counter}
        lastPage={numberOfPages - 1}
      >
        <div className={fullscreen ? 'arrows fullscreen' : 'arrows'}>
          <div
            className="icon arrow back"
            role="button"
            tabIndex={0}
            onClick={() =>
              setCounter(
                (counter - incrementBack + numberOfPages) % numberOfPages
              )
            }
            onKeyDown={() =>
              setCounter(
                (counter - incrementBack + numberOfPages) % numberOfPages
              )
            }
          >
            <MdKeyboardArrowLeft size="60" />
          </div>
          <div
            className="icon arrow forward"
            role="button"
            tabIndex={0}
            onClick={() =>
              setCounter(
                (counter + incrementForward + numberOfPages) % numberOfPages
              )
            }
            onKeyDown={() =>
              setCounter(
                (counter + incrementForward + numberOfPages) % numberOfPages
              )
            }
          >
            <MdKeyboardArrowRight size="60" />
          </div>
        </div>
        <div className={fullscreen ? 'fullscreen-modal' : ''}>
          <div className="slider">
            <SwitchTransition component={null}>
              <CSSTransition key={counter} timeout={400} classNames="fade">
                <Page
                  images={this.cacheImages}
                  isHorizontal={isHorizontal}
                  isIndex={isIndex}
                  counter={counter}
                  setCounter={setCounter}
                  fullscreen={fullscreen}
                  pagesData={pagesData}
                  mediaQueryLimitPixels={mediaQueryLimitPixels}
                  widthOnWideScreenVW={widthOnWideScreenVW}
                  widthOnStrechScreenVW={widthOnStrechScreenVW}
                  heightOnWideScreenVH={heightOnWideScreenVH}
                  heightOnStrechScreenVH={heightOnStrechScreenVH}
                />
              </CSSTransition>
            </SwitchTransition>
          </div>
          <div
            className={fullscreen ? 'exitfullscreen-icon' : 'hidden'}
            role="button"
            tabIndex={0}
            onClick={() => setFullScreen(false)}
            onKeyDown={() => () => setFullScreen(false)}
          >
            <MdFullscreenExit size="40" />
          </div>
        </div>
      </SliderStyles>
    );
  }
}
