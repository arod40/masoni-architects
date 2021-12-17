import React from 'react';
import styled from 'styled-components';

const SliderStyles = styled.div`
  .slider {
    background-color: yellow;
    display: flex;
    flex-wrap: nowrap;
    transition: transform 1s ease-out;
    transform: translate3d(-${(props) => props.translate}vw, 0, 0);
    align-items: center;
    height: ${(props) => props.heightOnWideScreenVH}vh;
  }
  .slide {
  }
  img {
    max-height: ${(props) => props.heightOnWideScreenVH}vh;
    width: ${(props) => props.widthOnWideScreenVW}vw;
    object-fit: contain;
  }

  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    .slider {
      height: ${(props) => props.heightOnWideScreenVH}vh;
    }
    img {
      max-height: ${(props) => props.heightOnStrechScreenVH}vh;
      width: ${(props) => props.widthOnStrechScreenVW}vw;
    }
  }
`;

export default class ImagesSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      areaVW: this.calculateAvailableWidth(),
    };
  }

  calculateAvailableWidth = (
    mediaQueryLimitPixels,
    widthOnWideScreenVW,
    widthOnStrechScreenVW
  ) =>
    window.screen.availWidth <= mediaQueryLimitPixels
      ? widthOnStrechScreenVW
      : widthOnWideScreenVW;

  handleClick = () => {
    const { counter } = this.state;
    const {
      images,
      mediaQueryLimitPixels,
      widthOnWideScreenVW,
      widthOnStrechScreenVW,
    } = this.props;

    this.setState({
      counter: (counter + 1) % images.length,
      areaVW: this.calculateAvailableWidth(
        mediaQueryLimitPixels,
        widthOnWideScreenVW,
        widthOnStrechScreenVW
      ),
    });
  };

  render() {
    const { counter, areaVW } = this.state;
    const {
      images,
      mediaQueryLimitPixels,
      widthOnWideScreenVW,
      widthOnStrechScreenVW,
      heightOnWideScreenVH,
      heightOnStrechScreenVH,
    } = this.props;
    const translate = areaVW * counter;
    return (
      <SliderStyles
        translate={translate}
        widthOnWideScreenVW={widthOnWideScreenVW}
        widthOnStrechScreenVW={widthOnStrechScreenVW}
        heightOnWideScreenVH={heightOnWideScreenVH}
        heightOnStrechScreenVH={heightOnStrechScreenVH}
        mediaQueryLimitPixels={mediaQueryLimitPixels}
      >
        <ul className="slider">
          {images.map((image) => (
            <li className="slide">
              <img src={image} alt="" />
            </li>
          ))}
        </ul>

        <div
          role="button"
          tabIndex={0}
          onClick={this.handleClick}
          onKeyDown={this.handleClick}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 110 }}
        >
          ClickMe
        </div>
      </SliderStyles>
    );
  }
}
