import React from 'react';
import styled from 'styled-components';

const IndexCardStyle = styled.div`
  padding: 1%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 1% 1%;
  border-radius: 5px;
  .card-grid {
    display: grid;
    grid-template-areas:
      'thumbnail header pages'
      'thumbnail subheader pages';
  }
  .thumbnail {
    grid-area: thumbnail;
  }
  .header {
    grid-area: header;
    font-size: 4vh;
  }
  .subheader {
    grid-area: subheader;
    font-size: 2vh;
  }
  .pages {
    grid-area: pages;
    font-size: 3vh;
  }
  img {
    max-width: 20vw;
    max-height: 20vh;
    object-fit: contain;
  }
`;

function IndexCard(props) {
  const { pages, header, year, subheader, thumbnail } = props;

  return (
    <IndexCardStyle>
      <div className="card-grid">
        <div className="thumbnail">
          <img src={thumbnail} alt="" />
        </div>
        <div className="header">
          {header}-{year}
        </div>
        <div className="subheader">{subheader}</div>
        <div className="pages">
          {pages.length > 1
            ? `${pages[0].toString()}-${pages[pages.length - 1]}`
            : pages[0]}
        </div>
      </div>
    </IndexCardStyle>
  );
}

const IndexStyle = styled.div``;

export default function Index(props) {
  const { data } = props;
  return (
    <IndexStyle>
      <ul style={{ display: 'block' }}>
        {Object.keys(data.pages)
          .filter((page) => data.pages[page].index)
          .map((page) => {
            const pageData = data.pages[page];
            return (
              <li>
                <IndexCard
                  thumbnail={pageData.file}
                  header={pageData.header}
                  year={pageData.year}
                  subheader={pageData.subheader}
                  pages={pageData.pages}
                />
              </li>
            );
          })}
      </ul>
    </IndexStyle>
  );
}
