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
  .midshadow {
    position: absolute;
    width: 50%;
    height: 100%;
    opacity: 1;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    pointer-events: none;
  }
  .midshadow.left {
    left: 0;
  }
  .midshadow.right {
    left: 50%;
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
      <div className="page-wrapper center">{content}</div>
    </PageStyle>
  );
}
