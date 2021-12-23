import styled from 'styled-components';

const IndexCardStyle = styled.div`
  padding: 1%;
  margin: 1% 1%;
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
    margin: 0 10% 0 5%;
  }
  .subheader {
    grid-area: subheader;
    margin: 0 10% 0 5%;
  }
  .pages {
    grid-area: pages;
  }
  img {
    max-width: 20vw;
    object-fit: contain;
  }
`;

function IndexCard(props) {
  const { pages, header, year, subheader, thumbnail, setCounter } = props;

  return (
    <IndexCardStyle
      role="button"
      tabIndex={0}
      onClick={() => {
        setCounter(pages[0]);
      }}
      onKeyDown={() => {
        setCounter(pages[0]);
      }}
    >
      <div className="card-grid">
        {/* <div className="thumbnail">
          <img src={thumbnail} alt="" />
        </div> */}
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

const IndexPageStyle = styled.div`
  display: grid;
  grid-template-areas:
    'title'
    'index-entries';
  grid-template-rows: 1fr 9fr;
  h1 {
    text-align: center;
    margin: 2% 0;
    grid-area: title;
  }
  h1.hidden {
    visibility: hidden;
  }
  height: 100%;
  width: 100%;
  .index-entries {
    grid-area: index-entries;
  }
  li {
    font-size: 1.17vw;
  }
  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    li {
      font-size: 2.7vw;
    }
  }
`;

export default function IndexPage(props) {
  const { indexes, setCounter, mediaQueryLimitPixels, isTitlePage } = props;
  return (
    <IndexPageStyle mediaQueryLimitPixels={mediaQueryLimitPixels}>
      <h1 className={isTitlePage ? '' : 'hidden'}> Index </h1>
      <ul className="index-entries">
        {indexes.map((pageData) => (
          <li key={pageData.file}>
            <IndexCard
              thumbnail={pageData.file}
              year={pageData.year}
              subheader={pageData.subheader}
              pages={pageData.pages}
              setCounter={setCounter}
            />
          </li>
        ))}
      </ul>
    </IndexPageStyle>
  );
}
