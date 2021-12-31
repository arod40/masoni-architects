import { PageFlip } from 'page-flip';
import React from 'react';

export default class BookFlip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstTouchX: null,
      currentTouchX: null,
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

    home.flipBook = this.pageFlip;
  }

  setFirstTouchX = (value) => this.setState({ firstTouchX: value });

  setCurrentTouchX = (value) => this.setState({ currentTouchX: value });

  render() {
    const { pages, currentPage } = this.props;
    const { firstTouchX, currentTouchX } = this.state;

    return (
      <div
        id="book"
        onTouchStart={(event) => {
          this.setFirstTouchX(event.targetTouches[0].clientX);
          this.setCurrentTouchX(event.targetTouches[0].clientX);
        }}
        onTouchMove={(event) => {
          this.setCurrentTouchX(event.targetTouches[0].clientX);
        }}
        onTouchEnd={(event) => {
          console.log(currentTouchX - firstTouchX);
          if (
            event.changedTouches[0].clientX - firstTouchX < -100 &&
            currentPage < pages.length - 1
          ) {
            this.pageFlip.flipNext();
          } else if (
            event.changedTouches[0].clientX - firstTouchX > 100 &&
            currentPage > 0
          ) {
            this.pageFlip.flipPrev();
          }
          this.setCurrentTouchX(firstTouchX);
        }}
      >
        {pages.map((page) => (
          <div className="book-page" data-density="hard">
            {page}
          </div>
        ))}
      </div>
    );
  }
}
