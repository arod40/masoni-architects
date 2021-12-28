import React, { useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const SliderStyles = styled.div`
  position: relative;
  .slider {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: ${(props) => props.heightVH}vh;
    width: ${(props) => props.widthVW}vw;
  }
  .hidden {
    display: none;
  }
  .arrow {
    position: absolute;
    z-index: 100;
    height: 120px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-30%);
    transition: 0.25s ease;
    &:hover {
      opacity: 1;
    }
  }
  .icon {
    filter: drop-shadow(2px 2px 2px rgb(0 0 0));
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
`;

export default function ImagesSlider(props) {
  const { pages, counter, setCounter, heightVH, widthVW } = props;
  const numberOfPages = pages.length;

  const [firstTouchX, setFirstTouchX] = useState(null);
  const [currentTouchX, setCurrentTouchX] = useState(null);

  return (
    <SliderStyles
      heightVH={heightVH}
      widthVW={widthVW}
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
        className="icon arrow back"
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
        className="icon arrow forward"
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
      <div
        className="slider"
        onTouchStart={(event) => {
          setFirstTouchX(event.targetTouches[0].clientX);
          setCurrentTouchX(event.targetTouches[0].clientX);
        }}
        onTouchMove={(event) => {
          setCurrentTouchX(event.targetTouches[0].clientX);
        }}
        onTouchEnd={(event) => {
          console.log(currentTouchX - firstTouchX);
          if (
            event.changedTouches[0].clientX - firstTouchX < -100 &&
            counter < numberOfPages - 1
          ) {
            setCounter((counter + 1 + numberOfPages) % numberOfPages);
          } else if (
            event.changedTouches[0].clientX - firstTouchX > 100 &&
            counter > 0
          ) {
            setCounter((counter - 1 + numberOfPages) % numberOfPages);
          }
          setCurrentTouchX(firstTouchX);
        }}
      >
        <SwitchTransition component={null}>
          <CSSTransition key={counter} timeout={400} classNames="fade">
            {pages[counter]}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </SliderStyles>
  );
}
