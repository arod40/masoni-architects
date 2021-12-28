import styled from 'styled-components';

const IndexCardStyle = styled.div`
  padding: 1%;
  margin: 1% 1%;
  transition: 0.3s ease;
  transition-property: box-shadow background-color;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
  }
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
    max-height: 4.2vw;
    object-fit: contain;
  }
  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    img {
      max-height: 12vw;
    }
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
    mediaQueryLimitPixels,
    pageToCounter,
  } = props;

  return (
    <IndexCardStyle
      role="button"
      tabIndex={0}
      onClick={() => {
        setCounter(pageToCounter[pages[0]]);
      }}
      onKeyDown={() => {
        setCounter(pageToCounter[pages[0]]);
      }}
      mediaQueryLimitPixels={mediaQueryLimitPixels}
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

const IndexPageStyle = styled.div`
  display: grid;
  grid-template-areas:
    'title'
    'index-entries';
  grid-template-rows: 1fr 9fr;
  background-color: var(--white);
  h1 {
    text-align: center;
    margin: 5% 0 2% 0;
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
    font-size: 0.95vw;
  }
  .subheader {
    font-size: 0.7vw;
  }

  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    li {
      font-size: 2.7vw;
    }
    .subheader {
      font-size: 2vw;
    }
  }
`;

export default function IndexPage(props) {
  const {
    indexes,
    setCounter,
    mediaQueryLimitPixels,
    isTitlePage,
    pageToCounter,
  } = props;
  return (
    <IndexPageStyle mediaQueryLimitPixels={mediaQueryLimitPixels}>
      <h1 className={isTitlePage ? '' : 'hidden'}> Index </h1>
      <ul className="index-entries">
        {indexes.map((pageData) => (
          <li key={pageData.file}>
            <IndexCard
              thumbnail={pageData.thumbnail}
              header={pageData.header}
              year={pageData.year}
              subheader={pageData.subheader}
              pages={pageData.pages}
              setCounter={setCounter}
              mediaQueryLimitPixels={mediaQueryLimitPixels}
              pageToCounter={pageToCounter}
            />
          </li>
        ))}
      </ul>
    </IndexPageStyle>
  );
}
