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
  constructor(props) {
    super(props);
    this.update = true;
  }

  shouldComponentUpdate() {
    const shouldUpdate = this.update;
    this.update = true;
    return shouldUpdate;
  }

  componentDidUpdate() {
    const { currentPage } = this.props;
    this.update = false;
    this.flipBook.pageFlip().turnToPage(currentPage);
  }

  render() {
    const { width, height, pages, home, onPageHandler } = this.props;
    return (
      <>
        <HTMLFlipBook
          width={width}
          height={height}
          showCover
          ref={(el) => {
            this.flipBook = el;
            home.flipBook = el;
          }}
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
