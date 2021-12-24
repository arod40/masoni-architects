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
  .slider.fullscreen {
    height: 100vh;
    width: 100vw;
  }
  /* img.fullscreen {
    max-height: 100vh;
    width: 100vw;
    z-index: 200;
  } */
  /* .fullscreen-modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    background-color: var(--gray-1);
    z-index: 200;
    display: flex;
    padding-bottom: 60px;
    align-items: center;
    justify-content: center;
  } */
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
  .arrow {
    position: absolute;
    top: 50%;
  }
  .arrow.fullscreen {
    z-index: 300;
    position: fixed;
  }
  .arrow.back {
    visibility: ${(props) => (props.counter === 0 ? 'hidden' : 'visible')};
    left: 0;
  }
  .arrow.forward {
    visibility: ${(props) =>
      props.counter === props.lastPage ? 'hidden' : 'visible'};
    right: 0;
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
    .icon {
      &:hover {
        transform: translateY(0);
      }
    }
  }
`;

export default function ImagesSlider(props) {
  const {
    pages,
    counter,
    setCounter,
    mediaQueryLimitPixels,
    widthOnWideScreenVW,
    widthOnStrechScreenVW,
    heightOnWideScreenVH,
    heightOnStrechScreenVH,
    fullscreen,
    setFullScreen,
  } = props;
  const numberOfPages = pages.length;

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
      {/* Rendering all pages beforehand so they are cached by browser */}
      <div className="hidden">
        {pages.map((page) => (
          <div>{page}</div>
        ))}
      </div>
      <div
        className={
          fullscreen ? 'icon arrow back fullscreen' : 'icon arrow back'
        }
        role="button"
        tabIndex={0}
        onClick={() =>
          setCounter((counter - 1 + numberOfPages) % numberOfPages)
        }
        onKeyDown={() =>
          setCounter((counter - 1 + numberOfPages) % numberOfPages)
        }
      >
        <MdKeyboardArrowLeft size="60" />
      </div>
      <div
        className={
          fullscreen ? 'icon arrow forward fullscreen' : 'icon arrow forward'
        }
        role="button"
        tabIndex={0}
        onClick={() =>
          setCounter((counter + 1 + numberOfPages) % numberOfPages)
        }
        onKeyDown={() =>
          setCounter((counter + 1 + numberOfPages) % numberOfPages)
        }
      >
        <MdKeyboardArrowRight size="60" />
      </div>
      <div className={fullscreen ? 'slider fullscreen' : 'slider'}>
        <SwitchTransition component={null}>
          <CSSTransition key={counter} timeout={400} classNames="fade">
            {pages[counter]}
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
    </SliderStyles>
  );
}
