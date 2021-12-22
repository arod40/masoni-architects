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
  h1 {
    text-align: center;
    margin: 2% 0;
  }
  height: 100%;
  width: 100%;
`;

export default function IndexPage(props) {
  const { data, setCounter } = props;
  return (
    <IndexPageStyle>
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
                  year={pageData.year}
                  subheader={pageData.subheader}
                  pages={pageData.pages}
                  setCounter={setCounter}
                />
              </li>
            );
          })}
      </ul>
    </IndexPageStyle>
  );
}
