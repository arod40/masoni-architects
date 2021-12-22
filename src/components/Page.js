import styled from 'styled-components';

const PageStyle = styled.div`
  max-height: ${(props) => props.heightOnWideScreenVH - 2}vh;
  max-width: ${(props) => props.widthOnWideScreenVW - 2}vw;
  width: ${(props) => props.widthOnWideScreenVW - 2}vw;
  height: ${(props) => (props.widthOnWideScreenVW - 2) * 0.6}vw;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  .double-page {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }

  .page-wrapper {
    width: 50%;
    height: 100%;
    display: flex;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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

  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    max-height: ${(props) => props.heightOnStrechScreenVH - 2}vh;
    max-width: ${(props) => props.widthOnStrechScreenVW}vw;
    width: ${(props) => props.widthOnStrechScreenVW - 2}vw;
    height: ${(props) => props.widthOnStrechScreenVW * 1.2}vw;

    .page-wrapper {
      width: 100%;
    }
  }
`;

export default function Page(props) {
  const {
    content,
    isDouble,
    mediaQueryLimitPixels,
    widthOnWideScreenVW,
    widthOnStrechScreenVW,
    heightOnWideScreenVH,
    heightOnStrechScreenVH,
  } = props;

  return (
    <PageStyle
      mediaQueryLimitPixels={mediaQueryLimitPixels}
      widthOnWideScreenVW={widthOnWideScreenVW}
      widthOnStrechScreenVW={widthOnStrechScreenVW}
      heightOnWideScreenVH={heightOnWideScreenVH}
      heightOnStrechScreenVH={heightOnStrechScreenVH}
    >
      {isDouble ? (
        <div className="double-page">
          <div className="page-wrapper left">{content[0]}</div>
          <div className="page-wrapper right">{content[1]}</div>
        </div>
      ) : (
        <div className="page-wrapper center">{content}</div>
      )}
    </PageStyle>
  );
}