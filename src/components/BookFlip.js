import React from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = React.forwardRef((props, ref) => {
  const { content } = props;
  return (
    <div className="book-page" data-density="hard" ref={ref}>
      {content}
    </div>
  );
});

export default class BookFlip extends React.Component {
  render() {
    const { width, height, pages, slider, onPageHandler } = this.props;
    return (
      <>
        <HTMLFlipBook
          width={width}
          height={height}
          showCover
          ref={(el) => {
            this.flipBook = el;
            slider.flipBook = el;
          }}
          size="stretch"
          onFlip={(e) => onPageHandler(e.data)}
        >
          {pages.map((page) => (
            <Page content={page} />
          ))}
        </HTMLFlipBook>
      </>
    );
  }
}
