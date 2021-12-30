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

export default function BookFlip(props) {
  const { width, height, pages } = props;
  return (
    <HTMLFlipBook width={width} height={height} showCover>
      {pages.map((page) => (
        <Page content={page} />
      ))}
    </HTMLFlipBook>
  );
}
