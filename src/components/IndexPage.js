import styled from 'styled-components';

const IndexCardStyle = styled.div`
  padding: 1%;
  margin: 0 1% 0 1%;
  transition: 0.3s ease;
  transition-property: box-shadow background-color;
  height: ${(props) => props.height}px;
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
  /* Accounting for padding to set font size and thumbnail max-height */
  .header {
    grid-area: header;
    margin: 0 10% 0 5%;
    font-size: ${(props) => 0.8 * 0.3 * props.height}px;
  }
  .pages {
    grid-area: pages;
    font-size: ${(props) => 0.8 * 0.3 * props.height}px;
  }
  .subheader {
    grid-area: subheader;
    margin: 0 10% 0 5%;
    font-size: ${(props) => 0.8 * 0.2 * props.height}px;
  }
  .thumbnail {
    grid-area: thumbnail;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-height: ${(props) => 0.8 * props.height}px;
      object-fit: contain;
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
    turnToPage,
    height,
  } = props;

  return (
    <IndexCardStyle
      role="button"
      tabIndex={0}
      onClick={() => {
        turnToPage(pages[0] + 2); // Adding 2 to account for index pages
      }}
      onKeyDown={() => {
        turnToPage(pages[0] + 2); // Adding 2 to account for index pages
      }}
      height={height}
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
  background-color: var(--white);
  width: 100%;
  height: 100%;
  .title {
    height: 10%;
  }
  .title.notshowed {
    visibility: hidden;
  }
  h1 {
    position: relative;
    top: 30%;
    text-align: center;
    font-family: var(--typo-index);
    font-weight: bold;
  }
`;

export default function IndexPage(props) {
  const { indexes, turnToPage, isTitlePage, heightPX } = props;

  const cardHeight = Math.floor((0.9 * heightPX) / 10);

  return (
    <IndexPageStyle>
      <div className={isTitlePage ? 'title' : 'title notshowed'}>
        <h1> index </h1>
      </div>
      <ul className="index-entries">
        {indexes.map((projectData) => (
          <li key={projectData.file}>
            <IndexCard
              thumbnail={projectData.thumbnail}
              header={projectData.header}
              year={projectData.year}
              subheader={projectData.subheader}
              pages={projectData.pages}
              turnToPage={turnToPage}
              height={cardHeight}
            />
          </li>
        ))}
      </ul>
    </IndexPageStyle>
  );
}
