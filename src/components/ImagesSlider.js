import React from 'react';
import styled from 'styled-components';
import {
  MdFullscreenExit,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

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
    display: inline-block;
  }
  img {
    max-height: ${(props) => props.heightOnWideScreenVH - 2}vh;
    max-width: ${(props) => (props.widthOnWideScreenVW - 2) / 2}vw;
    object-fit: contain;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
    img {
      max-height: ${(props) => props.heightOnStrechScreenVH - 2}vh;
      max-width: ${(props) => props.widthOnStrechScreenVW}vw;
    }
  }
`;

export default class ImagesSlider extends React.Component {
  constructor(props) {
    super(props);

    const { images, mediaQueryLimitPixels } = this.props;
    this.cacheImages = Array.from(
      images.map((image) => {
        const img = new Image();
        img.src = image;
        return img;
      })
    );
    this.isHorizontal = window.screen.availWidth > mediaQueryLimitPixels;
  }

  render() {
    const {
      images,
      counter,
      setCounter,
      mediaQueryLimitPixels,
      widthOnWideScreenVW,
      widthOnStrechScreenVW,
      heightOnWideScreenVH,
      heightOnStrechScreenVH,
      fullscreen,
      setFullScreen,
    } = this.props;

    const incrementBack =
      !this.isHorizontal || counter === images.length - 1 || counter === 1
        ? 1
        : 2;
    const incrementForward =
      !this.isHorizontal || counter === images.length - 2 || counter === 0
        ? 1
        : 2;
    return (
      <SliderStyles
        widthOnWideScreenVW={widthOnWideScreenVW}
        widthOnStrechScreenVW={widthOnStrechScreenVW}
        heightOnWideScreenVH={heightOnWideScreenVH}
        heightOnStrechScreenVH={heightOnStrechScreenVH}
        mediaQueryLimitPixels={mediaQueryLimitPixels}
        counter={counter}
        lastPage={images.length - 1}
      >
        <div className={fullscreen ? 'arrows fullscreen' : 'arrows'}>
          <div
            className="icon arrow back"
            role="button"
            tabIndex={0}
            onClick={() =>
              setCounter(
                (counter - incrementBack + images.length) % images.length
              )
            }
            onKeyDown={() =>
              setCounter(
                (counter - incrementBack + images.length) % images.length
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
                (counter + incrementForward + images.length) % images.length
              )
            }
            onKeyDown={() =>
              setCounter(
                (counter + incrementForward + images.length) % images.length
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
                {this.isHorizontal ? (
                  <div className="two-images">
                    <img
                      src={this.cacheImages[counter].src}
                      alt=""
                      className={fullscreen ? 'fullscreen' : ''}
                    />
                    {counter !== 0 && counter !== images.length - 1 ? (
                      <img
                        src={this.cacheImages[counter + 1].src}
                        alt=""
                        className={fullscreen ? 'fullscreen' : ''}
                      />
                    ) : (
                      <div />
                    )}
                  </div>
                ) : (
                  <img
                    src={this.cacheImages[counter].src}
                    alt=""
                    className={fullscreen ? 'fullscreen' : ''}
                  />
                )}
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
