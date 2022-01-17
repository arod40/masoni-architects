import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import BookFlip from './BookFlip';

const SliderStyles = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
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

    return (
      <SliderStyles
        height={height}
        width={width}
        currentPage={currentPage}
        totalPage={pages.length}
      >
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
            onPageHandler={handleCurrentPageChange}
            currentPage={currentPage}
            home={home}
          />
        </div>
      </SliderStyles>
    );
  }
}
