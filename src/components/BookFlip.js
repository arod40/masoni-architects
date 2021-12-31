import { PageFlip } from 'page-flip';
import React from 'react';
import styled from 'styled-components';

const containerTransform = (nextPage, totalPages, skip) => {
  if (skip === 1) return 'translateX(0)'; // Do not translate on portrait mode
  if (nextPage === 0) {
    return 'translateX(-25%)';
  }
  if (nextPage === totalPages - 1) {
    return 'translateX(25%)';
  }
  return 'translateX(0)';
};

const BookFlipStyle = styled.div`
  transition: ease 1s;
  transition-property: transform;
  transform: ${(props) =>
    containerTransform(props.nextPage, props.totalPages, props.skip)};
  width: ${(props) => 2 * props.width}px;
  height: ${(props) => props.height}px;
`;

export default class BookFlip extends React.Component {
  constructor(props) {
    super(props);

    const { currentPage } = this.props;

    this.state = {
      skip: null,
      nextPage: currentPage,
      firstTouchX: null,
    };
  }

  componentDidMount() {
    const { width, height, currentPage, onPageHandler, home } = this.props;

    this.pageFlip = new PageFlip(document.getElementById('book'), {
      width, // required parameter - base page width
      height, // required parameter - base page height
      showCover: true,
      useMouseEvents: false,
    });

    this.pageFlip.loadFromHTML(document.querySelectorAll('.book-page'));

    this.pageFlip.turnToPage(currentPage);

    this.pageFlip.on('flip', (e) => onPageHandler(e.data));
    this.pageFlip.on('changeOrientation', (e) => this.setSkip(e.data));

    this.setSkip(this.pageFlip.getOrientation());

    home.flipBook = this;
  }

  setSkip = (orientation) => {
    this.setState({ skip: orientation === 'portrait' ? 1 : 2 });
  };

  flipNext = () => {
    this.setState((prevState, prevProps) => ({
      nextPage:
        prevProps.currentPage === prevProps.pages.length - 1
          ? prevProps.currentPage
          : prevProps.currentPage + prevState.skip,
    }));
    this.pageFlip.flipNext();
  };

  flipPrev = () => {
    this.setState((prevState, prevProps) => ({
      nextPage:
        prevProps.currentPage === 0
          ? prevProps.currentPage
          : prevProps.currentPage - 1,
    }));
    this.pageFlip.flipPrev();
  };

  flip = (page) => {
    this.setState({ nextPage: page });
    this.pageFlip.flip(page);
  };

  setFirstTouchX = (value) => this.setState({ firstTouchX: value });

  render() {
    const { pages, currentPage, width, height } = this.props;
    const { firstTouchX, nextPage, skip } = this.state;

    return (
      <BookFlipStyle
        width={width}
        height={height}
        nextPage={nextPage}
        totalPages={pages.length}
        skip={skip}
      >
        <div
          id="book"
          onTouchStart={(event) => {
            this.setFirstTouchX(event.targetTouches[0].clientX);
          }}
          onTouchEnd={(event) => {
            if (
              event.changedTouches[0].clientX - firstTouchX < -100 &&
              currentPage < pages.length - 1
            ) {
              this.flipNext();
            } else if (
              event.changedTouches[0].clientX - firstTouchX > 100 &&
              currentPage > 0
            ) {
              this.flipPrev();
            }
          }}
        >
          {pages.map((page) => (
            <div className="book-page" data-density="hard">
              {page}
            </div>
          ))}
        </div>
      </BookFlipStyle>
    );
  }
}
