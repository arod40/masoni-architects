import { PageFlip } from 'page-flip';
import React from 'react';

export default class BookFlip extends React.Component {
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

  render() {
    const { pages } = this.props;

    return (
      <div id="book">
        {pages.map((page) => (
          <div className="book-page" data-density="hard">
            {page}
          </div>
        ))}
      </div>
    );
  }
}
