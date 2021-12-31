import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import BookFlip from './BookFlip';

const SliderStyles = styled.div`
  position: relative;
  .slider {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
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
    visibility: ${(props) => (props.currentPage === 0 ? 'hidden' : 'visible')};
    left: 0;
  }
  .arrow.forward {
    visibility: ${(props) =>
      props.currentPage === props.totalPage - 1 ? 'hidden' : 'visible'};
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

export default class ImagesSlider extends React.Component {
  render() {
    const {
      pages,
      height,
      width,
      pageWidth,
      currentPage,
      home,
      handleClickNext,
      handleClickPrev,
      handleCurrentPageChange,
    } = this.props;

    // console.log(handleClickNext);
    // console.log(handleClickPrev);

    return (
      <SliderStyles
        height={height}
        width={width}
        currentPage={currentPage}
        totalPage={pages.length}
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
          onClick={handleClickPrev}
          onKeyDown={handleClickPrev}
        >
          <MdKeyboardArrowLeft size="60" />
        </div>
        <div
          className="icon arrow forward"
          role="button"
          tabIndex={0}
          onClick={handleClickNext}
          onKeyDown={handleClickNext}
        >
          <MdKeyboardArrowRight size="60" />
        </div>
        <div className="slider">
          <BookFlip
            key={(width, height)}
            width={pageWidth}
            height={height}
            pages={pages}
            home={home}
            onPageHandler={handleCurrentPageChange}
            currentPage={currentPage}
          />
        </div>
      </SliderStyles>
    );
  }
}
