import styled from 'styled-components';

const PageStyle = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${(props) => props.maxWidth}px;
  max-height: ${(props) => props.maxHeight}px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: relative;

  .double-page {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    .page-wrapper {
      width: 50%;
    }
  }
  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
  .page-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: var(--white);
  }
  .shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    border-right: 1px solid black;
  }
  .page-wrapper.left {
    justify-content: flex-end;
  }
  .page-wrapper.right {
    justify-content: flex-start;
  }
  .page-wrapper.center {
    justify-content: center;
  }
`;

export default function Page(props) {
  const { content, maxWidth, maxHeight, pagesRatio } = props;

  return (
    <PageStyle
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      pagesRatio={pagesRatio}
    >
      <div className="shadow" />
      <div className="page-wrapper center">{content}</div>
    </PageStyle>
  );
}
