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
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header {
    grid-area: header;
    font-size: 3vw;
    margin: 0 10% 0 5%;
  }
  .subheader {
    grid-area: subheader;
    font-size: 1.5vw;
    margin: 0 10% 0 5%;
  }
  .pages {
    grid-area: pages;
    font-size: 2vw;
  }
  img {
    max-width: 20vw;
    object-fit: contain;
  }
`;

function IndexCard(props) {
  const {
    pages,
    header,
    year,
    subheader,
    thumbnail,
    setCounter,
    setShowIndex,
  } = props;

  return (
    <IndexCardStyle
      role="button"
      tabIndex={0}
      onClick={() => {
        setCounter(pages[0]);
        setShowIndex(false);
      }}
      onKeyDown={() => {
        setCounter(pages[0]);
        setShowIndex(false);
      }}
    >
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

const IndexStyle = styled.div`
  h1 {
    text-align: center;
    margin: 2% 0;
  }
`;

export default function Index(props) {
  const { data, setCounter, setShowIndex } = props;
  return (
    <IndexStyle>
      <h1> Index </h1>
      <ul style={{ display: 'block' }}>
        {Object.keys(data.pages)
          .filter((page) => data.pages[page].index)
          .map((page) => {
            const pageData = data.pages[page];
            return (
              <li key={page}>
                <IndexCard
                  thumbnail={pageData.file}
                  header={pageData.header}
                  year={pageData.year}
                  subheader={pageData.subheader}
                  pages={pageData.pages}
                  setCounter={setCounter}
                  setShowIndex={setShowIndex}
                />
              </li>
            );
          })}
      </ul>
    </IndexStyle>
  );
}
