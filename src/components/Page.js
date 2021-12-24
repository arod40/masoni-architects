import styled from 'styled-components';

const PageStyle = styled.div`
  max-width: ${(props) =>
    props.fullscreen ? 100 : props.widthOnWideScreenVW - 20}vw;
  width: ${(props) =>
    props.fullscreen ? 100 : props.widthOnWideScreenVW - 20}vw;
  height: ${(props) =>
    props.fullscreen
      ? `${100}vh`
      : `${(props.widthOnWideScreenVW - 20) * 0.6}vw`};
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  ${(props) => (props.fullscreen ? `padding: 1%` : ``)};

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
    ${(props) =>
      props.fullscreen
        ? ``
        : `box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`};
    background-color: ${(props) =>
      props.fullscreen ? `var(--gray-1)` : `var(--white)`};
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
    max-width: ${(props) =>
      props.fullscreen ? 100 : props.widthOnStrechScreenVW}vw;
    width: ${(props) =>
      props.fullscreen ? 100 : props.widthOnStrechScreenVW - 2}vw;
    height: ${(props) =>
      props.fullscreen ? `${100}vh` : `${props.widthOnStrechScreenVW * 1.2}vw`};

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
    fullscreen,
  } = props;

  return (
    <PageStyle
      mediaQueryLimitPixels={mediaQueryLimitPixels}
      widthOnWideScreenVW={widthOnWideScreenVW}
      widthOnStrechScreenVW={widthOnStrechScreenVW}
      heightOnWideScreenVH={heightOnWideScreenVH}
      heightOnStrechScreenVH={heightOnStrechScreenVH}
      fullscreen={fullscreen}
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
